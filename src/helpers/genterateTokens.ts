import User from "@/models/user.model";
import jwt, { SignOptions } from "jsonwebtoken";

const generateAsscesstoken = (id: string, role: string) => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret)
    throw new Error("ACCESS_TOKEN_SECRET is not defined.");

  const option: SignOptions = {
    expiresIn: "7h"
  };
  return jwt.sign({ id, role }, accessTokenSecret, option);
};

const generateRefreshToken = (id: string) => {
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshTokenSecret)
    throw new Error("refresh token is not defiend in .env");
  const option: SignOptions = { expiresIn: "3d" };

  return jwt.sign({ id }, refreshTokenSecret, option);
};

export const generateTokens = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("user not found..");
    const accessToken = generateAsscesstoken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { refreshToken, accessToken };
  } catch (error) {
    throw new Error(`error, ${error}`);
  }
};
