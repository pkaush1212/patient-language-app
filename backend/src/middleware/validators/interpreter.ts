import { body, param, ValidationChain, query } from "express-validator";
import { checkIfDateFiltersValid } from "../../utils/functions";

const missingInterpreterIdParam = param("interpreterId", "Invalid or missing :interpreterId").exists().isMongoId();

export function interpreterValidator(method: string): ValidationChain[] {
	switch (method) {
		case "GET /interpreter": {
			return [];
		}
		case "GET /interpreter/:interpreterId": {
			return [missingInterpreterIdParam];
		}
		case "POST /interpreter": {
			return [
				body("email", "Invalid or missing 'email'").isEmail().exists(),
				body("password", "Invalid or missing 'password'").isString().exists(),
				body("firstName", "Invalid or missing 'firstName'").isString().isAlpha().exists(),
				body("lastName", "Invalid or missing 'lastName'").isString().isAlpha().exists(),
				body("languagesSpoken", "Invalid or missing 'languagesSpoken'").isArray().exists(),
				body("fieldOfStudy", "Invalid or missing 'fieldOfStudy'").optional().isString(),
			];
		}
		case "PUT /interpreter/:interpreterId": {
			return [
				missingInterpreterIdParam,
				body("email", "Invalid or missing 'email'").isEmail().exists(),
				body("firstName", "Invalid or missing 'firstName'").isString().isAlpha().exists(),
				body("lastName", "Invalid or missing 'lastName'").isString().isAlpha().exists(),
				body("languagesSpoken", "Invalid or missing 'languagesSpoken'").isArray().exists(),
				body("fieldOfStudy", "Invalid or missing 'fieldOfStudy'").optional().isString(),
			];
		}
		case "DELETE /interpreter/:interpreterId": {
			return [missingInterpreterIdParam];
		}
		case "GET /interpreter/requests/proposed": {
			return [];
		}
		case "GET /interpreter/appointments": {
			return [
				query("from", "Invalid date range")
					.optional()
					.custom((value, { req }) => checkIfDateFiltersValid(value, req.query.to)),
			];
		}
	}
}
