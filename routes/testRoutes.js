import express from "express";
import {testPostController} from "../controllers/testController.js";
const router = express.Router();

router.post('/add', testPostController);

export default router;