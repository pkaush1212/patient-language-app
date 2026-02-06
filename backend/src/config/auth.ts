import { UserType } from "./properties";

const APPROVAL_JWT_TYPE = "approval";
const VERIFICATION_JWT_TYPE = "verification";
const PASSWORD_RESET_JWT_TYPE = "password-reset";

const interpreterPayload = (user) => {
	return {
		_id: user._id.toString(),
		role: UserType.INTERPRETER,
		isVerified: user.isVerified,
	};
};

const requesterPayload = (user) => {
	return {
		_id: user._id.toString(),
		role: UserType.REQUESTER,
		isVerified: user.isVerified,
	};
};

const userPayload = (user, role: UserType) => {
	return role === UserType.INTERPRETER ? interpreterPayload(user) : requesterPayload(user);
};

const emailVerificationPayload = (userId: string) => {
	return {
		_id: userId,
		type: VERIFICATION_JWT_TYPE,
	};
};

const approveUserPayload = (userId: string) => {
	return {
		_id: userId,
		type: APPROVAL_JWT_TYPE,
	};
};

const passwordResetPayload = (userId: string) => {
	return {
		_id: userId,
		type: PASSWORD_RESET_JWT_TYPE,
	};
};

export {
	APPROVAL_JWT_TYPE,
	VERIFICATION_JWT_TYPE,
	PASSWORD_RESET_JWT_TYPE,
	interpreterPayload,
	requesterPayload,
	userPayload,
	emailVerificationPayload,
	approveUserPayload,
	passwordResetPayload,
};
