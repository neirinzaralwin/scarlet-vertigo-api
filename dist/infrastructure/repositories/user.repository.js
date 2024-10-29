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
const user_1 = __importDefault(require("../models/user"));
class UserRepository {
    // Fetches all user documents
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.default.find();
        });
    }
    // Finds a single user by their ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.default.findById(id);
        });
    }
    // Creates a new user with validation for allowed roles
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const allowedRoles = ["Admin", "User", "Moderator"];
            // Set default role if not provided or invalid
            if (!userData.role || !allowedRoles.includes(userData.role)) {
                userData.role = "User";
            }
            const newUser = new user_1.default(userData);
            return newUser.save();
        });
    }
    // Updates user information by ID, with role validation
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const allowedRoles = ["Admin", "User", "Moderator"];
            // Validate role if provided
            if (userData.role && !allowedRoles.includes(userData.role)) {
                throw new Error("Invalid role provided");
            }
            return user_1.default.findByIdAndUpdate(id, userData, { new: true });
        });
    }
    // Deletes a user by ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.default.findByIdAndDelete(id);
        });
    }
    // Finds a user by their email
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.default.findOne({ email });
        });
    }
}
exports.default = new UserRepository();
