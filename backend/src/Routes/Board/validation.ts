import Joi from 'joi';

export const createBoardSchema = Joi.object({
	name: Joi.string().min(1).required()
});

export const deleteBoardSchema = Joi.object({
	id: Joi.number().integer().required(),
});
