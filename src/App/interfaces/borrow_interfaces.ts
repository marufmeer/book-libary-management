import { Model, Types } from "mongoose"


export interface Borrow {
    book:Types.ObjectId;
    quantity:number;
    dueDate:Date 
}
export interface BorrowModelType extends Model<Borrow>{
    updateAvailable(bookId:Types.ObjectId | string):void;
}