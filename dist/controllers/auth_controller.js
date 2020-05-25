"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user_model"));
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        let ban = true;
        const user_model = new user_model_1.default({
            username,
            email,
            password
        });
        user_model.password = yield user_model.encryptPassword(user_model.password);
        if (!(user_model.username.length >= 5 && user_model.username.length <= 20)) {
            ban = false;
        }
        if (ban) {
            try {
                const newUser = yield user_model.save();
                const token = jsonwebtoken_1.default.sign({
                    _id: newUser._id
                }, process.env.SECRET_KEY || 'tokentest');
                res.header('auth-token', token).json(newUser);
            }
            catch (error) {
                console.log(error);
                res.json({ message: "Invalid" });
            }
        }
        else {
            res.json({ message: "Data error" });
        }
    });
}
exports.signUp = signUp;
exports.signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json('Email or password invalid');
    }
    const validPassword = yield user.validatePassword(req.body.password);
    if (!validPassword)
        return res.status(400).json('Email or password invalid');
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.SECRET_KEY || 'tokentest', {
        expiresIn: 60 * 60
    });
    console.log(user);
    res.header('auth-token', token).json(user);
});
exports.profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.userId, {
        password: 0
    });
    if (!user)
        return res.status(404).json('User not found');
    res.json(user);
});
//# sourceMappingURL=auth_controller.js.map