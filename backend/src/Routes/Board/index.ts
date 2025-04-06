import express, { NextFunction, Request, Response } from 'express';
import { BoardModel } from '../../Models/Board';
import { validateCreateBoard, validateDeleteBoard } from './middleware';

const router = express.Router();
const boardModel = new BoardModel();

// POST /boards - Create a board
router.post('/', validateCreateBoard, async (req: Request, res: Response, next: NextFunction) => {
	const { name } = req.body;
	const userId = 1;
	try {
		const board = await boardModel.createBoard(name, userId);
		res.status(201).json(board);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
});

// DELETE /boards - Delete a board
router.delete('/', validateDeleteBoard, async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.body;

	try {
		const deletedBoard = await boardModel.deleteBoard(id);
		res.status(200).json(deletedBoard);
	} catch (error: any) {
		res.status(404).json({ error: error.message });
	}
});

// ✅ GET /boards - Fetch all boards for hardcoded userId = 1
router.get('/', async (req, res) => {
	const userId = 1; // hardcoded user ID

	try {
		const boards = await boardModel.getAllBoards(userId);
		res.status(200).json(boards);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
