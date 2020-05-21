"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth_controller");
const router = express_1.Router();
router.route('/')
    .get(auth_controller_1.getAuth);
exports.default = router;
//# sourceMappingURL=auth_routes.js.map