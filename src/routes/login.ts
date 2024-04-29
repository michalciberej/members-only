import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/register',
    successRedirect: '/',
  })
);

export default router;
