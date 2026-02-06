import { body, header, param, ValidationChain } from "express-validator/check";

export function authValidator(method: string): ValidationChain[] {
	switch (method) {
		case "GET /verify/email/:token": {
			return [param("token", "Invalid or missing 'token'").isJWT().exists()];
		}
		case "GET /verify/team/:token": {
			return [param("token", "Invalid or missing 'token'").isJWT().exists()];
		}
		case "POST /login": {
			return [
				param("userType", "Invalid or missing 'userType'").isString().exists(),
				body("email", "Invalid or missing 'email'").isString().exists(),
				body("password", "Invalid or missing 'password'").isString().exists(),
			];
		}
		case "POST /password/reset": {
			return [
				body("password", "Invalid or missing 'password'").isString().exists(),
				body("token", "Invalid or missing 'token").isJWT().exists(),
			];
		}
		case "POST /password/reset/form": {
			return [
				body("oldPassword", "Invalid or missing 'oldPassword'").isString().exists(),
				body("newPassword", "Invalid or missing 'newPassword'").isString().exists(),
			];
		}
		case "POST /verify/check": {
			return [
				body("token", "Invalid or missing 'token'").isJWT().exists(),
				body("type", "Invalid or missing 'type'").isString().exists(),
			];
		}
		case "POST /verify/resend": {
			return [];
		}
		case "POST /password/forgot": {
			return [body("email", "Invalid or missing 'email'").isString().exists()];
		}
		case "POST /refreshToken": {
			return [header("authorization", "Invalid or missing 'authorization'").isString().exists()];
		}
	}
}
