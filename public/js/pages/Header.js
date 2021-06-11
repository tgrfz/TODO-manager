import navigate from "../../app.js";
import {onClick} from "../utils.js";
import {getUser, guardLogin, signout} from "../users.js";

let user = "";

let MainHeader = {
    before_render: async () => {
         await guardLogin();
         user = await getUser();
    },
    render: async () => {
        return `
        <div class="header-block">
            <div class="header-text">   
                <label id="header-label">My boards</label>
            </div>
            <div class="nav-elements">
                <a class="nav-tab button-like" id="header-account" href="">${user.email}</a>
                <a class="nav-tab button-like" id="header-signout" href="">Sign out</a>
            </div>
        </div>
        `;
    },
    after_render: async () => {
        onClick(document.getElementById("header-account"), () => {
            navigate("/boards")
        })

        onClick(document.getElementById("header-signout"), () => {
            signout().then(() => navigate("/login"));
        })

        // const user = await getUser();
        // const field = document.getElementById("header-account");
        // field.innerText = user.email;
    }
}

export default MainHeader;