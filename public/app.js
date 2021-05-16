import LoginPage from "./js/pages/LoginPage.js";
import SignupPage from "./js/pages/SignupPage.js";
import {Router} from "./router.js";

let routes = {
    "/login": LoginPage,
    "/signup": SignupPage,
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
