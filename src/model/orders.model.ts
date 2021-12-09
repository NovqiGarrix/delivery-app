import mongoose from 'mongoose';

export type OrderStatus = 'pending' | 'ongoing' | 'finished' | 'picked' | 'delivered'

export type TakenByChef = {
    chefId: string;
    chefName: string;
    takenAt: string;
    finishAt?: string;
}

export interface IOrder {
    _id: string;
    userId: string;
    driverId: string;
    takenByChef: TakenByChef;
    dishesIds: Array<string>;
    destination: string;
    status: OrderStatus
    finishedDishesIds: Array<string>;

    createdAt: string;
    updatedAt: string;
}

const schema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    driverId: {
        type: String,
        required: true
    },

    dishesIds: {
        type: [String],
        required: true
    },

    destination: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: 'pending'
    },

    takenByChef: {
        type: { chefId: String, chefName: String, takenAt: String, finishAt: String }
    },

    finishedDishesIds: [String] // Chef have action to set what dishes is finished

}, { timestamps: true });

const OrderModel = mongoose.model<IOrder>('Order', schema);
export default OrderModel;