// cardsApi.ts
import { Card } from "../Types";

const API_PATH = "http://localhost:3001";

class CardsApi {
	async createCard(name: string, listId: number): Promise<Card> {
		const response = await fetch(`${API_PATH}/cards`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, listId }),
		});
		if (!response.ok) throw new Error("Failed to create card");
		return response.json();
	}
}

export const cardsApi = new CardsApi();
