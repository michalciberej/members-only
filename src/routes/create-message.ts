import express, { Request } from 'express';
import asyncHandler from 'express-async-handler';
import { Message, MessageType, UserType } from '../config/schema';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
  '/',
  (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.redirect('/');
  },
  (req, res) => {
    res.render('create-message');
  }
);

router.post(
  '/',
  (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.redirect('/');
  },
  asyncHandler(async (req, res) => {
    const message = new Message({
      _id: new mongoose.Types.ObjectId(),
      postedBy: req.user?._id!,
      postedOn: new Date(),
      body: req.body.message as string,
    });

    try {
      await message.save();
      res.redirect('/');
    } catch (err) {
      res.render('creare-message', { err });
    }
  })
);

export default router;
