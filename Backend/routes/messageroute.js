import express from "express";
import { sendmessage } from "../controllers/messagecontroller.js";
import { getmessage } from "../controllers/messagecontroller.js";
import isauthenticated from "../middlewares/authenticate.js";
const router=express.Router();
router.route("/send/:id").post(isauthenticated,sendmessage);
router.route("/:id").get(isauthenticated,getmessage);
export default router;