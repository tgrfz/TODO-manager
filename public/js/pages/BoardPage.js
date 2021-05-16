import {addCard, addList, editCard, editListName, getBoardData, getCards, getLists} from "../data.js";
import {getUser} from "../users.js";
import MainHeader from "./Header.js";
import {onChange, onClick} from "../utils.js";

let board;
let user;
let lists;

let ListView = function (list) {
    return `
        <div class="list">
            <div class="list-header">
                <textarea id="list${list.id}" class="list-header-name">${list.name}</textarea>
                <a class="list-menu-list"></a>
            </div>
            <div id="cards${list.id}" class="list-cards">
            </div>
            <div id="add${list.id}" class="list-add-card">
                <a>Add card</a>
            </div>
        </div>
        `;
}

let CardView = function (card) {
    return `
    <textarea id="card${card.id}" class="list-card">${card.name}</textarea>
    `;
}

let BoardPage = {
    header: MainHeader,
    before_render: async () => {
        user = await getUser();
        board = await getBoardData(user.uid, new URL(document.URL).searchParams.get("id"));
        const label = document.getElementById("header-label");
        label.innerText = board.name;
        lists = await getLists(user.uid, board.id) || [];
    },
    render: async () => {
        return `
        <div class="board">
            <div id="board-lists">
            ${lists.sort((a, b) => a.timestamp - b.timestamp).map(it => ListView(it)).join("\n")}
            </div>
            <button id="add-list-btn" class="add-list button-like">Add list</button>
        </div>
        `;
    },
    after_render: async () => {
        for (let list of lists) {
            const cards = await getCards(user.uid, board.id, list.id) || [];
            for (let card of cards) {
                document.getElementById(`cards${list.id}`).insertAdjacentHTML("beforeend", CardView(card))

                onChange(document.getElementById(`card${card.id}`), async () => {
                    card.name = document.getElementById(`card${card.id}`).value;
                    await editCard(user.uid, board.id, list.id, card)
                })
            }

            onClick(document.getElementById(`add${list.id}`), async () => {
                const card2 = await addCard(user.uid, board.id, list.id, "TODO")
                document.getElementById(`cards${list.id}`).insertAdjacentHTML("beforeend", CardView(card2))
            })

            onChange(document.getElementById(`list${list.id}`), async () => {
                list.name = document.getElementById(`list${list.id}`).value;
                await editListName(user.uid, board.id, list)
            })
        }
        onClick(document.getElementById("add-list-btn"), async () => {
            const list = await addList(user.uid, board.id);
            document.getElementById("board-lists").insertAdjacentHTML("beforeend", ListView(list));

            onClick(document.getElementById(`add${list.id}`), async () => {
                const card = await addCard(user.uid, board.id, list.id, "TODO")
                document.getElementById(`cards${list.id}`).insertAdjacentHTML("beforeend", CardView(card))
            })
        })
    }
}

export default BoardPage;