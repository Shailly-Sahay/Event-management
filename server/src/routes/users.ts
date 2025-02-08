import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
      return;
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      user = new User({ ...req.body, registeredEvents: [] });

      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: true,

        maxAge: 86400000,
      });

      res.status(200).json({ message: "User registered successfully!" });
      return;
    } catch (error: any) {
      res.status(500).json({
        message: "Something went wrong",
      });
      return;
    }
  }
);

export default userRouter;
