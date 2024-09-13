import express from "express";

const router = express.Router();
import { createResidency, getAllResidencies, getResidency } from "../controllers/resdCntrl.js";

//first end point of residency 
router.post("/create",createResidency)
router.get("/allresd",getAllResidencies)
// specific property
router.get("/:id",getResidency)


export { router as residencyRoute };


