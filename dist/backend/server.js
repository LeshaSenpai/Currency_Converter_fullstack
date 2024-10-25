"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./database");
const accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
const currencyRoutes_1 = __importDefault(require("./routes/currencyRoutes"));
(async () => {
    try {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(body_parser_1.default.json());
        app.use(accountRoutes_1.default);
        app.use(currencyRoutes_1.default);
        await database_1.sequelize.authenticate();
        await database_1.sequelize.sync();
        console.log("База данных синхронизирована");
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Сервер запущен на порту ${port}`);
        });
    }
    catch (error) {
        console.error("Ошибка при подключении к базе данных:", error);
    }
})();
