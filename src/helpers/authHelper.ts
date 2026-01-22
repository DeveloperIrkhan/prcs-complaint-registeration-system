import bcrypt from "bcrypt";
export const hashingPassword = async (password: string) => {
  try {
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    console.log("error while hashing password", error);
  }
};
