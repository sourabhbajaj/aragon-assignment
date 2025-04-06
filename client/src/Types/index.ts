export interface Board {
	id: number,
	name: String,
	createdAt: string
}

export interface Card {
	id: number;
	name: string;
	listid: number;
}

export interface List {
	id: number;
	name: string;
	boardid: number;
	cards: Card[];
}
