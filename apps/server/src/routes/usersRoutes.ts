import { Router } from "express";
const router = Router();

import { signUpController } from "../controllers/usersControllers";

router.post("/signup", signUpController);

export default router;
