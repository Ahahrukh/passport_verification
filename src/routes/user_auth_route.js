import { Router } from "express";
import requestValidatorMiddleware from "../middleware/validator_middleware.js";
import { createUserController, loginUserController, verificationController } from "../controllers/user_auth_controller.js";

const userRouter = Router()

userRouter.post("/create/user" , requestValidatorMiddleware , createUserController);
userRouter.post("/login/user" , requestValidatorMiddleware , loginUserController);
userRouter.post('/upload/image' , verificationController )

export default userRouter ;