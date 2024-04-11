import mongoose from "mongoose";
mongoose.connect(
  ""
);
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});
const User = mongoose.model("User", UserSchema);
const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  balance: Number,
});
const Account = mongoose.model("Account", AccountSchema);

export { User, Account };
