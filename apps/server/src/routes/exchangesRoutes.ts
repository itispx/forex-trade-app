import { Router } from "express";
const router = Router();

import checkToken from "../middleware/check-token";

import { makeExchangeController } from "../controllers/exchangesControllers";

router.post("/", checkToken, makeExchangeController);

export default router;
