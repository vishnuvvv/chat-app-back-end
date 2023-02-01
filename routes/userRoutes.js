import express from "express"
import { login, userSignUp } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/signup",userSignUp);
userRouter.post("/",login)

export default userRouter;