import mongoose from "mongoose";

const connectDB = async (dbURI: string) => {
	const MONGO_DB_URI: string = dbURI;
	return await mongoose.connect(MONGO_DB_URI);
};

export default connectDB;
