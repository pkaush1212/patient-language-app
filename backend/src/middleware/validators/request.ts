import { body, check, param, ValidationChain } from "express-validator";
import { checkIfValidFutureDate } from "../../utils/functions";

const missingRequestIdParam = param("requestId", "Invalid or missing :requestId").exists().isMongoId();

export function requestValidator(method: string): ValidationChain[] {
	switch (method) {
		case "GET /request": {
			return [];
		}
		case "GET /request/:requestId": {
			return [missingRequestIdParam];
		}
		case "POST /request": {
			return [
				body("requester", "Invalid or missing 'requester'").exists().isMongoId(),

				body("date", "Invalid or missing 'date'. Please ensure this is a future date.")
					.exists()
					.custom((value) => checkIfValidFutureDate(value)),

				body("interpretationMode", "Invalid or missing 'interpretationMode'").isString().exists(),
				body("clinicalSetting", "Invalid or missing 'clinicalSetting'").isString().exists(),
				body("languageRequired", "Invalid or missing 'languageRequired").isArray().exists().notEmpty(),
				body("department", "Invalid or missing 'department'").isString().exists(),
				body("dialect", "Invalid or missing 'dialect'").isString().optional(),
				body("patientGender", "Invalid or missing 'patientGender'").isAlpha().optional(),
			];
		}
		case "PUT /request/:requestId": {
			return [
				missingRequestIdParam,
				body("requester", "Invalid or missing 'requester'").exists().isMongoId(),

				body("date", "Invalid or missing 'date'. Please ensure this is a future date.")
					.exists()
					.custom((value) => checkIfValidFutureDate(value)),

				body("interpretationMode", "Invalid or missing 'interpretationMode'").isString().exists(),
				body("languageRequired", "Invalid or missing 'languageRequired").isArray().exists(),
				body("dialect", "Invalid or missing 'dialect'").isString().optional(),
				body("patientGender", "Invalid or missing 'patientGender'").isAlpha().optional(),
				body("department", "Invalid or missing 'department'").isString().optional(),
				body("clinicalSetting", "Invalid or missing 'clinicalSetting'").isString().optional(),
			];
		}
		case "PUT /request/cancel/:requestId": {
			return [missingRequestIdParam];
		}
		case "DELETE /request/:requestId": {
			return [missingRequestIdParam];
		}
	}
}
