import { Router } from "express";
const router = Router();

import { signUpController, signInController } from "../controllers/usersControllers";

router.post("/signup", signUpController);
router.get("/signin", signInController);

export default router;
