import bcrypt from 'bcrypt';

export const validatePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const generatePassword = (password: string, salt: number = 10) => {
  return bcrypt.hashSync(password, salt);
};
