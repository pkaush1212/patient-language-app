import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/check";
import { hashPassword, compareHash, signTokenWithPayload, verifyTokenAndResolve } from "../utils/auth";
import { statusCodes } from "../config/statusCodes";
import {
	approvalFailureTemplate,
	approvalSuccessTemplate,
	UserType,
	verifiedFailureTemplate,
	verifiedSuccessTemplate,
} from "../config/properties";
import HttpException from "../middleware/errors/HttpException";
import { interpreterDBInteractions } from "../database/interactions/interpreter";
import { requesterDBInteractions } from "../database/interactions/requester";
import { IUserModel } from "../database/models/user";
import { APPROVAL_JWT_TYPE, userPayload, VERIFICATION_JWT_TYPE, PASSWORD_RESET_JWT_TYPE } from "../config/auth";
import { userDBInteractions } from "../database/interactions/user";
import logger from "../utils/logger";
import { sendApprovedEmailToUser, sendForgotPasswordEmail, sendVerifyEmail } from "../services/email-sender";

const userAuthController = {
	login: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { userType } = req.params;
				const userInfo = req.body;

				let user: IUserModel = null;

				if (userType === UserType.INTERPRETER) {
					const interpreters = await interpreterDBInteractions.findByAttribute(
						"email",
						userInfo.email,
						"+password"
					);
					user = interpreters[0];
				} else if (userType === UserType.REQUESTER) {
					const requesters = await requesterDBInteractions.findByAttribute(
						"email",
						userInfo.email,
						"+password"
					);
					user = requesters[0];
				} else {
					next(new HttpException(statusCodes.SERVER_ERROR, "Invalid user type."));
					return;
				}

				if (user == null) {
					next(new HttpException(statusCodes.SERVER_ERROR, "Invalid credentials. Please try again."));
					return;
				}

				const isCorrectPassword = await compareHash(userInfo.password, user.password);

				/* Don't actually tell the user which credential is wrong, as that can be exploited. */
				if (!isCorrectPassword) {
					next(new HttpException(statusCodes.SERVER_ERROR, "Invalid credentials. Please try again."));
					return;
				}

				const token = signTokenWithPayload(userPayload(user, userType));
				const { password, ...result } = user.toJSON();
				res.status(200).json({ user: result, accessToken: token, refreshToken: token });
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	approveUser: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(statusCodes.SUCCESS).send(approvalFailureTemplate);
		} else {
			const token = req.params.token;

			verifyTokenAndResolve(
				token,
				(decoded) => decoded.type === APPROVAL_JWT_TYPE,
				async (error) => {
					res.status(statusCodes.FORBIDDEN).send(approvalFailureTemplate);
					return;
				},
				async (_id) => {
					try {
						const verifyUser = await userDBInteractions.verifyUser(_id);

						if (verifyUser) {
							// notify the interpreter.
							sendApprovedEmailToUser(verifyUser);
							res.status(statusCodes.SUCCESS).send(approvalSuccessTemplate);
						} else {
							logger.error("Unable to approve user (not found) with id:" + _id);
							throw new Error("User not found.");
						}
					} catch (error) {
						logger.error("Unable to approve user with id:" + _id + "with error: " + error);
						res.status(statusCodes.SERVER_ERROR).send(approvalFailureTemplate);
					}
				}
			);
		}
	},

	verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(statusCodes.SUCCESS).send(approvalFailureTemplate);
		} else {
			const token = req.params.token;

			verifyTokenAndResolve(
				token,
				(decoded) => decoded.type === VERIFICATION_JWT_TYPE,
				async (error) => {
					res.status(statusCodes.FORBIDDEN).send(verifiedFailureTemplate);
				},
				async (_id) => {
					try {
						const verifyUser = await userDBInteractions.verifyUser(_id);

						if (verifyUser) {
							res.status(statusCodes.SUCCESS).send(verifiedSuccessTemplate);
						} else {
							logger.error("Unable to verify user (not found) with id:" + _id);
							throw new Error("User not found.");
						}
					} catch (error) {
						logger.error("Unable to verify user with id:" + _id + "with error: " + error);
						res.status(statusCodes.SERVER_ERROR).send(verifiedFailureTemplate);
					}
				}
			);
		}
	},

	checkIfVerified: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { type, token } = req.body;

				verifyTokenAndResolve(
					token,
					(decoded) => decoded._id, // check if _id exists
					async (error) => {
						next(new HttpException(statusCodes.BAD_REQUEST, "The token provided is invalid."));
						return;
					},
					async (_id) => {
						const user: IUserModel = await userDBInteractions.find(_id);

						if (user.isVerified) {
							// issue an auth response
							const jwt = signTokenWithPayload(userPayload(user, type as UserType));

							res.status(statusCodes.SUCCESS).json({
								user,
								accessToken: jwt,
								refreshToken: jwt,
							});
						} else {
							res.status(statusCodes.SUCCESS).json("The user is not verified");
						}
					}
				);
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	/**
	 * Reset Password by providing new password and x-password-reset token
	 * @param req
	 * @param res
	 * @param next
	 */
	resetPasswordWithToken: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { password, token } = req.body;

				verifyTokenAndResolve(
					token,
					(decoded) => decoded._id && decoded.type === PASSWORD_RESET_JWT_TYPE,
					async (error) => {
						next(new HttpException(statusCodes.UNAUTHORIZED, "Invalid token"));
						return;
					},
					async (_id) => {
						const user: IUserModel = await userDBInteractions.find(_id);

						if (!user) {
							next(new HttpException(statusCodes.UNAUTHORIZED, "Invalid token"));
							return;
						}

						const hashedPassword = await hashPassword(password);

						await userDBInteractions.updateFields(_id, { password: hashedPassword });
						res.status(statusCodes.SUCCESS).send();
					}
				);
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	/**
	 * Reset Password by providing old password and new password
	 * @param req
	 * @param res
	 * @param next
	 */
	resetPasswordOldNew: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { _id } = res.locals;
				const { oldPassword, newPassword } = req.body;

				const users: IUserModel[] = await userDBInteractions.findByAttribute("_id", _id, "+password");
				const userData = users[0];

				if (userData == null) {
					throw new Error("Incorrect password.");
				}

				const result = await compareHash(oldPassword, userData.password);

				if (!result) {
					throw new Error("Incorrect password.");
				}

				const hashedPassword = await hashPassword(newPassword);

				await userDBInteractions.updateFields(_id, { password: hashedPassword });

				res.status(statusCodes.SUCCESS).send();
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { email } = req.body;

				const users: IUserModel[] = await userDBInteractions.findByAttribute("email", email);
				const userData = users[0];

				const _id = userData._id.toString();

				sendForgotPasswordEmail(_id, email);

				res.status(statusCodes.SUCCESS).send();
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	resendVerifyEmail: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { _id, isVerified } = res.locals;

				if (isVerified) {
					throw new Error("User is already verified.");
				}

				const user: IUserModel = await userDBInteractions.find(_id);
				const { email } = user.toJSON();

				sendVerifyEmail(_id, email);

				res.status(statusCodes.SUCCESS).send();
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	}

	// 	refreshToken: async (req: Request, res: Response) => {
	// 		const errors = validationResult(req);
	// 		if (!errors.isEmpty()) {
	// 			res.status(statusCodes.MISSING_PARAMS).json({
	// 				status: 422,
	// 				message: `Error: there are missing parameters.`,
	// 			});
	// 		} else {
	// 			const jwtToken = req.headers?.authorization.split(" ")[1];
	// 			jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, _decoded) => {
	// 				if (err) {
	// 					if (err.name === "TokenExpiredError") {
	// 						const payload = jwt.verify(jwtToken, process.env.JWT_SECRET, { ignoreExpiration: true });
	// 						const newToken = jwt.sign(
	// 							{
	// 								_id: payload._id,
	// 								isApproved: payload.isApproved,
	// 								isEmailVerified: payload.isEmailVerified,
	// 							},
	// 							process.env.JWT_SECRET,
	// 							{ algorithm: "HS256", expiresIn: "2d" }
	// 						);
	// 						res.status(statusCodes.SUCCESS).json({ jwtToken: newToken });
	// 					} else {
	// 						res.status(statusCodes.BAD_REQUEST).json({
	// 							status: 422,
	// 							message: err,
	// 						});
	// 					}
	// 				} else {
	// 					res.status(statusCodes.SUCCESS).json({ jwtToken });
	// 				}
	// 			});
	// 		}
	// 	},
};

export { userAuthController };
