import { PrismaClient, Card } from '@prisma/client';

export class CardModel {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	/**
	 * Creates a new card under a specific list.
	 * @param name - The name of the card.
	 * @param listId - The ID of the list this card belongs to.
	 * @returns The created Card object.
	 */
	async createCard(name: string, listId: number): Promise<Card> {
		try {
			const card = await this.prisma.card.create({
				data: {
					name,
					listid: listId,
				},
			});
			console.log('Card created:', card);
			return card;
		} catch (error: any) {
			console.error('Error creating card:', error.message);
			throw new Error('Could not create card');
		}
	}

	/**
	 * Deletes a card by its ID.
	 * @param cardId - The ID of the card to delete.
	 * @returns The deleted Card object.
	 */
	async deleteCard(cardId: number): Promise<Card> {
		try {
			const card = await this.prisma.card.delete({
				where: {
					id: cardId,
				},
			});
			console.log('Card deleted:', card);
			return card;
		} catch (error: any) {
			if (error.code === 'P2025') {
				console.error('Card not found.');
				throw new Error('Card not found');
			}
			console.error('Error deleting card:', error.message);
			throw new Error('Could not delete card');
		}
	}

	/**
	 * Disconnect Prisma client.
	 */
	async disconnect(): Promise<void> {
		await this.prisma.$disconnect();
	}
}
