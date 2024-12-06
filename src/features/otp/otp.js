import { sendEmailForOTPVerification } from "../nodemailer/nodemailer.js";
import crypto from "crypto";
import { userModel } from "../user/user.Schema.js";

export async function sendOtp(req, res, next) {
    try {
        const userId = req.userId; 
        const userEmail = req.userEmail; 

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        
        const otp = crypto.randomBytes(3).toString('hex'); // Generates a 6-character OTP

        await sendEmailForOTPVerification(userEmail, otp);

        user.otp = otp;
        user.otpExpires = Date.now() + 300000; // 5 minutes validity
        await user.save({ validateBeforeSave: false });
        /* skip validation for this particular save function as the password validation is running for this document which already has hashed password in it so it is throwing error*/

        return res.status(200).send("OTP sent successfully");
    } catch (error) {
        console.error("Error: ", error);
        next(error);
    }
}
export async function verifyOtp(req, res, next) {
    try {
        const userId = req.userId;
        const otp = req.body.otp;
        if (!otp ||  otp.trim() == "") {
            return res.status(400).send("Enter valid OTP");
        }
        const user = await userModel.findById(userId);

        if (user.otp !== otp || Date.now() > user.otpExpires) {
            return res.status(400).send('Invalid or expired OTP');
        }

        // OTP is valid
        user.otp = null;
        user.otpVerified = true;
        await user.save({ validateBeforeSave: false }); //skip validation

        return res.status(200).send("OTP verified and will be valid for 5 minutes");
    } catch (error) {
        console.error("Error: ", error);
        next(error);
    }
}

export async function resetPassword(req, res, next){
    try {
        const userId = req.userId;
        const userEmail = req.userEmail;
        const newPassword = req.body.newPassword;
        
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).send("User not found");
        }

        if (!newPassword || newPassword.trim()=="") {
            return res.status(400).send("Enter the new password");
        }

        if (!user.otpVerified || Date.now() > user.otpExpires) {
            return res.status(400).send("OTP not verified or expired");
        }

        user.password = newPassword; // Directly assign the new password 
        user.otpExpires = null; // Clear OTP expiry 
        user.otpVerified = false; // Reset the flag after password is changed

        user.tokens = []; //clearing the tokens field for the user, as his password got reset
        await user.save();
        return res.status(200).send("Password reset successfull");
    } catch (error) {
        console.error("Error: ", error);
        next(error);
    }
}

