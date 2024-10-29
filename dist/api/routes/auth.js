"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
const router = express_1.default.Router();
router.get('/users', (req, res) => auth_1.default.getAllUsers(req, res));
router.get('/users/:id', (req, res) => auth_1.default.getUserById(req, res));
router.put('/users/:id', (req, res) => auth_1.default.updateUser(req, res));
router.delete('/users/:id', (req, res) => auth_1.default.deleteUser(req, res));
router.post('/register', (req, res) => auth_1.default.register(req, res));
router.post('/login', (req, res) => auth_1.default.login(req, res));
exports.default = router;
