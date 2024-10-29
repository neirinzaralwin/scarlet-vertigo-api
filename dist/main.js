"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./api/routes/auth"));
//import productRoutes from './src/api/routes/product';
//import categoryRoutes from './src/api/routes/category';
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/users', auth_1.default);
//app.use('/products', productRoutes);
//app.use('/categories', categoryRoutes);
mongoose_1.default
    .connect(process.env.MONGODB_URL)
    .then(() => {
    app.listen(7000, () => {
        console.log('Server is running on port 7000');
        console.log('Connected to MongoDB!!!');
    });
})
    .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
