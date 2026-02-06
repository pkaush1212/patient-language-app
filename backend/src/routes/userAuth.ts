// todo: add validation

import { Router } from "express";
import authMiddleware from "../middleware/auth/auth.middleware";
import { userAuthController } from "../controllers/userAuth.controller";
import { authValidator } from "../middleware/validators/userAuth";

const userAuthRouter: Router = Router();

userAuthRouter.post("/login/:userType", authValidator("POST /login"), userAuthController.login);

userAuthRouter.get("/verify/email/:token", authValidator("GET /verify/email/:token"), userAuthController.verifyEmail);

userAuthRouter.get("/verify/team/:token", authValidator("GET /verify/team/:token"), userAuthController.approveUser);

userAuthRouter.post(
	"/password/reset",
	authValidator("POST /password/reset"),
	userAuthController.resetPasswordWithToken
);

userAuthRouter.post(
	"/password/reset/form",
	authMiddleware,
	authValidator("POST /password/reset/form"),
	userAuthController.resetPasswordOldNew
);

userAuthRouter.post("/verify/check", authValidator("POST /verify/check"), userAuthController.checkIfVerified);

userAuthRouter.post("/verify/resend", authMiddleware, authValidator("POST /verify/resend"), userAuthController.resendVerifyEmail);

userAuthRouter.post("/password/forgot", authValidator("POST /password/forgot"), userAuthController.forgotPassword);

// userAuthRouter.post("/refreshToken", authValidator("POST /refreshToken"), userAuthController.refreshToken);

export { userAuthRouter };
