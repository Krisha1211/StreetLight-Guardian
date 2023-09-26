const mongoose = require('mongoose');

const feedbackCounterSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 10000, // Start with 1000
  },
});

const FeedbackCounter = mongoose.model('FeedbackCounter', feedbackCounterSchema);

module.exports = FeedbackCounter;
