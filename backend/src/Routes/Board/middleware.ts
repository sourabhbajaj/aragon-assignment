import { Request, NextFunction } from 'express';
import { createBoardSchema, deleteBoardSchema } from './validation';

export const validateCreateBoard = (req: Request, res: any, next: NextFunction) => {
	const { error } = createBoardSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};

export const validateDeleteBoard = (req: Request, res: any, next: NextFunction) => {
	const { error } = deleteBoardSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};