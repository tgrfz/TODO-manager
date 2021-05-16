import MainHeader from "../pages/Header.js"
import {guardLogin, getUser} from "../users.js";
import {getBoardList, addBoard} from "../data.js";
import {onClick, onSubmit} from "../utils.js";
import navigate from "../../app.js";

let boardListItem = function (board) {
    return `
        <li>
            <a class="board-list-item button-like" href="/board?id=${board.id}">${board.name}</a>
        </li>
        `
}

let boardList = [];

let BoardsPage = {
    header: MainHeader,
    before_render: async () => {
        await guardLogin();
        const user = await getUser();
        boardList = await getBoardList(user.uid) || [];
    },
    render: async () => {
        return `
        <div class="boards">
            <div class="board-list">
                <ul id="board-list">
                 ${boardList.sort((a,b) => a.timestamp - b.timestamp).map(it => boardListItem(it)).join("\n")}
                </ul>
                <form id="add-board-form">
                    <input type="text" name="boardName" placeholder="Board name" minlength="3" required>
                    <button class="button-like" type="submit">Create</button>
                </form>
            </div>
        </div>
        `;
    },
    after_render: async () => {
        const user = await getUser();

        onSubmit(document.getElementById("add-board-form"), async ({boardName}) => {
            const board = await addBoard(user.uid, boardName);
            document.getElementById("board-list").insertAdjacentHTML("beforeend", boardListItem(board));
        });


    }
}

export default BoardsPage;