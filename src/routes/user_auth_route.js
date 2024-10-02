import { Router } from "express";
import requestValidatorMiddleware from "../middleware/validator_middleware.js";
import { createUserController, loginUserController, verificationController } from "../controllers/user_auth_controller.js";
import multer from 'multer';
import { GridFsStorage } from "multer-gridfs-storage";
import crypto from 'crypto';
import path from 'path';
import CONSTANTS from "../config/constants.js";

const userRouter = Router()

userRouter.post("/create/user" , requestValidatorMiddleware , createUserController);
userRouter.post("/login/user" , requestValidatorMiddleware , loginUserController);
userRouter.post('/upload/image' , verificationController )

export default userRouter ;