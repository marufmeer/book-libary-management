"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookUpdateZodSchema = exports.bookZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.bookZodSchema = zod_1.default.object({
    title: zod_1.default.string(),
    author: zod_1.default.string(),
    genre: zod_1.default.string(),
    isbn: zod_1.default.string(),
    description: zod_1.default.string().optional(),
    copies: zod_1.default.number().int().positive(),
    available: zod_1.default.boolean(),
});
exports.bookUpdateZodSchema = exports.bookZodSchema.partial();
