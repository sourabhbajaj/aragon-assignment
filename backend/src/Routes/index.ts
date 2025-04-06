import { Router, Request, Response } from "express";
import express from 'express';

import boardRoutes from "./Board";
import listRoutes from "./List";
import cardRoutes from "./Card";

const router = Router();

declare global {
	namespace Express {
		interface Request {
		}
	}
}

// router.use(API_BASE_PATH, V1);

router.get("/", (req: Request, res: Response) => {
	// Handle GET /
	res.send("Hello world");
});

router.use(express.json());

router.use('/boards', boardRoutes);
router.use('/lists', listRoutes);
router.use('/cards', cardRoutes);

export default router;
