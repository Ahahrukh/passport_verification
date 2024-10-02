import { Router } from "express";
import requestValidatorMiddleware from "../middleware/validator_middleware.js";
import { createUserController, loginUserController, verificationController } from "../controllers/user_auth_controller.js";
import multer from 'multer';
import { GridFsStorage } from "multer-gridfs-storage";
import crypto from 'crypto';
import path from 'path';
import CONSTANTS from "../config/constants.js";

const userRouter = Router()

const storage = new GridFsStorage({
    url: CONSTANTS.database_url,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
          };
          resolve(fileInfo);
        });
      });
    },
  });
  const upload = multer({ storage });

userRouter.post("/create/user" , requestValidatorMiddleware , createUserController);
userRouter.post("/login/user" , requestValidatorMiddleware , loginUserController);
userRouter.post('/upload/image' ,upload.single('file') , verificationController )

export default userRouter ;