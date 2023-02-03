import express from "express"
import { login, userSignUp } from "../controllers/userControllers.js";
import multer from "multer";
import storage from "../config/cloudinary.js"




const userRouter = express.Router();
const upload = multer({storage : storage})



userRouter.post("/signup",upload.single("imageFile"),userSignUp)
userRouter.post("/",login)

export default userRouter;

