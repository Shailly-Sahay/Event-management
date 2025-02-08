import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  console.log("Incoming Request Headers:", req.headers);
  console.log("Cookies:", req.cookies);

  const token =
    req.cookies["auth_token"] || req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("Token not found!");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    console.log("User authenticated:", req.userId);
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
