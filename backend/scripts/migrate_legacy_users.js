require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const User = require('../models/User');
const Payment = require('../models/Payment');
const crypto = require('crypto');

// Helpers for CSV and PHP serialization
const parseCSVRow = (str) => {
  const result = [];
  let inQuotes = false;
  let val = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '"' && str[i+1] === '"') {
      val += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(val);
      val = '';
    } else {
      val += char;
    }
  }
  result.push(val);
  return result;
};

const parsePhpArray = (str) => {
  if (!str || !str.startsWith('a:')) return [];
  const regex = /s:\d+:"([^"]+)";/g;
  const results = [];
  let match;
  while ((match = regex.exec(str)) !== null) {
    results.push(match[1]);
  }
  return results;
};

const runMigration = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const csvPath = path.join(__dirname, '../Users-Export-2025-Feb-15-130036.csv');
    const content = fs.readFileSync(csvPath, 'utf-8');
    const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);
    const headers = parseCSVRow(lines[0]);

    let successCount = 0;
    let paymentCount = 0;
    let errorCount = 0;

    for (let i = 1; i < lines.length; i++) {
      try {
        const row = parseCSVRow(lines[i]);
        const data = {};
        headers.forEach((h, idx) => data[h] = row[idx]);

        if (!data['User Email']) continue; // Skip invalid rows

        const email = data['User Email'].trim().toLowerCase();
        let name = data['Display Name'] || data['first_name'] || data['First Name'] || 'Legacy User';
        if (data['Last Name'] && !name.includes(data['Last Name'])) name += ` ${data['Last Name']}`;
        
        // Clean name
        name = name.replace(/['"]/g, '').trim() || 'Legacy User';

        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
          // User exists, let's update them with the full extraInfo if they are legacy (or just update them)
          user.legacyMember = true;
          user.extraInfo = {
            wpUserId: data['ID'],
            academicUrl: data['academic_url'],
            billingUniversity: data['billing_university'],
            contactAddress: data['contact_address'],
            departmentName: data['department_name'],
            educationLevel: parsePhpArray(data['education_level']),
            jobTitle: parsePhpArray(data['job_title']),
            researchExp: data['Resrch_exp'],
            techExp: data['tech_exp'],
            computationalSkills: data['computational_skills'],
            otherInfo: data['other_info'],
          };
          
          const mttfId = data['MTTF Member ID'] ? data['MTTF Member ID'].trim() : null;
          if (mttfId && mttfId.startsWith('MTTF')) {
            // Check if a payment record already exists for this user (to avoid duplicates)
            const existingPayment = await Payment.findOne({ userId: user._id, paymentGateway: 'LEGACY_WP' });
            
            if (!existingPayment) {
              const mType = user.membershipType || 'individual';
              const orderId = `MTTF_LEGACY_${new Date(data['User Registered'] || Date.now()).getTime()}_${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
              const payment = new Payment({
                orderId,
                userId: user._id,
                userName: user.name,
                userEmail: user.email,
                amount: 0,
                paymentGateway: 'LEGACY_WP',
                paymentStatus: 'SUCCESS',
                membershipType: mType,
                webhookVerified: true,
                createdAt: new Date(data['User Registered'] || Date.now()),
              });
              await payment.save();
              paymentCount++;
            }
          }
          await user.save();
          successCount++;
        }
      } catch (err) {
        console.error(`Error on line ${i+1}: ${err.message}`);
        errorCount++;
      }
    }

    console.log(`Migration Complete.`);
    console.log(`Users imported: ${successCount}`);
    console.log(`Legacy Payments created: ${paymentCount}`);
    console.log(`Errors: ${errorCount}`);

    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
};

runMigration();
