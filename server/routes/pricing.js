import { Router } from "express";
import { getPricing } from "../pricing.js";

export const pricingRouter = Router();

pricingRouter.get("/", (req, res) => {
  res.json(getPricing());
});
