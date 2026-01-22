import bcrypt from "bcrypt";

export const comparePassword = async (
  password: string,
  hashedpassword: string
) => {
  return bcrypt.compare(password, hashedpassword);
};
