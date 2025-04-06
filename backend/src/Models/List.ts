import { PrismaClient, List } from '@prisma/client';

export class ListModel {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	/**
	 * Creates a new list under a specific board.
	 * @param name - The name of the list.
	 * @param boardId - The ID of the board this list belongs to.
	 * @returns The created List object.
	 */
	async createList(name: string, boardId: number): Promise<List> {
		try {
			const list = await this.prisma.list.create({
				data: {
					name,
					boardid: boardId,
				},
			});
			console.log('List created:', list);
			return list;
		} catch (error: any) {
			console.error('Error creating list:', error.message);
			throw new Error('Could not create list');
		}
	}

	/**
	 * Deletes a list by its ID.
	 * @param listId - The ID of the list to delete.
	 * @returns The deleted List object.
	 */
	async deleteList(listId: number): Promise<List> {
		try {
			const list = await this.prisma.list.delete({
				where: {
					id: listId,
				},
			});
			console.log('List deleted:', list);
			return list;
		} catch (error: any) {
			if (error.code === 'P2025') {
				console.error('List not found.');
				throw new Error('List not found');
			}
			console.error('Error deleting list:', error.message);
			throw new Error('Could not delete list');
		}
	}

	/**
   * Fetches all lists for a board, including their cards.
   * @param boardId - The ID of the board
   * @returns Array of lists with their associated cards
   */
	async getListsWithCardsByBoard(boardId: number): Promise<any[]> {
		try {
			const lists = await this.prisma.list.findMany({
				where: { boardid: boardId },
				include: {
					cards: true,
				},
			});
			console.log(`Fetched ${lists.length} list(s) with cards`);
			return lists;
		} catch (error: any) {
			console.error('Error fetching lists with cards:', error.message);
			throw new Error('Could not fetch lists with cards');
		}
	}

	/**
	 * Disconnect Prisma client.
	 */
	async disconnect(): Promise<void> {
		await this.prisma.$disconnect();
	}
}
