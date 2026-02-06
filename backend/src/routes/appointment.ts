import { Router } from "express";
import { appointmentController } from "../controllers/appointment.controller";
import authMiddleware from "../middleware/auth/auth.middleware";
import { appointmentValidator } from "../middleware/validators/appointment";

const appointmentRouter: Router = Router();

appointmentRouter.get(
	"/:appointmentId",
	authMiddleware,
	appointmentValidator("GET /appointment/:appointmentId"),
	appointmentController.show
);

appointmentRouter.post("/", authMiddleware, appointmentValidator("POST /appointment"), appointmentController.create);

appointmentRouter.put(
	"/:appointmentId",
	authMiddleware,
	appointmentValidator("PUT /appointment/:appointmentId"),
	appointmentController.update
);

appointmentRouter.delete(
	"/:appointmentId",
	authMiddleware,
	appointmentValidator("DELETE /appointment/:appointmentId"),
	appointmentController.delete
);

export { appointmentRouter };
