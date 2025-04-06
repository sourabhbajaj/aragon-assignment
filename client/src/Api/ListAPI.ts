import { List } from "../Types"; // make sure you have a List type defined

const API_PATH = "http://localhost:3001";

class ListsApi {
	async getLists(boardId: number): Promise<List[]> {
		const response = await fetch(`${API_PATH}/lists?boardId=${boardId}`);
		if (!response.ok) throw new Error("Failed to fetch lists");
		return response.json();
	}

	async createList(name: string, boardId: number): Promise<List> {
		const response = await fetch(`${API_PATH}/lists`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, boardId }),
		});

		if (!response.ok) throw new Error("Failed to create list");
		return response.json();
	}

	async deleteList(id: number): Promise<{ success: boolean }> {
		const response = await fetch(`${API_PATH}/lists`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id }),
		});

		if (!response.ok) throw new Error("Failed to delete list");
		return { success: true };
	}
}

export const listsApi = new ListsApi();
