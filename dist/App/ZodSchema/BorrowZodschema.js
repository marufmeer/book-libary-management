"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.borrowZodSchema = zod_1.default.object({
    book: zod_1.default.string(),
    quantity: zod_1.default.number().int().positive(),
    dueDate: zod_1.default.string()
});
