import navigate from "../app.js";

const auth = firebase.auth();

export async function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password).catch(alert);
}

export async function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password).catch(alert);
}

export async function signout() {
    return auth.signOut().catch(alert);
}

export async function getUser() {
    return await new Promise(resolve => {
        auth.onAuthStateChanged((user) => {
            resolve(user);
        });
    })
}

export function ifLoggedIn(action) {
    getUser().then(user => {
        if (user) action(user)
    }).catch(alert)
}

export async function guardLogin() {
    if (await getUser() == null) navigate("/login");
}
