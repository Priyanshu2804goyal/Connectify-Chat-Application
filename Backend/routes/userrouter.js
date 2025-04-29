import express from "express";
import {logout,login,register, getotherusers } from "../controllers/userController.js";
import isauthenticated from "../middlewares/authenticate.js";
const router=express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isauthenticated,getotherusers);
export default router;