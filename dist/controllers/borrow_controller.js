"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow_model");
const BorrowZodschema_1 = require("../ZodSchema/BorrowZodschema");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = BorrowZodschema_1.borrowZodSchema.parse(req.body);
    const result = yield borrow_model_1.BorrowM.create(body);
    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: result
    });
}));
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield borrow_model_1.BorrowM.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" }
            }
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "book"
            }
        },
        {
            $unwind: "$book"
        },
        {
            $project: {
                _id: 0,
                title: 1,
                book: {
                    title: "$book.title",
                    isbn: "$book.isbn"
                },
                totalQuantity: 1
            }
        }
    ]);
    res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: result
    });
}));
