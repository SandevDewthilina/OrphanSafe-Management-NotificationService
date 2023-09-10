import asyncHandler from "express-async-handler";
import { verifyJWT } from "../utils/index.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = verifyJWT(token);
      console.log('JWT token verfied', token)
      req.userInfo = decoded;
      next();
    } catch (err) {
      res.status(401);
      console.log("invalid token")
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    console.log("no token")
    throw new Error("Not authorized, no token");
  }
});

export { protect };
