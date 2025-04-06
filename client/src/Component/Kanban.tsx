import React, { useState, useEffect } from "react";
import { List, Card } from "../Types";
import { cardsApi } from "../Api/CardAPI";

interface KanbanBoardProps {
	initialLists: List[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialLists }) => {
	const [lists, setLists] = useState<List[]>(initialLists);
	const [showInputForList, setShowInputForList] = useState<Record<number, boolean>>({});
	const [cardInputs, setCardInputs] = useState<Record<number, string>>({});
	const [newListTitle, setNewListTitle] = useState<string>("");

	useEffect(() => {
		setLists(initialLists);
	}, [initialLists]);

	const handleDragStart = (e: React.DragEvent, cardId: number, sourceListId: number) => {
		e.dataTransfer.setData("cardId", cardId.toString());
		e.dataTransfer.setData("sourceListId", sourceListId.toString());
	};

	const handleDrop = (e: React.DragEvent, targetListId: number) => {
		const cardId = parseInt(e.dataTransfer.getData("cardId"));
		const sourceListId = parseInt(e.dataTransfer.getData("sourceListId"));
		if (sourceListId === targetListId) return;

		const sourceList = lists.find((list) => list.id === sourceListId);
		const targetList = lists.find((list) => list.id === targetListId);
		if (!sourceList || !targetList) return;

		const cardToMove = sourceList.cards.find((card) => card.id === cardId);
		if (!cardToMove) return;

		const updatedSourceCards = sourceList.cards.filter((card) => card.id !== cardId);
		const updatedTargetCards = [...targetList.cards, cardToMove];

		const updatedLists = lists.map((list) => {
			if (list.id === sourceListId) return { ...list, cards: updatedSourceCards };
			if (list.id === targetListId) return { ...list, cards: updatedTargetCards };
			return list;
		});

		setLists(updatedLists);
	};

	const handleAddCard = async (listId: number) => {
		const cardName = cardInputs[listId]?.trim();
		if (!cardName) return;

		try {
			const newCard: Card = await cardsApi.createCard(cardName, listId);

			const updatedLists = lists.map((list) => {
				if (list.id === listId) {
					return { ...list, cards: [...list.cards, newCard] };
				}
				return list;
			});

			setLists(updatedLists);
			setCardInputs((prev) => ({ ...prev, [listId]: "" }));
			setShowInputForList((prev) => ({ ...prev, [listId]: false }));
		} catch (error) {
			console.error("Failed to add card:", error);
		}
	};

	const handleAddList = () => {
		const title = newListTitle.trim();
		if (!title) return;



		const newList: List = {
			id: Date.now(), // Temporary local ID
			name: title,
			boardid: 1, // Optional if you track boardId
			cards: [],
		};

		setLists((prev) => [...prev, newList]);
		setNewListTitle("");
	};

	return (
		<div style={{ display: "flex", gap: "1rem", padding: "1rem", overflowX: "auto" }}>
			{lists.map((list) => (
				<div
					key={list.id}
					onDragOver={(e) => e.preventDefault()}
					onDrop={(e) => handleDrop(e, list.id)}
					style={{
						background: "#f0f0f0",
						padding: "1rem",
						borderRadius: "8px",
						minWidth: "250px",
						flexShrink: 0,
					}}
				>
					<h3>{list.name}</h3>

					{list.cards.map((card) => (
						<div
							key={card.id}
							draggable
							onDragStart={(e) => handleDragStart(e, card.id, list.id)}
							style={{
								background: "white",
								margin: "0.5rem 0",
								padding: "0.75rem",
								borderRadius: "6px",
								boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
								cursor: "grab",
							}}
						>
							<strong>{card.name}</strong>
						</div>
					))}

					{showInputForList[list.id] ? (
						<div style={{ marginTop: "0.5rem" }}>
							<input
								type="text"
								value={cardInputs[list.id] || ""}
								onChange={(e) =>
									setCardInputs((prev) => ({
										...prev,
										[list.id]: e.target.value,
									}))
								}
								placeholder="Card title"
								style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
							/>
							<button
								onClick={() => handleAddCard(list.id)}
								style={{ padding: "0.5rem 1rem" }}
							>
								Submit
							</button>
						</div>
					) : (
						<button
							onClick={() =>
								setShowInputForList((prev) => ({ ...prev, [list.id]: true }))
							}
							style={{ marginTop: "1rem", padding: "0.5rem", width: "100%" }}
						>
							+ Add Card
						</button>
					)}
				</div>
			))}

			{/* ➕ Add new list section */}
			<div
				style={{
					background: "#e2e8f0",
					padding: "1rem",
					borderRadius: "8px",
					minWidth: "250px",
					flexShrink: 0,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<input
					type="text"
					value={newListTitle}
					onChange={(e) => setNewListTitle(e.target.value)}
					placeholder="New list title"
					style={{ padding: "0.5rem", marginBottom: "0.5rem" }}
				/>
				<button onClick={handleAddList} style={{ padding: "0.5rem 1rem" }}>
					Add List
				</button>
			</div>
		</div>
	);
};

export default KanbanBoard;
