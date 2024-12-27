import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
export const middleware = async (req, res, next) => {
  if (req.cookies.token) {
    req.user = await req.cookies.token;
    const verifyToken = await jwt.verify(
      req.cookies.token,
      process.env.TOKEN_SECRET
    );
    if (verifyToken) {
      next();
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
