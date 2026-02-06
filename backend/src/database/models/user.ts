// @ts-nocheck
import { Document, Model, model, Schema } from "mongoose";
import HttpException from "../../middleware/errors/HttpException";
import { IUser } from "../../domain/IUser";
import { statusCodes } from "../../config/statusCodes";

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			select: false,
		},
		firstName: String,
		lastName: String,
		isVerified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.index({ createdAt: 1 });

userSchema.post("save", (error, doc, next) => {
	if (error.name === "MongoError" && error.code === 11000) {
		next(
			new HttpException(statusCodes.BAD_REQUEST, "A user with this email already exists! Please log in instead.")
		);
	} else {
		next();
	}
});

const User: Model<IUserModel> = model("User", userSchema);

export { User };
