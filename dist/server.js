"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./database");
const accountRoutes_1 = __importDefault(require("./src/back/routes/accountRoutes"));
const currencyRoutes_1 = __importDefault(require("./src/back/routes/currencyRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(accountRoutes_1.default);
app.use(currencyRoutes_1.default);
database_1.sequelize.authenticate().then(() => {
    return database_1.sequelize.sync();
}).then(() => {
    console.log("База данных синхронизирована");
    app.listen(5000, () => {
        console.log("Сервер запущен на порту 5000");
    });
}).catch((error) => {
    console.error("Ошибка при подключении к базе данных:", error);
});
