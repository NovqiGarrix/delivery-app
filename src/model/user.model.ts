import mongoose from 'mongoose';

export type Role = 0 | 1 | 2 | 3;
export type UserType = 'user' | 'food-chef' | 'drink-chef' | 'driver' | 'admin';
export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    type: UserType;
    voted: Array<string>;

    createdAt: string;
    updatedAt: string;
}

export type UserReturn = Omit<User, 'password'>

const schema = new mongoose.Schema({

    name: {
        required: true,
        type: String
    },

    email: {
        required: true,
        unique: true,
        type: String
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    voted: [String]

}, { timestamps: true });

const UserModel = mongoose.model<User>('User', schema);
export default UserModel

