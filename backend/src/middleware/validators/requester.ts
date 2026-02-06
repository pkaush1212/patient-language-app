import { body, param, query, ValidationChain } from "express-validator";
import { checkIfDateFiltersValid } from "../../utils/functions";

const missingRequesterIdParam = param("requesterId", "Invalid or missing :requesterId").exists().isMongoId();

export function requesterValidator(method: string): ValidationChain[] {
	switch (method) {
		case "GET /requester": {
			return [];
		}
		case "GET /requester/:requesterId": {
			return [missingRequesterIdParam];
		}
		case "POST /requester": {
			return [
				body("phoneNumber", "Invalid or missing 'phoneNumber'").isMobilePhone("en-CA").exists(),
				body("email", "Invalid or missing 'email'").isEmail().exists(),
				body("password", "Invalid or missing 'password'").isString().exists(),
				body("firstName", "Invalid or missing 'firstName'").isString().isAlpha().exists(),
				body("lastName", "Invalid or missing 'lastName'").isString().isAlpha().exists(),
				body("hospital", "Invalid or missing 'hospital'").isString().optional(),
				body("department", "Invalid or missing 'department'").isString().optional(),
				body("position", "Invalid or missing 'position'").isString().optional(),
				body("clinicalSetting", "Invalid or missing 'fieldOfStudy'").isString().optional(),
			];
		}
		case "PUT /requester/:requesterId": {
			return [
				missingRequesterIdParam,
				body("phoneNumber", "Invalid or missing 'phoneNumber'").isMobilePhone("en-CA").exists(),
				body("email", "Invalid or missing 'email'").isEmail().exists(),
				body("firstName", "Invalid or missing 'firstName'").isString().isAlpha().exists(),
				body("lastName", "Invalid or missing 'lastName'").isString().isAlpha().exists(),
				body("hospital", "Invalid or missing 'hospital'").isString().optional(),
				body("department", "Invalid or missing 'department'").isString().optional(),
				body("position", "Invalid or missing 'position'").isString().optional(),
				body("clinicalSetting", "Invalid or missing 'fieldOfStudy'").isString().optional(),
			];
		}
		case "DELETE /requester/:requesterId": {
			return [missingRequesterIdParam];
		}
		case "GET /requester/requests": {
			return [
				query("from", "Invalid date range")
					.optional()
					.custom((value, { req }) => checkIfDateFiltersValid(value, req.query.to)),
			];
		}
		case "GET /requester/appointments": {
			return [
				query("from", "Invalid date range")
					.optional()
					.custom((value, { req }) => checkIfDateFiltersValid(value, req.query.to)),
			];
		}
	}
}
