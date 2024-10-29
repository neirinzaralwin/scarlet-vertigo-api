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
const user_repository_1 = __importDefault(require("../../infrastructure/repositories/user.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_repository_1.default.findAll();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_repository_1.default.findById(id);
        });
    }
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_repository_1.default.update(id, userData);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_repository_1.default.delete(id);
        });
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { role, password } = userData;
            const allowedRoles = ["Admin", "User", "Moderator"];
            userData.role = allowedRoles.includes(role) ? role : "User";
            userData.password = yield bcrypt_1.default.hash(password, 10);
            return user_repository_1.default.create(userData);
        });
    }
    login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const user = yield user_repository_1.default.findByEmail(email);
            if (!user) {
                throw new Error('Invalid credentials');
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: '1h' });
            return { token, user };
        });
    }
}
exports.default = new UserService();
