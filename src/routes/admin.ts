import express from 'express';
import isAdmin from '../utils/isAdmin';
import { Message, User } from '../config/schema';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get(
  '/',
  isAdmin,
  asyncHandler(async (req, res) => {
    const messages = await Message.find({});
    const users = await User.find({});
    res.render('admin', { users, messages });
  })
);

router.post('/', isAdmin, (req, res) => {
  res.send('post admin');
});

export default router;
