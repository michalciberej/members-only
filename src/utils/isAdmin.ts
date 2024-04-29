import { Request, Response, NextFunction } from 'express';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.permision === 'admin') next();
  else res.redirect('/');
};

export default isAdmin;
