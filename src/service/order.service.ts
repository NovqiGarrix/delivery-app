import { FilterQuery, UpdateQuery } from "mongoose";
import OrderModel, { IOrder } from "../model/orders.model";


async function getOrders(filter: FilterQuery<IOrder>, projection?: Record<string, number>): Promise<Array<IOrder> | undefined>;
async function getOrders(filter?: FilterQuery<IOrder>): Promise<Array<IOrder> | undefined>;

async function getOrders(filter?: FilterQuery<IOrder>, projection?: Record<string, number>): Promise<Array<IOrder> | undefined> {
    if (filter) {
        return OrderModel.find(filter, projection).lean();
    }

    return OrderModel.find();
}

async function getOneOrder(filter: FilterQuery<IOrder>, projection?: Record<string, number>): Promise<IOrder | undefined> {
    return OrderModel.findOne(filter, projection).lean();
}

async function addOrder(order: Omit<IOrder, '_id' | 'createdAt' | 'updatedAt' | 'status' | 'finishedDishesIds' | 'takenByChef'>): Promise<IOrder> {

    const newOrder = await OrderModel.create(order);
    return newOrder
}

async function updateOrder(filter: FilterQuery<IOrder>, updateQuery: UpdateQuery<IOrder>): Promise<IOrder | null> {

    const order = await OrderModel.findOneAndUpdate(filter, updateQuery).lean();

    if (order) return {
        ...order, ...updateQuery
    }

    return null

}

export default { addOrder, getOrders, getOneOrder, updateOrder }