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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book_model");
const BookZodschema_1 = require("../ZodSchema/BookZodschema");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sort, limit, sortBy } = req.query;
    const parseLimit = parseInt(limit);
    const sortOrder = sort === "desc" ? -1 : 1;
    const result = yield book_model_1.Book.find({ genre: filter }).sort({ [sortBy]: sortOrder }).limit(parseLimit);
    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data: result
    });
}));
exports.bookRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const result = yield book_model_1.Book.findById(bookId);
    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        data: result
    });
}));
exports.bookRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = BookZodschema_1.bookZodSchema.parse(req.body);
    const result = yield book_model_1.Book.create(body);
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: result
    });
}));
exports.bookRoutes.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const body = BookZodschema_1.bookUpdateZodSchema.parse(req.body);
    const result = yield book_model_1.Book.findByIdAndUpdate(bookId, body, { new: true });
    res.status(201).json({
        success: true,
        message: "Book update successfully",
        data: result
    });
}));
exports.bookRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const result = yield book_model_1.Book.findByIdAndDelete(bookId);
    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: result
    });
}));
