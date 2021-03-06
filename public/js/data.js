const db = firebase.firestore();

export async function getBoardList(userId) {
    const ref = db.collection('users').doc(userId).collection('boards');

    let boardQuery = await ref.get().catch(function (error) {
        alert("Error getting document: " + error);
    });

    if (!boardQuery || boardQuery.empty) {
        return null;
    }

    return boardQuery.docs.map(query => {
        const board = query.data();
        board.id = query.id;
        return board;
    });
}

export async function addBoard(userId, boardName) {
    const board = {timestamp: +new Date(), name: boardName};
    const query = await db.collection('users').doc(userId).collection('boards').add(board);
    board.id = query.id;
    return board;
}

export async function getBoardData(userId, boardId) {
    const query = await db.collection('users').doc(userId).collection('boards').doc(boardId).get().catch(function (error) {
        alert("Error getting document: " + error);
    });
    if (!query || query.empty) {
        return null;
    }

    const board = query.data();
    board.id = query.id;
    return board;
}

export async function addList(userId, boardId) {
    const list = {timestamp: +new Date(), name: ""};
    const query = await db.collection('users').doc(userId).collection('boards').doc(boardId).collection('lists').add(list);
    list.id = query.id;
    return list;
}

export async function getLists(userId, boardId) {
    const ref = db.collection('users').doc(userId).collection('boards').doc(boardId).collection('lists');

    let listQuery = await ref.get().catch(function (error) {
        alert("Error getting document: " + error);
    });

    if (!listQuery || listQuery.empty) {
        return null;
    }

    return listQuery.docs.map(query => {
        const list = query.data();
        list.id = query.id;
        return list;
    });
}

export async function editListName(userId, boardId, list) {
    await db.collection('users').doc(userId).collection('boards').doc(boardId).collection('lists').doc(list.id).update(list);
}

export async function deleteList(userId, boardId, listId) {
    await db.collection('users').doc(userId).collection('boards').doc(boardId).collection('lists').doc(listId).delete();
}

export async function addCard(userId, boardId, listId, card = {name: ""}) {
    card.timestamp = +new Date();
    const query = await db.collection('users').doc(userId).collection('boards').doc(boardId).collection('lists').doc(listId).collection('cards').add(card);
    card.id = query.id;
    return card;
}

export async function getCards(userId, boardId, listId) {
    const ref = db.collection('users').doc(userId).collection('boards').doc(boardId).collection('lists').doc(listId).collection('cards');

    let cardQuery = await ref.get().catch(function (error) {
        alert("Error getting document: " + error);
    });

    if (!cardQuery || cardQuery.empty) {
        return null;
    }

    return cardQuery.docs.map(query => {
        const card = query.data();
        card.id = query.id;
        return card;
    });
}

export async function editCard(userId, boardId, listId, card) {
    await db.collection('users').doc(userId).collection('boards').doc(boardId).collection('lists').doc(listId).collection('cards').doc(card.id).update(card);
}

export async function deleteCard(userId, boardId, listId, cardId) {
    console.log(cardId)
    await db.collection('users').doc(userId).collection('boards').doc(boardId).collection('lists').doc(listId).collection('cards').doc(cardId).delete();
}
