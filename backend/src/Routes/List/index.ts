import express, { NextFunction, Request, Response } from 'express';
import { ListModel } from '../../Models/List';
import { validateCreateList, validateDeleteList } from './middleware';

const router = express.Router();
const listModel = new ListModel();

// POST /lists - Create a list
router.post('/', validateCreateList, async (req, res) => {
	const { name, boardId } = req.body;

	try {
		const list = await listModel.createList(name, boardId);
		res.status(201).json(list);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
});

// DELETE /lists - Delete a list
router.delete('/', validateDeleteList, async (req, res: Response, next: NextFunction) => {
	const { id } = req.body;

	try {
		const deletedList = await listModel.deleteList(id);
		res.status(200).json(deletedList);
	} catch (error: any) {
		res.status(404).json({ error: error.message });
	}
});

// ✅ GET /lists?boardId=123 - Get all lists (with cards) for a board with hardcoded userId = 1
router.get('/', async (req: any, res: any, next: NextFunction) => {
	const userId = 1; // hardcoded user ID
	const boardId = req.query.boardId ? parseInt(req.query.boardId as string, 10) : undefined;

	if (!boardId || isNaN(boardId)) {
		return res.status(400).json({ error: 'Valid boardId query param is required' });
	}

	try {
		// You can also validate ownership with userId if needed
		const lists = await listModel.getListsWithCardsByBoard(boardId);
		res.status(200).json(lists);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
