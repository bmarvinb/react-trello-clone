import firebase from 'firebase';

export const createUserWithEmailAndPassword = (email, password) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

export const signInWithEmailAndPassword = (email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

export const signOut = () => firebase.auth().signOut();

export const passwordReset = email => firebase.auth().sendPasswordResetEmail(email);

export const passwordUpdate = password => firebase.auth().currentUser.updatePassword(password);

export const getUser = () => firebase.auth().currentUser;
