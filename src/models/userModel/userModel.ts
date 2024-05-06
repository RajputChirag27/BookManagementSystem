import mongoose, { Schema } from "mongoose";
import { User } from "../../interfaces/userInterface/userInterface";

const userSchema :  Schema<User> = new Schema({
    username: {
        type : String,
        required  :true,
        unique : true
    },
    email: {
        type : String,
        required  :true,
        unique : true
    },
    password: {
        type : String,
        required  :true,
    },
    role : {
        type : String,
        emum: ['user', 'admin', 'author'],
        default : 'user'
    }
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;