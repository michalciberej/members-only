import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/register', (req, res) => {
  res.render('index');
});

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    try {
      res.redirect('login');
    } catch (err) {
      res.render('register', { err });
    }
  })
);

export default router;
