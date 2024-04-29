import express from 'express';
import asyncHandler from 'express-async-handler';
import { User } from '../config/schema';
import { generatePassword } from '../utils/password';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      // const isUserInDB = await User.findOne({ username: req.body.username });

      // if (isUserInDB)
      //   res.render('register', { err: 'Username is already taken' });

      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username as string,
        password: generatePassword(req.body.password),
      });

      await newUser.save();

      res.redirect('/login');
    } catch (err) {
      res.render('register', { err });
    }
  })
);

export default router;
