const mongoose = require('mongoose');

const SampleSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const SampleModel = mongoose.model('Sample', SampleSchema);

module.exports = SampleModel;
