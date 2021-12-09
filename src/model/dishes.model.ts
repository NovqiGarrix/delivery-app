import mongoose from 'mongoose';

export type Category = 'food' | 'drink'
export type ChefCategory = 'food-chef' | 'drink-chef'
export interface IDishes {
    _id: string;
    name: string;
    price: number;
    category: Category;
    chefCategory: ChefCategory;
    rating: number;
    voted: number;
}

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    chefCategory: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        default: 0,
    },

    voted: {
        type: Number,
        default: 0
    }

}, { timestamps: true });


const DishesModel = mongoose.model<IDishes>('Dishes', schema);
export default DishesModel
