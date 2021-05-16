import navigate from "../../app.js";
// import {ifLoggedIn, login} from "../users.js";
import {onClick, onSubmit} from "../utils.js";

let LoginPage = {
    before_render: async () => {
        // ifLoggedIn(() => navigate("/boards"));
    },
    render: async () => {
        return `
            <div class="login-wrap">
                <div class="login-block">
                    <h2>Log in</h2>
                    <form id="login_form" class="login-form" method="post">
                        <input type="text" id="login" name="login" placeholder="Login" minlength="5" required/>
                        <input type="Password" id="password" name="password" placeholder="Password" minlength="8" required/>
                        <button class="button-like" type="submit" >Log in</button>
                    </form>
                    <a id="sign_up" href="/signup">Sign up for an account</a>
                </div>
            </div>            
        `;
    },
    after_render: async () => {
        // onSubmit(document.getElementById("login_form"), ({email, password}) => {
        //     login(email, password).then(() => navigate("/boards"))
        // });

        onClick(document.getElementById("sign_up"), () => {
            navigate("/signup")
        });
    }
}

export default LoginPage;
