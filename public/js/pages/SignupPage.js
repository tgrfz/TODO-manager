import navigate from "../../app.js";
import {ifLoggedIn, signup} from "../users.js";
import {onClick, onSubmit} from "../utils.js";

let SignupPage = {
    before_render: async () => {
        ifLoggedIn(() => navigate("/boards"));
    },
    render: async () => {
        return `
            <div class="login-wrap">
                <div class="login-block">
                    <h2>Sign up</h2>
                    <form id="login_form" class="login-form">
                        <input type="email" id="email" name="email" placeholder="Login" minlength="5" required/>
                        <input type="password" id="password" name="password" placeholder="Password" minlength="8" required/>
                        <button class="button-like" type="submit">Sign up</button>
                    </form>
                    <a id="log_in" href="/login">Already have an account? Log In</a>
                </div>
            </div>
        `;
    },
    after_render: async () => {
        onSubmit(document.getElementById("login_form"), ({email, password}) => {
            signup(email, password).then(() => navigate("/boards"));
        });

        onClick(document.getElementById("log_in"), () => {
            navigate("/login")
        });
    }
}

export default SignupPage;
