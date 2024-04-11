import express from "express";
import { Account } from "../db.js";
import { userMiddleware } from "../middleware.js";
import mongoose from "mongoose";
const accountRouter = express.Router();

accountRouter.get("/balance", userMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  if (!account) {
    return res.status(403).json({
      msg: "No such user!",
    });
  }
  return res.json({
    balance: account.balance,
  });
});

accountRouter.post("/transfer", userMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { to, amount } = req.body;
  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  // Check if account exists
  if (!account) {
    await session.abortTransaction();
    return res.status(403).json({
      msg: "No such user!",
    });
  }

  if (account.balance < amount) {
    await session.abortTransaction();
    return res.status(411).json({
      msg: "Insufficient balance!",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Invalid account!",
    });
  }

  try {
    await Account.updateOne(
      {
        userId: req.userId,
      },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);

    await Account.updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);

    await session.commitTransaction();
    res.json({
      msg: "Transfer successful!",
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      msg: "Error during transaction",
      error: error.message,
    });
  }
});

export { accountRouter };
