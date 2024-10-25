"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Account_1 = __importDefault(require("./models/Account"));
const Currency_1 = __importDefault(require("./models/Currency"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './backend/.env' });
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [Account_1.default, Currency_1.default],
    logging: true,
});
