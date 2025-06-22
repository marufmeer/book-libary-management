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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowM = exports.BorrowModel = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("./book_model");
exports.BorrowModel = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        min: [1, "Copies must be a positive number"],
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.BorrowModel.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield book_model_1.Book.findById(this.book);
            if (!book) {
                return next(new Error("Referenced book not found"));
            }
            if (this.quantity > book.copies) {
                return next(new Error(`cannot borrow more book than ${book.copies} copies`));
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
exports.BorrowModel.post("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield book_model_1.Book.findById(this.book);
            if (!book) {
                return new Error("Referenced book not found");
            }
            book.copies = book.copies - this.quantity;
            yield book.save();
            yield exports.BorrowM.updateAvailable(book._id);
        }
        catch (error) {
            console.error("fail to update book copies", error);
        }
    });
});
exports.BorrowModel.static("updateAvailable", function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield book_model_1.Book.findById(bookId);
            if (!book) {
                return new Error("Referenced book not found");
            }
            if (book.copies === 0 && book.available === true) {
                book.available = false;
                yield book.save();
            }
        }
        catch (error) {
            console.error("Failed to update available status", error);
        }
    });
});
exports.BorrowM = (0, mongoose_1.model)("Borrow", exports.BorrowModel);
