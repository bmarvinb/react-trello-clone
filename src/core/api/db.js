import { db } from './firebase';
import { getUser } from './auth';

const boardsRef = db.ref('boards');
const listsRef = db.ref('lists');
const cardsRef = db.ref('cards');

export const createUser = (id, username, email) =>
    db.ref(`users/${id}`).set({
        username,
        email,
    });

export const createBoard = async board => {
    const uid = getUser().uid;
    const id = boardsRef.push().key;
    await boardsRef.child(uid).child(id).set(board);
    board.key = id;
    return board;
};

export const deleteBoard = async boardKey => {
    const uid = getUser().uid;
    await boardsRef.child(uid).child(boardKey).remove();
};

export const updateBoard = async (boardKey, title) => {
    const uid = getUser().uid;
    await boardsRef
        .child(uid)
        .child(boardKey)
        .update({
            ...title,
        });
};

export const getBoards = () => {
    const uid = getUser().uid;
    return boardsRef.child(uid).once('value');
};

export const editBoard = async (boardKey, board) => {
    const uid = getUser().uid;

    await boardsRef
        .child(uid)
        .child(boardKey)
        .update({
            ...board,
        });
    return board;
};

export const getBoard = key => {
    const uid = getUser().uid;

    return boardsRef.child(uid).child(`${key}`).once('value');
};

export const onceGetLists = key => listsRef.child(key).once('value');

export const doCreateList = async (boardKey, list) => {
    const id = listsRef.push().key;
    await listsRef.child(boardKey).child(id).set(list);
    list.key = id;
    return list;
};

export const doDeleteList = (boardKey, listKey) =>
    db
        .ref(`lists/${boardKey}`)
        .child(`${listKey}`)
        .remove()
        .then(() => db.ref('cards/').child(`${listKey}`).remove());

export const updateList = async (boardKey, listKey, list) => {
    await listsRef
        .child(boardKey)
        .child(listKey)
        .update({
            ...list,
        });
    return list;
};

export const addCard = (listKey, cardTitle) =>
    db.ref(`cards/${listKey}`).push({
        title: cardTitle,
    });

export const getCard = listKey => db.ref(`cards/${listKey}`).once('value');

export const card = async (listKey, cardKey, card) => {
    await cardsRef
        .child(listKey)
        .child(cardKey)
        .update({
            ...card,
        });
    card.key = cardKey;
    return card;
};

export const moveCard = (oldListKey, newListKey, cardKey, card) =>
    db
        .ref(`cards/${oldListKey}`)
        .child(`${cardKey}`)
        .remove()
        .then(() =>
            db.ref(`cards/${newListKey}/${cardKey}`).set({
                ...card,
            })
        );

export const deleteCard = (listKey, cardKey) => db.ref(`cards/${listKey}/`).child(`${cardKey}`).remove();
