import {
    addCard,
    addList,
    deleteCard,
    deleteList,
    editCard,
    editListName,
    getBoardData,
    getCards,
    getLists
} from "../data.js";
import {getUser, guardLogin} from "../users.js";
import MainHeader from "./Header.js";
import {onChange, onClick} from "../utils.js";

let board;
let user;
let lists = [];

let ListView = function (list) {
    return `
        <div class="list">
            <div class="list-header">
                <textarea id="list${list.id}" class="list-header-name">${list.name}</textarea>
                <a id="del${list.id}" class="list-menu-list"></a>
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
    <div class="card-wrap">
        <textarea id="card${card.id}" class="list-card">${card.name}</textarea>
        <a id="menu${card.id}" class="card-menu-list"></a>
    </div>
    `;
}

async function newListListeners(list) {
    onClick(document.getElementById(`add${list.id}`), async () => {
        const card = await addCard(user.uid, board.id, list.id)
        document.getElementById(`cards${list.id}`).insertAdjacentHTML("beforeend", CardView(card))
        await newCardListeners(list.id, card);
        document.getElementById(`card${card.id}`).focus();
    })

    const el = document.getElementById(`list${list.id}`);
    onChange(el, async () => {
        list.name = el.value;
        await editListName(user.uid, board.id, list)
    })

    onClick(document.getElementById(`del${list.id}`), async (event) => {
        lists.splice(lists.indexOf(list), 1)
        await deleteList(user.uid, board.id, list.id);
        event.target.parentElement.parentElement.remove();
    })
}

function menuItem(name, click) {
    const el = document.createElement("li")
    el.innerText = name
    el.onclick = click
    return el
}

async function newCardListeners(listId, card) {
    const el = document.getElementById(`card${card.id}`);
    onChange(el, async () => {
        card.name = el.value;
        await editCard(user.uid, board.id, listId, card)
    })

    onClick(document.getElementById(`menu${card.id}`), async (event) => {
        const menu = document.getElementById(`card-menu`);
        menu.style.top = event.clientY + "px";
        menu.style.left = event.clientX + "px";
        menu.classList.toggle("show");
        menu.innerHTML = ""
        menu.append(menuItem("Delete", () => {
            deleteCard(user.uid, board.id, listId, card.id)
            el.parentElement.remove();
        }))
        for (const item of lists) {
            if (item.id !== listId) {
                menu.append(menuItem(`Move to '${item.name}'`, async () => {
                    const newCard = await addCard(user.uid, board.id, item.id, {...card})
                    document.getElementById(`cards${item.id}`).insertAdjacentHTML("beforeend", CardView(newCard));
                    deleteCard(user.uid, board.id, listId, card.id)
                    el.parentElement.remove();
                    newCardListeners(item.id, newCard)
                }))
            }
        }
    })
}


let BoardPage = {
    header: MainHeader,
    before_render: async () => {
        await guardLogin();
        user = await getUser();
        board = await getBoardData(user.uid, new URL(document.URL).searchParams.get("id"));
        const label = document.getElementById("header-label");
        label.innerText = board.name;
        lists = await getLists(user.uid, board.id) || [];
        lists.sort((a, b) => a.timestamp - b.timestamp)
    },
    render: async () => {
        return `
        <div class="board">
            <ul id="card-menu" class="card-menu">
            </ul>
            <div id="board-lists">
            ${lists.map(it => ListView(it)).join("\n")}
            </div>
            <button id="add-list-btn" class="add-list button-like">Add list</button>
        </div>
        `;
    },
    after_render: async () => {
        for (let list of lists) {
            const cards = await getCards(user.uid, board.id, list.id) || [];
            cards.sort((a, b) => a.timestamp - b.timestamp);
            for (let card of cards) {
                document.getElementById(`cards${list.id}`).insertAdjacentHTML("beforeend", CardView(card));
                await newCardListeners(list.id, card);
            }
            await newListListeners(list);
        }
        onClick(document.getElementById("add-list-btn"), async () => {
            const list = await addList(user.uid, board.id);
            lists.push(list);
            document.getElementById("board-lists").insertAdjacentHTML("beforeend", ListView(list));
            await newListListeners(list);
            document.getElementById(`list${list.id}`).focus();
        })

        onClick(window, (event) => {
            if (!event.target.matches(".card-menu-list")) {
                const menu = document.getElementById(`card-menu`);
                if (menu != null && menu.classList.contains("show")) {
                    menu.classList.remove("show")
                }
            }
        })
    }
}

export default BoardPage;