import jwt from "jsonwebtoken";
import { secret_key } from "./config.js";
function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secret_key);
    req.userId = decoded.user_id;
    next();
  } catch (e) {
    return res.status(403).json({
      msg: "Not signed in!",
    });
  }
}
export { userMiddleware };
