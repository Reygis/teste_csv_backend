"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ApiController_1 = require("../controllers/ApiController");
const router = (0, express_1.Router)();
router.get('/users', ApiController_1.ApiController.getByQuery);
router.post('/files', ApiController_1.ApiController.create);
exports.default = router;
