import { Router } from "express";
const router = Router();

import checkToken from "../middleware/check-token";

import {
  makeExchangeController,
  getExchangesController,
} from "../controllers/exchangesControllers";

router.post("/", checkToken, makeExchangeController);
router.get("/", checkToken, getExchangesController);

export default router;
