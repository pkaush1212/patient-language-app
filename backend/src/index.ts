import express from "express";
import cors from "cors";
import helmet from "helmet";
import configureRoutes from "./routes/routes";
import connectDB from "./database/db_config";
import { MONGODB_URI } from "./utils/secrets";
import logger from "./utils/logger";
import errorMiddleware from "./middleware/errors/error.middleware";

const app = express();
const port = process.env.PORT || 8080; // default port to listen

// allow cors and security headers
app.use(cors());
app.use(helmet());
app.use(express.json());

// Set up database
connectDB(MONGODB_URI);

// Set up all routes
configureRoutes(app);

// Set up middlewares
app.use(errorMiddleware);

// define a route handler for the default home page
app.get("/", (req, res) => {
	res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
	logger.info(`server started at http://localhost:${port}`);
});

export { app };
