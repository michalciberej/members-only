import express from 'express';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import home from './routes/home';
import register from './routes/register';

require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SECRET!,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

require('./config/auth');
app.use(passport.initialize());
app.use(passport.session());

app.use(home);
app.use(register);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
