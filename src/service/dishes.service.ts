import { FilterQuery } from "mongoose";
import DishesModel, { IDishes } from "../model/dishes.model";
import userService from "./user.service";


async function getDishes(filter: FilterQuery<IDishes>, projection?: Record<string, number>): Promise<IDishes | undefined> {
    return await DishesModel.findOne(filter, projection).lean();
}

async function getDishess(filter: FilterQuery<IDishes>, projection?: Record<string, number>): Promise<Array<IDishes> | undefined>;
async function getDishess(filter?: FilterQuery<IDishes>): Promise<Array<IDishes> | undefined>;

async function getDishess(filter?: FilterQuery<IDishes>, projection?: Record<string, number>): Promise<Array<IDishes> | undefined> {
    if (filter) {
        return DishesModel.find(filter, projection).lean();
    }

    return DishesModel.find();
}

async function addDishes(dishes: Omit<IDishes, '_id' | 'createdAt' | 'updatedAt' | 'chefCategory' | 'rating' | 'voted'>): Promise<IDishes> {

    const data: Omit<IDishes, '_id' | 'createdAt' | 'updatedAt' | 'rating' | 'voted'> = {
        ...dishes,
        chefCategory: `${dishes.category}-chef`
    }

    const newDishes = await DishesModel.create(data);
    return newDishes
}

async function addRating(dishesId: string, userId: string, newRating: number): Promise<IDishes | null> {

    const dishes = await DishesModel.findOne({ _id: dishesId }).lean();

    if (dishes) {

        const divided = ((dishes.rating + newRating) / 2);
        const rating = dishes.rating > 1 ? divided : newRating;

        await DishesModel.updateOne({ _id: dishesId }, { rating, voted: dishes.voted + 1 }).lean() as IDishes

        const user = await userService.findById(userId, { voted: 1 });
        if (user) {
            await userService.updateOne({ _id: userId }, { voted: [...user.voted, dishesId] });
        }

        const result = { ...dishes, rating, voted: dishes.voted + 1 }
        return result
    }

    return null

}

async function searchDishes(query: string): Promise<Array<IDishes> | undefined> {

    const dishes = await DishesModel.find({ $text: { $search: query } }).lean();
    return dishes

}



export default { addDishes, getDishes, getDishess, addRating, searchDishes }