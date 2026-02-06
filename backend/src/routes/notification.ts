import { Router } from "express";
import { notificationValidator } from "../middleware/validators/notification";
import { notificationController } from "../controllers/notification.controller";
import authMiddleware from "../middleware/auth/auth.middleware";

const notificationRouter: Router = Router();

notificationRouter.get(
	"/byReceiver",
	authMiddleware,
	notificationValidator("GET /notification/byReceiver"),
	notificationController.getNotificationsForUser
);

notificationRouter.put(
	"/read/:notificationId",
	authMiddleware,
	notificationValidator("PUT /notification/read/:notificationId"),
	notificationController.markNotificationAsRead
);

notificationRouter.put(
	"/seen",
	authMiddleware,
	notificationValidator("PUT /notification/seen/"),
	notificationController.markNotificationsAsSeen
);

export { notificationRouter };
