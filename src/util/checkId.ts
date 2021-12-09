import mongoose from 'mongoose';


function checkValidId(id: string): boolean {
    return mongoose.isValidObjectId(id);
}

export default checkValidId