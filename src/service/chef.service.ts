import { FilterQuery } from "mongoose";
import ChefModel, { IChef, OrderInChef } from "../model/chef.model";




async function addChef(chef: Omit<IChef, 'assignedOrders' | '_id' | 'createdAt' | 'updatedAt'>): Promise<IChef> {

    const newChef = await ChefModel.create(chef);

    return {
        _id: newChef._id,
        userId: newChef.userId,
        assignedOrders: newChef.assignedOrders,
        createdAt: newChef.createdAt,
        updatedAt: newChef.updatedAt
    }

}

async function signOrder(orderId: string, chefId: string): Promise<IChef | null> {

    const order = await ChefModel.findOne({ userId: chefId }).lean();

    if (order) {
        await ChefModel.updateOne({ userId: chefId }, { assignedOrders: [...order.assignedOrders, { status: 'ongoing', orderId }] });
        return {
            ...order,
            assignedOrders: [...order.assignedOrders, { status: 'ongoing', orderId }]
        }
    }

    return null
}

async function getAssignedOrder(userId: string, filter?: FilterQuery<Omit<IChef, 'userId'>>): Promise<IChef | undefined> {
    return await ChefModel.findOne({ userId, ...filter }).lean();
}

async function getOneAssignedOrder(userId: string, orderId: string): Promise<OrderInChef | undefined> {
    const order = await ChefModel.findOne({ userId }).lean();
    if (!order) return undefined

    const existedOrder = order.assignedOrders.find((order) => order.orderId === orderId);
    return existedOrder
}

export default { getAssignedOrder, addChef, signOrder, getOneAssignedOrder }