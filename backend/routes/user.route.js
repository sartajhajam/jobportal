import express from 'express';
import {login,logout,register,updatedProfile}from "../controllers/user.controller.js";
import authenticateToken from '../middleware/isAuthenticated.js';
const router = express.Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/update").post(authenticateToken,updatedProfile);

export default router;

