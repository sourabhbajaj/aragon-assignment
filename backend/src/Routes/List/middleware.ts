import { Request, NextFunction, Response } from 'express';
import { ObjectSchema } from 'joi';
import { createListSchema, deleteListSchema } from './validation';

export const validateCreateList = (req: Request, res: any, next: NextFunction) => {
	const { error } = createListSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};

export const validateDeleteList = (req: Request, res: any, next: NextFunction) => {
	const { error } = deleteListSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}
	next();
};