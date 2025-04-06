import { Request, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { createCardSchema, deleteCardSchema } from './validation';

export const validateCreateCard = (req: Request, res: any, next: NextFunction) => {
	const { error } = createCardSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};

export const validateDeleteCard = (req: Request, res: any, next: NextFunction) => {
	const { error } = deleteCardSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};