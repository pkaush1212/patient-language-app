import { Router } from "express";
import { requesterController } from "../controllers/requester.controller";
import { requesterValidator } from "../middleware/validators/requester";
import authMiddleware from "../middleware/auth/auth.middleware";

const requesterRouter: Router = Router();

requesterRouter.post("/", requesterValidator("POST /requester"), requesterController.create);

requesterRouter.put(
	"/:requesterId",
	authMiddleware,
	requesterValidator("PUT /requester/:requesterId"),
	requesterController.update
);

requesterRouter.delete(
	"/:requesterId",
	authMiddleware,
	requesterValidator("DELETE /requester/:requesterId"),
	requesterController.delete
);

requesterRouter.get(
	"/requests",
	authMiddleware,
	requesterValidator("GET /requester/requests"),
	requesterController.getRequests
);

requesterRouter.get(
	"/appointments",
	authMiddleware,
	requesterValidator("GET /requester/appointments"),
	requesterController.getAppointments
);

requesterRouter.get(
	"/:requesterId",
	authMiddleware,
	requesterValidator("GET /requester/:requesterId"),
	requesterController.show
);

requesterRouter.get("/", authMiddleware, requesterValidator("GET /requester"), requesterController.getall);

export { requesterRouter };
