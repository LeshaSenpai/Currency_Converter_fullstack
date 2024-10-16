"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const currencyController_1 = require("../controllers/currencyController");
const router = (0, express_1.Router)();
router.get('/currencies', currencyController_1.getCurrencies);
exports.default = router;
