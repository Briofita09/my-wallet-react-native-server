import { Router } from "express";
import { validateSchemaMiddleware } from "../../middlewares/index.js";
import * as userController from "../../controllers/userController/index.js";

import { LoginSchema, SignUpSchema } from "../../schemas/userSchema/index.js";

const userRouter = Router();

userRouter.post(
  "/sign-up",
  validateSchemaMiddleware(SignUpSchema),
  userController.createUser
);

userRouter.post(
  "/login",
  validateSchemaMiddleware(LoginSchema),
  userController.loginUser
);

export { userRouter };
