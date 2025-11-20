import express from "express";
import CheckIn from "../models/CheckIn.js";

const router = express.Router();

// GET all check-ins
router.get("/", async (req, res) => {
  try {
    const checkIns = await CheckIn.find().sort({ createdAt: -1 });
    res.json(checkIns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new check-in
router.post("/", async (req, res) => {
  try {
    const checkIn = new CheckIn(req.body);
    await checkIn.save();
    res.status(201).json(checkIn);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
