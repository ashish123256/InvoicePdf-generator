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
exports.logOut = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const errorHandler_1 = require("../utils/errorHandler");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        let user = yield userModel_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        const newUser = new userModel_1.default({ name, email, password: hashedPassword });
        yield newUser.save();
        res.status(201).json({ message: 'User registered successfully', newUser });
    }
    catch (err) {
        next(err);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const validUser = yield userModel_1.default.findOne({ email });
        if (!validUser)
            return next((0, errorHandler_1.errorHandler)(404, "User not found! "));
        const validPassword = bcryptjs_1.default.compareSync(password, validUser.password);
        if (!validPassword)
            return next((0, errorHandler_1.errorHandler)(401, "Invalid Credentials"));
        const token = jsonwebtoken_1.default.sign({ id: validUser._id }, process.env.JWT_SECRET);
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(validUser);
    }
    catch (err) {
        res.status(401).json({ message: "unauthorized" });
    }
});
exports.login = login;
const logOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    }
    catch (error) {
        next(error);
    }
});
exports.logOut = logOut;
