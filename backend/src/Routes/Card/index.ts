import express from 'express';
import { CardModel } from '../../Models/Card';
import { validateCreateCard, validateDeleteCard } from './middleware';

const router = express.Router();
const cardModel = new CardModel();

// POST /cards - Create a card
router.post('/', validateCreateCard, async (req, res) => {
	const { name, listId } = req.body;

	try {
		const card = await cardModel.createCard(name, listId);
		res.status(201).json(card);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
});

// DELETE /cards - Delete a card
router.delete('/', validateDeleteCard, async (req, res) => {
	const { id } = req.body;

	try {
		const deletedCard = await cardModel.deleteCard(id);
		res.status(200).json(deletedCard);
	} catch (error: any) {
		res.status(404).json({ error: error.message });
	}
});

export default router;
