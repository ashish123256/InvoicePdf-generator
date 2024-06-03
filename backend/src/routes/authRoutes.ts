import express from "express";

import { register, login, logOut, } from "../controllers/authController";


const router = express.Router();


router.post("/register",register);
router.post("/login",login);
router.get("/signout", logOut)



export default router;