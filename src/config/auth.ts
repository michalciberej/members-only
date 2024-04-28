import passport, { DoneCallback } from 'passport';
import { User, type UserType } from './schema';
import { validatePassword } from '../utils/password';

const LocalStrategy = require('passport-local').Strategy;

const verify = async (
  username: string,
  password: string,
  done: DoneCallback
) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false);

    const isCorrectPassword = validatePassword(password, user.password);

    if (isCorrectPassword) return done(null, user);
    else return done(null, false);
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(verify);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user: UserType, done) => {
  try {
    const usr = await User.findOne({ username: user.password });
    done(null, usr);
  } catch (err) {
    done(err);
  }
});

export default passport;
