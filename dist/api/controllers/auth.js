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
const user_service_1 = __importDefault(require("../../domain/services/user.service"));
class UserController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.default.findAll();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to fetch users", error: error.message });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.findById(req.params.id);
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return; // explicitly end the function after sending the response
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: "Failed to fetch user", error: error.message });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield user_service_1.default.update(req.params.id, req.body);
                if (!updatedUser) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                res.status(200).json({ message: "User updated successfully", user: updatedUser });
            }
            catch (error) {
                res.status(400).json({ message: "Failed to update user", error: error.message });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield user_service_1.default.delete(req.params.id);
                if (deletedUser === undefined) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: "Failed to delete user", error: error.message });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user_service_1.default.register(req.body);
                res.status(201).json({ message: "User registered successfully", user: newUser });
            }
            catch (error) {
                res.status(400).json({ message: "Registration failed", error: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, user } = yield user_service_1.default.login(req.body);
                res.status(200).json({ message: 'Login successful', token, user });
            }
            catch (error) {
                res.status(401).json({ message: error.message });
            }
        });
    }
}
exports.default = new UserController();
