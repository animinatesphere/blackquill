import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { contactRouter } from "./routes/contact.js";
import { adminRouter } from "./routes/admin.js";
import { pricingRouter } from "./routes/pricing.js";

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL.split(",").map((s) => s.trim()),
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/contact", contactRouter);
app.use("/api/admin", adminRouter);
app.use("/api/pricing", pricingRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`BlackQuill backend listening on port ${PORT}`);
});
