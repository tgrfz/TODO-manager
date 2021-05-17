import LoginPage from "./js/pages/LoginPage.js";
import SignupPage from "./js/pages/SignupPage.js";
import BoardsPage from "./js/pages/BoardsPage.js";
import BoardPage from "./js/pages/BoardPage.js";
import {Router} from "./router.js";

let routes = {
    "/login": LoginPage,
    "/signup": SignupPage,
    "/boards": BoardsPage,
    "/board": BoardPage,
    "/": BoardsPage
}

console.log("before")
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded")
    Router.init(routes);
});

export default function navigate(path) {
    Router.instance.navigate(path).catch(alert)
}
