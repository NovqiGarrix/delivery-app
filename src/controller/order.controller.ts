import { Request, Response } from 'express';
import { UpdateQuery } from 'mongoose';

import { AddOrderReqBody, SetFinishedDishesReqBody, UpdateStatusReqBody } from '../middleware/orderRouteMiddleware';

import { IOrder } from '../model/orders.model';
import { User } from '../model/user.model';
import chefService from '../service/chef.service';

import dishesService from '../service/dishes.service';
import orderService from '../service/order.service';
import userService from '../service/user.service';
import checkValidId from '../util/checkId';

import sendHTTPError from '../util/sendError';

export const addOrder = async (req: Request<{}, {}, AddOrderReqBody>, res: Response): Promise<Response> => {

    const newAccessToken = res.locals.newAccessToken

    try {

        const driver = await userService.findOne({ _id: req.body.driverId, type: 'driver' });
        if (!driver) return sendHTTPError(res, "Driver does not exist!", 406);

        let unExistDishes: Array<string> = []
        const dishesIds = req.body.dishesIds;

        for (const dishesId of dishesIds) {
            const dishes = await dishesService.getDishes({ _id: dishesId });
            if (!dishes) unExistDishes.push(dishesId);

            if (dishesId === dishesIds[dishesIds.length - 1] && unExistDishes.length)
                return sendHTTPError(res, { message: "These dishes does not exist!", field: unExistDishes }, 406);
        }

        const newOrder = await orderService.addOrder(req.body);

        const response = {
            data: newOrder,
            newAccessToken,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}

export const getOrders = async (req: Request, res: Response): Promise<Response> => {

    const newAccessToken = res.locals.newAccessToken

    try {

        const orders = await orderService.getOrders(req.query);

        const response = {
            data: orders,
            newAccessToken,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}

export const getOrder = async (req: Request, res: Response): Promise<Response> => {

    const newAccessToken = res.locals.newAccessToken
    const orderId = req.params.orderId as string

    const validId = checkValidId(orderId);
    if (!validId) return sendHTTPError(res, "invalid Order!", 406);

    try {

        const order = await orderService.getOneOrder({ _id: orderId });

        const response = {
            data: order,
            newAccessToken,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}

export const signOrder = async (req: Request<{ orderId: string }>, res: Response): Promise<Response> => {

    const { _id: chefId, name: chefName } = res.locals.user as User
    const { orderId } = req.params
    const newAccessToken = res.locals.newAccessToken

    const validId = checkValidId(orderId);
    if (!validId) return sendHTTPError(res, "invalid Order!", 406);

    try {

        const currentOrder = await orderService.getOneOrder({ _id: orderId }, { status: 1 });
        if (!currentOrder) return sendHTTPError(res, 'Unknown order!', 406);
        if (currentOrder.status !== 'pending') return sendHTTPError(res, 'This order was taken!', 406);

        const updateQuery: UpdateQuery<IOrder> = {
            takenByChef: { chefId, chefName, takenAt: new Date().toString() },
            status: 'ongoing'
        }
        const order = await orderService.updateOrder({ _id: orderId }, updateQuery);

        const assignedOrder = await chefService.getOneAssignedOrder(chefId, orderId);
        if (assignedOrder) return sendHTTPError(res, 'Order assgined!', 200);

        await chefService.signOrder(orderId, chefId);

        const response = {
            data: order,
            newAccessToken,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}

export const getOrderByChefId = async (_req: Request<{ chefId: string }>, res: Response): Promise<Response> => {

    const chefId = res.locals.user._id
    const newAccessToken = res.locals.newAccessToken

    try {

        const orders = await chefService.getAssignedOrder(chefId, {});
        if (!orders) return res.send([]);

        let assignedOrdersDetail: Array<IOrder> = [];

        for (const orderId of orders.assignedOrders) {
            const details = await orderService.getOneOrder({ _id: orderId.orderId });
            if (details) assignedOrdersDetail.push(details);
        }

        const response = {
            data: assignedOrdersDetail,
            newAccessToken,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}

export const updateStatus = async (req: Request<{ orderId: string }, {}, UpdateStatusReqBody>, res: Response): Promise<Response> => {

    const orderId = req.params.orderId
    const newAccessToken = res.locals.newAccessToken

    const validId = checkValidId(orderId);
    if (!validId) return sendHTTPError(res, "invalid Order!", 406);

    try {

        const order = await orderService.updateOrder({ _id: orderId }, { status: req.body.status });
        if (!order) return sendHTTPError(res, 'Failed to update order status, due to Invalid order!', 406);

        const response = {
            data: order,
            newAccessToken,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}

export const setFinishedDishes = async (req: Request<{ orderId: string }, {}, SetFinishedDishesReqBody>, res: Response): Promise<Response> => {

    const newAccessToken = res.locals.newAccessToken
    const { finishedDishesIds } = req.body
    const { orderId } = req.params

    const validId = checkValidId(orderId);
    if (!validId) return sendHTTPError(res, "invalid Order!", 406);

    try {

        const order = await orderService.getOneOrder({ _id: orderId });
        if (!order) return sendHTTPError(res, "Invalid Order!", 406);

        if ((order.dishesIds.length <= order.finishedDishesIds.length)) return sendHTTPError(res, 'All dishes was set finished!', 406);

        for (const dishesId of finishedDishesIds) {
            const existedDishes = order.finishedDishesIds.find((oDishesId) => oDishesId === dishesId);
            if (existedDishes) return sendHTTPError(res, `This dishes already finished: ${dishesId}`, 406);
        }

        const updateQuery: UpdateQuery<IOrder> = {
            finishedDishesIds: order.finishedDishesIds && order.finishedDishesIds.length ? [...order.finishedDishesIds, ...finishedDishesIds] : finishedDishesIds
        }

        const updatedOrder = await orderService.updateOrder({ _id: orderId }, updateQuery);

        const response = {
            data: updatedOrder,
            newAccessToken,
            error: null
        }

        if (updatedOrder) {
            if (updatedOrder.dishesIds.length === updatedOrder.finishedDishesIds.length) {
                console.log('Set status to finished!');

                await orderService.updateOrder({ _id: orderId }, { status: 'finished' });
                if (response.data) response.data.status = 'finished';
                return res.send(response)
            }
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}