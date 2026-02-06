// Configure all routes.

import { appointmentRouter } from "./appointment";
import { interpreterRouter } from "./interpreter";
import { notificationRouter } from "./notification";
import { requestRouter } from "./request";
import { requesterRouter } from "./requester";
import { userAuthRouter } from "./userAuth";

const configureRoutes = (app) => {
	// Auth Router
	app.use("/api/auth", userAuthRouter);

	// Interpreters Router
	app.use("/api/interpreter", interpreterRouter);

	// Requester Router
	app.use("/api/requester", requesterRouter);

	// Request Router
	app.use("/api/request", requestRouter);

	// Appointment Router
	app.use("/api/appointment", appointmentRouter);

	// Notification Router
	app.use("/api/notification", notificationRouter);
};

export default configureRoutes;
