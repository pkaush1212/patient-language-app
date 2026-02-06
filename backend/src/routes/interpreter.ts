import { Router } from "express";
import { interpreterController } from "../controllers/interpreter.controller";
import authMiddleware from "../middleware/auth/auth.middleware";
import { interpreterValidator } from "../middleware/validators/interpreter";

const interpreterRouter: Router = Router();

interpreterRouter.post("/", interpreterValidator("POST /interpreter"), interpreterController.create);

interpreterRouter.put(
	"/:interpreterId",
	authMiddleware,
	interpreterValidator("PUT /interpreter/:interpreterId"),
	interpreterController.update
);

interpreterRouter.delete(
	"/:interpreterId",
	authMiddleware,
	interpreterValidator("DELETE /interpreter/:interpreterId"),
	interpreterController.delete
);

interpreterRouter.get(
	"/requests/proposed",
	authMiddleware,
	interpreterValidator("GET /interpreter/requests/proposed"),
	interpreterController.getProposedRequests
);

interpreterRouter.get(
	"/appointments",
	authMiddleware,
	interpreterValidator("GET /interpreter/appointments"),
	interpreterController.getAppointments
);

interpreterRouter.get(
	"/:interpreterId",
	authMiddleware,
	interpreterValidator("GET /interpreter/:interpreterId"),
	interpreterController.show
);

interpreterRouter.get("/", authMiddleware, interpreterValidator("GET /interpreter"), interpreterController.getall);

export { interpreterRouter };
