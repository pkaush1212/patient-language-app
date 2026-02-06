import { body, param, ValidationChain } from "express-validator";

const missingAppointmentIdParam = param("appointmentId", "Invalid or missing :appointmentId").exists().isMongoId();

export function appointmentValidator(method: string): ValidationChain[] {
	switch (method) {
		case "GET /appointment": {
			return [];
		}
		case "GET /appointment/:appointmentId": {
			return [missingAppointmentIdParam];
		}
		case "POST /appointment": {
			return [
				body("requester", "Invalid or missing 'requester'").exists().isMongoId(),
				body("interpreter", "Invalid or missing 'interpreter'").exists().isMongoId(),
				body("request", "Invalid or missing 'request'").exists().isMongoId(),
			];
		}
		case "PUT /appointment/:appointmentId": {
			return [
				missingAppointmentIdParam,
				body("interpreter", "Invalid or missing 'interpreter'").exists().isMongoId(),
			];
		}
		case "DELETE /appointment/:appointmentId": {
			return [missingAppointmentIdParam];
		}
	}
}
