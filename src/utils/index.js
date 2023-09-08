import jwt from "jsonwebtoken";
import { JWT_SECRET, NODE_ENV } from "../config/index.js";

const verifyJWT = (token) => {
  return jwt.verify(token, JWT_SECRET)
};

export {verifyJWT };
