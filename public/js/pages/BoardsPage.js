import MainHeader from "../pages/Header.js"
import {guardLogin, getUser} from "../users.js";

let BoardsPage = {
    header: MainHeader,
    before_render: async () => {
        await guardLogin();
    },
    render: async () => {
        return `
        <div class="boards">
            <div class="board-list">
                <ul>
                    <li>
                        <a class="board-list-item button-like" href="">Board name 1</a>
                    </li>
                    <li>
                        <a class="board-list-item button-like" href="">Board name 2</a>
                    </li>
                    <li>
                        <a class="board-list-item button-like" href="">Board name 3</a>
                    </li>
                </ul>
                <button id="add-board-btn" class="button-like">Create new board</button>
            </div>
        </div>
        `;
    },
    after_render: async () => {

    }
}

export default BoardsPage;