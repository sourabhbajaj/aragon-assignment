import { useEffect, useState } from 'react';
import KanbanBoard from '../Component/Kanban';
import LeftNavBar from './LeftNavBar';
import './Main.css';
import { Board, List } from '../Types';
import { boardsApi } from '../Api/BoardAPI';
import { listsApi } from '../Api/ListAPI'; // ✅ make sure this is imported

const MainLayout: React.FC = () => {
	const [boardList, setBoardList] = useState<Board[]>([]);
	const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
	const [boardLists, setBoardLists] = useState<List[]>([]);

	useEffect(() => {
		const fetchBoards = async () => {
			try {
				const result = await boardsApi.getBoards();
				setBoardList(result);

				// Automatically select the first board (optional)
				if (result.length > 0) {
					handleSelectBoard(result[0].id);
				}
			} catch (error) {
				console.error("Failed to fetch boards", error);
			}
		};

		fetchBoards();
	}, []);

	const onAddBoard = async (boardName: string) => {
		try {
			const newBoard = await boardsApi.createBoard(boardName);
			setBoardList((prev) => [...prev, newBoard]);
			handleSelectBoard(newBoard.id); // Auto-select new board
		} catch (error) {
			console.error("Failed to create board", error);
		}
	};

	const handleSelectBoard = async (boardId: number) => {
		setSelectedBoardId(boardId);

		try {
			const lists = await listsApi.getLists(boardId);
			setBoardLists(lists);
		} catch (error) {
			console.error("Failed to fetch lists", error);
		}
	};

	return (
		<div className="app-container">
			{/* Sidebar */}
			<LeftNavBar
				boards={boardList}
				onAddBoard={onAddBoard}
				onSelectBoard={handleSelectBoard} // ✅ Pass the select function
				selectedBoardId={selectedBoardId}
			/>

			{/* Main content area */}
			<div className="main-area">
				<header className="topbar">
					<h1 className="page-title">
						{boardList.find((b) => b.id === selectedBoardId)?.name || "Platform Launch"}
					</h1>
					<button className="add-task-button">Add New Task</button>
				</header>

				<main className="content">
					<KanbanBoard initialLists={boardLists} />
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
