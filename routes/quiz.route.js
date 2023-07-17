const express = require('express');
const quizRouter = express.Router();
const { QuizModel } = require('../model/quiz.model');


quizRouter.get("/", async (req, res) => {
  try {

    const users = await QuizModel.find();
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send({ "msg": error.message })
  }
})



quizRouter.get("/:id", async (req, res) => {

  try {
    const { id } = req.params;

    const users = await QuizModel.findById(id);
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send({ "msg": error.message })
  }
})



quizRouter.post('/add', async (req, res) => {

  try {

    const { creator, title, description, questions } = req.body;
    const quiz = await QuizModel.create({ creator, title, description, questions });
    res.status(201).json(quiz);

  } catch (error) {
    res.status(500).json({ message: error.message });
    res.status(500).json({ "message": 'Failed to create quiz' });
  }
});



quizRouter.delete('/:id', async (req, res) => {

  try {
    const { id } = req.params;
    await QuizModel.findByIdAndDelete(id);
    res.status(204).end();

  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});



quizRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const quiz = await QuizModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quiz' });
  }
});

module.exports = { quizRouter };
