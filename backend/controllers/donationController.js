const asyncHandler = require("../utils/asyncHandler");
const donationService = require("../services/donationService");

const createOrder = asyncHandler(async (req, res) => {
  const order = await donationService.createDonationOrder({ body: req.body, req });
  res.status(201).json({ success: true, order });
});

const verify = asyncHandler(async (req, res) => {
  const donation = await donationService.verifyDonationWithGateway({
    orderId: req.body.orderId || req.params.orderId,
    req,
  });
  res.json({ success: true, donation });
});

const status = asyncHandler(async (req, res) => {
  const donation = await donationService.getDonationByOrderId(req.params.orderId);
  res.json({ success: true, donation: donationService.toClientDonation(donation) });
});

const downloadCertificate = asyncHandler(async (req, res) => {
  const { filePath, fileName } = await donationService.getCertificateDownload({
    orderId: req.params.orderId,
    email: req.query.email,
  });

  res.download(filePath, fileName);
});

module.exports = {
  createOrder,
  verify,
  status,
  downloadCertificate,
};
