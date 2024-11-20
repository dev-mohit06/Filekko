import { Router } from "express";

import signUpSchema from "../schema/zod/sign-up.zod.js";
import loginSchema from "../schema/zod/login.zod.js";
import verifyEmailSchema from "../schema/zod/verify-email.zod.js";
import resendVerificationEmailSchema from "../schema/zod/resend-verification-email.js";

import ValidationMiddleware from "../middleware/zod.middleware.js";
import fileUploadService from "../services/file-upload.service.js";

import { singUp, verifyEmail, login, resendVerificationEmail } from '../controller/auth.controller.js'

const router = Router();
const validation = new ValidationMiddleware();

router.post("/signup",fileUploadService.handleAvatarUpload(),validation.validate(signUpSchema),singUp);
router.post('/login',validation.validate(loginSchema),login);

router.post('/verify-email',validation.validate(verifyEmailSchema),verifyEmail);
router.post('/resend-verification-email',validation.validate(resendVerificationEmailSchema),resendVerificationEmail);

export default router;