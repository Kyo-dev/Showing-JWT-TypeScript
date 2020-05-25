"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth_controller");
// const router: Router = Router();
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/signup', auth_controller_1.signUp);
        this.router.post('/signin', auth_controller_1.signIn);
        this.router.get('/profile', auth_controller_1.profile);
    }
}
const authRoutes = new AuthRoutes();
authRoutes.routes();
exports.default = authRoutes.router;
//# sourceMappingURL=auth_routes.js.map