import { Router } from "express";
const router = Router();

import checkToken from "../middleware/check-token";

import {
  signUpController,
  signInController,
  getUserController,
} from "../controllers/usersControllers";

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.get("/", checkToken, getUserController);

export default router;
