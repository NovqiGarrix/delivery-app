import mongoose from 'mongoose';
import { OrderStatus } from './orders.model';

export type OrderInChef = { status: OrderStatus, orderId: string }

export interface IChef {
    _id: string;
    userId: string;
    assignedOrders: Array<OrderInChef>;
    createdAt: string;
    updatedAt: string;
}

const schema = new mongoose.Schema({


    userId: {
        type: String,
        required: true
    },

    assignedOrders: [{
        status: String,
        orderId: String
    }]

}, { timestamps: true });

const ChefModel = mongoose.model<IChef>('Chef', schema)
export default ChefModel