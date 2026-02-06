import { body, param, ValidationChain } from "express-validator";

export function notificationValidator(method: string): ValidationChain[] {
	switch (method) {
		case "GET /notification/byReceiver": {
			return [];
		};
		case "PUT /notification/read/:notificationId": {
			return [param("notificationId", "Invalid or missing :notificationId").exists().isMongoId()];
		};
		case "PUT /notification/seen/": {
			return [body("notificationIds", "Invalid or missing 'notificationIds'").exists().isArray()];
		};
	}
}
