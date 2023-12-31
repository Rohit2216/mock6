const express = require('express');
const userRouter = express.Router();
const {UserModel} = require('../model/user.model');


userRouter.post('/register', async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await UserModel.create({ username, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});


userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = {userRouter};
