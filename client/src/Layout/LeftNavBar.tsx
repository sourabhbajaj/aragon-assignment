import React, { useState } from "react";
import { Board } from "../Types";

type LeftNavBarProps = {
	boards: Board[];
	onAddBoard: (boardName: string) => void;
	onSelectBoard: (boardId: number) => void;
	selectedBoardId: number | null;
};

const LeftNavBar: React.FC<LeftNavBarProps> = ({
	boards,
	onAddBoard,
	onSelectBoard,
	selectedBoardId,
}) => {
	const [showInput, setShowInput] = useState(false);
	const [boardName, setBoardName] = useState("");

	const handleAddBoard = () => {
		if (!boardName.trim()) return;
		onAddBoard(boardName);
		setBoardName("");
		setShowInput(false);
	};

	return (
		<div
			className="sidebar"
			style={{
				background: "#2d3748",
				color: "#fff",
				padding: "1rem",
				minHeight: "100vh",
				width: "250px",
			}}
		>
			<div
				className="logo"
				style={{
					fontSize: "1.5rem",
					fontWeight: "bold",
					marginBottom: "1.5rem",
				}}
			>
				Kanban
			</div>
			<div
				className="boards-list-title"
				style={{ fontSize: "1rem", marginBottom: "0.5rem" }}
			>
				All Boards
			</div>

			<nav
				className="nav-links"
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "0.5rem",
					marginBottom: "1rem",
				}}
			>
				{boards.map((board) => (
					<div
						key={board.id}
						onClick={() => onSelectBoard(board.id)}
						style={{
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							background:
								selectedBoardId === board.id
									? "#2b6cb0"
									: "#4a5568",
							padding: "0.5rem 1rem",
							borderRadius: "4px",
							transition: "background 0.2s ease",
						}}
					>
						<span style={{ color: "#fff", flex: 1 }}>
							{board.name}
						</span>
					</div>
				))}
			</nav>

			{!showInput && (
				<button
					onClick={() => setShowInput(true)}
					style={{
						background: "#3182ce",
						color: "#fff",
						padding: "0.5rem 1rem",
						border: "none",
						borderRadius: "4px",
					}}
				>
					+ Add Board
				</button>
			)}

			{showInput && (
				<div style={{ marginTop: "1rem" }}>
					<input
						type="text"
						value={boardName}
						onChange={(e) => setBoardName(e.target.value)}
						placeholder="Board name"
						style={{
							padding: "0.5rem",
							width: "100%",
							marginBottom: "0.5rem",
						}}
					/>
					<button
						onClick={handleAddBoard}
						style={{
							background: "#48bb78",
							color: "#fff",
							padding: "0.5rem 1rem",
							border: "none",
							borderRadius: "4px",
						}}
					>
						Submit
					</button>
				</div>
			)}
		</div>
	);
};

export default LeftNavBar;
