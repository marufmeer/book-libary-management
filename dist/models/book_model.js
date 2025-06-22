"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
exports.BookModel = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: "Genre must be a correct input"
        }
    },
    isbn: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    copies: {
        type: Number,
        required: true,
        min: [0, "Copies must be a positive number"]
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.Book = (0, mongoose_1.model)("Book", exports.BookModel);
