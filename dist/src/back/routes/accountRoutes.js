"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountController_1 = require("../controllers/accountController");
const router = (0, express_1.Router)();
router.post('/accounts', accountController_1.registerAccount);
router.post('/accounts/login', accountController_1.loginAccount);
router.get('/getUsername', accountController_1.fetchUsername);
exports.default = router;
