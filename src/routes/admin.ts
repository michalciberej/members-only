import express from 'express';
import isAdmin from '../utils/isAdmin';
import { Message, User } from '../config/schema';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get(
  '/',
  isAdmin,
  asyncHandler(async (req, res) => {
    const messages = await Message.find({}).populate('postedBy');
    const users = await User.find({});
    res.render('admin', { users, messages });
  })
);

router.post('/', isAdmin, (req, res) => {
  res.send('post admin');
});

router.post(
  '/user/:id',
  isAdmin,
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      await User.findOneAndUpdate(
        { _id: req.params.id },
        { permision: user?.permision === 'admin' ? 'member' : 'admin' }
      );
      res.redirect('/admin');
    } catch (err) {
      const messages = await Message.find({}).populate('postedBy');
      const users = await User.find({});
      res.render('admin', { err, messages, users });
    }
  })
);

router.post(
  '/message/:id',
  isAdmin,
  asyncHandler(async (req, res) => {
    try {
      await Message.deleteOne({ _id: req.params.id });
      res.redirect('/admin');
    } catch (err) {
      const messages = await Message.find({}).populate('postedBy');
      const users = await User.find({});
      res.render('admin', { err, messages, users });
    }
  })
);

export default router;
