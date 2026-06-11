const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false
  },
  membershipType: {
    type: String,
    required: [true, 'Membership type is required'],
    enum: ['individual', 'institutional'],
    default: 'individual'
  },
  institutionSize: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: function() {
      return this.membershipType === 'institutional';
    },
    validate: {
      validator: function(value) {
        if (this.membershipType === 'institutional') {
          return ['small', 'medium', 'large'].includes(value);
        }
        return true;
      },
      message: 'Institution size is required for institutional memberships'
    }
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isMembershipPaid: {
    type: Boolean,
    default: false
  },
  membershipPaidAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
