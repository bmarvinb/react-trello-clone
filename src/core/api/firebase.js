import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCobI5sUZzHV5IXliwFGevxnzs1IWTuYK8',
    authDomain: 'trello-board-b720f.firebaseapp.com',
    databaseURL: 'https://trello-board-b720f.firebaseio.com',
    projectId: 'trello-board-b720f',
    storageBucket: 'trello-board-b720f.appspot.com',
    messagingSenderId: '572468307248',
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const auth = firebase.auth();

export const db = firebase.database();

export const provider = new firebase.auth.GoogleAuthProvider();
