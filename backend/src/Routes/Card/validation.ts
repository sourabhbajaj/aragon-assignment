import Joi from 'joi';

export const createCardSchema = Joi.object({
	name: Joi.string().min(1).required(),
	listId: Joi.number().integer().required(),
});

export const deleteCardSchema = Joi.object({
	id: Joi.number().integer().required(),
});
