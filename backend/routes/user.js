import express from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import { Account, User } from "../db.js";
import { secret_key } from "../config.js";
import { userMiddleware } from "../middleware.js";

const userRouter = express.Router();

const userSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(5),
  name: zod.string(),
});

userRouter.post("/signup", async (req, res) => {
  const success = userSchema.safeParse(req.body);
  if (!success) {
    return res.status(403).json({
      msg: "Wrong Inputs!",
    });
  }
  const exist = await User.findOne({ email: req.body.email });
  if (exist) {
    return res.status(403).json({
      msg: "User already exists!",
    });
  }
  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });
  const user_id = user._id;
  await Account.create({
    userId: user_id,
    balance: (1 + Math.random() * 10000).toFixed(2),
  });
  const token = jwt.sign({ user_id }, secret_key);
  return res.json({
    message: "User created successfully!",
    token,
  });
});

const signinInput = zod.object({
  email: zod.string().email(),
  password: zod.string().min(5),
});

userRouter.post("/signin", async (req, res) => {
  const success = signinInput.safeParse(req.body);
  if (!success) {
    return res.status(403).json({
      msg: "Wrong Inputs!",
    });
  }
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  //   const userId = user._id;
  if (user) {
    const token = jwt.sign({ userId: user._id }, secret_key);
    return res.json({
      token,
    });
  }
  res.status(411).json({
    msg: "Error while logging in!",
  });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

userRouter.put("/", userMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.findByIdAndUpdate(req.userId, req.body);
  res.json({
    message: "Updated successfully",
  });
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        name: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      email: user.email,
      name: user.name,
      id: user._id,
    })),
  });
});

export { userRouter };
