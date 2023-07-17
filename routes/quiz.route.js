const express = require('express');
const quizRouter = express.Router();
const Quiz = require('../models/quiz.model');


quizRouter.post('/register', async (req, res) => {

  try {
    const { creator, title, description, questions } = req.body;

    const quiz = await Quiz.create({ creator, title, description, questions });
    res.status(201).json(quiz);

  } catch (error) {
    res.status(500).json({ message: error.message });
    res.status(500).json({ "message": 'Failed to create quiz' });
  }
});


quizRouter.delete('/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    await Quiz.findByIdAndDelete(quizId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});


quizRouter.put('/:id', async (req, res) => {
  const quizId = req.params.id;
  const { creator, title, description, questions } = req.body;

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      { creator, title, description, questions },
      { new: true }
    );

    if (updatedQuiz) {
      res.status(200).json({ quiz: updatedQuiz });
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update quiz' });
  }
});



quizRouter.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.status(200).json({ quizzes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});



quizRouter.get('/:id', async (req, res) => {
  const quizId = req.params.id;

  try {
    const quiz = await Quiz.findById(quizId);
    
    if (quiz) {
      res.status(200).json({ quiz });
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});


// Assuming you have the necessary setup for the Quiz model

// Get question by ID within a quiz
quizRouter.get('/:quizId/questions/:questionId', async (req, res) => {
  const quizId = req.params.quizId;
  const questionId = req.params.questionId;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const question = quiz.questions.id(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});



quizRouter.put('/:quizId/questions/:questionId', async (req, res) => {
  const quizId = req.params.quizId;
  const questionId = req.params.questionId;
  const { title, answerOptions, correctOptions } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const question = quiz.questions.id(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Update the question fields
    question.title = title;
    question.answerOptions = answerOptions;
    question.correctOptions = correctOptions;

    await quiz.save();

    res.status(200).json({ quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update question' });
  }
});


module.exports = {quizRouter};