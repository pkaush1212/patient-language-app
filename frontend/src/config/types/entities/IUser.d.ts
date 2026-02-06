import IMongooseFields from "./IMongooseFields";

export default interface IUser extends IMongooseFields {
    // Type
    __t?: string;

    email: string;
    password?: string;
    isVerified?: boolean;
    firstName: string;
    lastName: string;
}
