import { Board } from "../Types";

const API_PATH = "http://localhost:3001";

class BoardsApi {
	async getBoards(): Promise<Board[]> {
		const response = await fetch(`${API_PATH}/boards`);
		if (!response.ok) throw new Error("Failed to fetch boards");
		return response.json();
	}

	async createBoard(name: string): Promise<Board> {
		const response = await fetch(`${API_PATH}/boards`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name }),
		});

		if (!response.ok) throw new Error("Failed to create board");
		return response.json();
	}

	async deleteBoard(id: number): Promise<{ success: boolean }> {
		const response = await fetch(`${API_PATH}/boards/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) throw new Error("Failed to delete board");
		return { success: true };
	}
}

export const boardsApi = new BoardsApi();
