import { PrismaClient, Board } from '@prisma/client';

export class BoardModel {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	/**
	 * Creates a new board for a given user.
	 * @param name - The name of the board.
	 * @param userId - The ID of the user who owns the board.
	 * @returns The created Board object.
	 */
	async createBoard(name: string, userId: number): Promise<Board> {
		try {
			const board = await this.prisma.board.create({
				data: {
					name,
					userid: userId,
				},
			});
			console.log('Board created:', board);
			return board;
		} catch (error: any) {
			console.error('Error creating board:', error.message);
			throw new Error('Could not create board');
		}
	}

	/**
	 * Deletes a board by its ID.
	 * @param boardId - The ID of the board to delete.
	 * @returns The deleted Board object.
	 */
	async deleteBoard(boardId: number): Promise<Board> {
		try {
			const board = await this.prisma.board.delete({
				where: {
					id: boardId,
				},
			});
			console.log('Board deleted:', board);
			return board;
		} catch (error: any) {
			if (error.code === 'P2025') {
				console.error('Board not found.');
				throw new Error('Board not found');
			}
			console.error('Error deleting board:', error.message);
			throw new Error('Could not delete board');
		}
	}

	/**
	 * Fetches all boards. Optionally filter by userId.
	 * @param userId - Optional filter by userId.
	 * @returns Array of Board objects.
	 */
	async getAllBoards(userId?: number): Promise<Board[]> {
		try {
			const boards = await this.prisma.board.findMany({
				where: userId ? { userid: userId } : undefined,
				orderBy: { createdat: 'desc' },
			});
			console.log(`Fetched ${boards.length} board(s)`);
			return boards;
		} catch (error: any) {
			console.error('Error fetching boards:', error.message);
			throw new Error('Could not fetch boards');
		}
	}

	/**
	 * Disconnect Prisma client.
	 */
	async disconnect(): Promise<void> {
		await this.prisma.$disconnect();
	}
}
