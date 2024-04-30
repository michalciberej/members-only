import express from 'express';
import asyncHandler from 'express-async-handler';
import { Message } from '../config/schema';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const messages = await Message.find({}).populate('postedBy');
    if (req.isAuthenticated()) {
      res.render('index', { isLoggedIn: true, messages, user: req.user });
    } else res.render('index', { isLoggedIn: false, messages });
  })
);

export default router;
