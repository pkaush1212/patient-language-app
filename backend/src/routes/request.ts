import { Router } from "express";
import { requestController } from "../controllers/request.controller";
import authMiddleware from "../middleware/auth/auth.middleware";
import { requestValidator } from "../middleware/validators/request";

const requestRouter: Router = Router();

requestRouter.get("/:requestId", authMiddleware, requestValidator("GET /request/:requestId"), requestController.show);

requestRouter.post("/", authMiddleware, requestValidator("POST /request"), requestController.create);

requestRouter.put("/:requestId", authMiddleware, requestValidator("PUT /request/:requestId"), requestController.update);

requestRouter.put(
	"/cancel/:requestId",
	authMiddleware,
	requestValidator("PUT /request/cancel/:requestId"),
	requestController.cancel
);

requestRouter.delete(
	"/:requestId",
	authMiddleware,
	requestValidator("DELETE /request/:requestId"),
	requestController.delete
);

export { requestRouter };
