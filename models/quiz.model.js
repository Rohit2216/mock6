const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    answerOptions: {
        type: [String],
        required: true,
    },
    correctOptions: {
        type: [Number],
        required: true,
    },
});

const quizSchema = new mongoose.Schema({
    creator: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: [{
      title: String,
      options: [String],
      correctOptions: [String], // Updated data type to String
    }],
  });
  

function arrayLimit(val) {
    return val.length >= 2 && val.length <= 10;
}

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
