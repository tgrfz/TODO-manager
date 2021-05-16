import LoginPage from "./js/pages/LoginPage.js";
import SignupPage from "./js/pages/SignupPage.js";
import BoardsPage from "./js/pages/BoardsPage.js";
import {Router} from "./router.js";

let routes = {
    "/login": LoginPage,
    "/signup": SignupPage,
    "/boards": BoardsPage,
    "/": LoginPage
}

console.log("before")
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded")
    Router.init(routes);
});

export default function navigate(path) {
    Router.instance.navigate(path).catch(alert)
}
