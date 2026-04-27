import jwt from "jsonwebtoken";

const generateToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET || "development_secret_change_me",
    {
      expiresIn: process.env.JWT_EXPIRE || "7d"
    }
  );

export default generateToken;
