import Joi from 'joi';

export const createListSchema = Joi.object({
	name: Joi.string().min(1).required(),
	boardId: Joi.number().integer().required(),
});

export const deleteListSchema = Joi.object({
	id: Joi.number().integer().required(),
});
