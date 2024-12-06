import express from 'express';
import { sendOtp, verifyOtp, resetPassword } from './otp.js';


const otpRouter = express.Router();

otpRouter.post("/send", sendOtp);
otpRouter.get("/verify", verifyOtp);
otpRouter.post("/reset-password", resetPassword);

export default otpRouter;