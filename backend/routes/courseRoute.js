import express from "express";
const router =express.Router();

import {getCourses} from "../controllers/courseController.js";
import {authorizeAdmin,isAuthenticatedUser} from "../middlewares/auth.js"




router.route('/courses').get(isAuthenticatedUser, authorizeAdmin, getCourses);



export default router;