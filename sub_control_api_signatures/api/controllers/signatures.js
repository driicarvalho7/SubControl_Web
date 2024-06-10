const Signature = require('../models/Signature');

module.exports = () => {
  const controller = {};

  controller.createSignature = async (req, res) => {
    const { userId, name, logoUrl, value, currency, startDate, endDate, period } = req.body;

    try {
      let signature = new Signature({ userId, name, logoUrl, value, currency, startDate, endDate, period });
      await signature.save();
      res.status(201).json({ message: 'Signature created successfully', signature });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  controller.getSignatures = async (req, res) => {
    try {
      const signatures = await Signature.find();
      res.status(200).json(signatures);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  controller.getSignaturesByUserId = async (req, res) => {
    try {
      const signatures = await Signature.find({ userId: req.params.userId });
      if (!signatures || signatures.length === 0) {
        return res.status(404).json({ message: 'No signatures found for this user' });
      }
      res.status(200).json(signatures);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    
  };

  controller.getSignatureById = async (req, res) => {
    try {
      const signature = await Signature.findById(req.params.id);
      if (!signature) {
        return res.status(404).json({ message: 'Signature not found' });
      }
      res.status(200).json(signature);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  controller.updateSignature = async (req, res) => {
    try {
      const signature = await Signature.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!signature) {
        return res.status(404).json({ message: 'Signature not found' });
      }
      res.status(200).json({ message: 'Signature updated successfully', signature });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  controller.deleteSignature = async (req, res) => {
    try {
      const signature = await Signature.findByIdAndDelete(req.params.id);
      if (!signature) {
        return res.status(404).json({ message: 'Signature not found' });
      }
      res.status(200).json({ message: 'Signature deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  return controller;
};
