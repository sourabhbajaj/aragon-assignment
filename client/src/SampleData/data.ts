import { Board } from "../Types";

export const boards: Board[] = [
	{
		id: 1,
		name: "Board1",
		createdAt: "2025-04-01T10:00:00Z",
	},
	{
		id: 2,
		name: "Board2",
		createdAt: "2025-04-02T14:30:00Z",
	},
	{
		id: 3,
		name: "Board3",
		createdAt: "2025-04-03T09:15:00Z",
	},
];



export const lists = [
	{
		id: 101,
		boardId: 1,
		title: "To Do",
		cards: [
			{
				id: 1001,
				title: "Set up project repo",
				description: "Initialize the GitHub repo and push starter files.",
				createdAt: "2025-04-01T11:00:00Z",
			},
			{
				id: 1002,
				title: "Design wireframes",
				description: "Create initial UI sketches for the dashboard.",
				createdAt: "2025-04-01T12:00:00Z",
			},
		],
	},
	{
		id: 102,
		boardId: 1,
		title: "In Progress",
		cards: [
			{
				id: 1003,
				title: "Build login page",
				description: "Implement login form and auth integration.",
				createdAt: "2025-04-02T09:30:00Z",
			},
		],
	},
	{
		id: 103,
		boardId: 1,
		title: "Done",
		cards: [
			{
				id: 1004,
				title: "Setup project structure",
				description: "Configured folder structure and dependencies.",
				createdAt: "2025-04-01T10:30:00Z",
			},
		],
	},
	{
		id: 201,
		boardId: 2,
		title: "Ideas",
		cards: [
			{
				id: 2001,
				title: "Social media campaign",
				description: "Plan for Facebook and Instagram marketing.",
				createdAt: "2025-04-03T08:20:00Z",
			},
		],
	},
	{
		id: 202,
		boardId: 2,
		title: "Execution",
		cards: [],
	},
];


