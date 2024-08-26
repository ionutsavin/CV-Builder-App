import { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
    const [isSignupVisible, setIsSignupVisible] = useState<boolean>(false);

    const togglePasswordVisibility = (inputId: string, iconId: string) => {
        const input = document.getElementById(inputId) as HTMLInputElement | null;
        const icon = document.getElementById(iconId) as HTMLImageElement | null;
        if (input && input.type === 'password') {
        input.type = 'text';
        if (icon) {
            icon.src = '/eye-open.png';
        }
        } else {
        input && (input.type = 'password');
        if (icon) {
            icon.src = '/eye-close.png';
        }
        }
    };

    const handleSignupModal = (visible : boolean) => {
        setIsSignupVisible(visible);
    };

    return (
        <div className="page-container">
            <div className="login-container">
                <form method="post" className="login-form" action="/login">
                <div className="username-container">
                    <label htmlFor="username-login"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" id="usernameLogin" name="usernameLogin" required />

                    <label htmlFor="password-login"><b>Password</b></label>
                    <div className="password-container">
                    <input type="password" placeholder="Enter Password" id="passwordLogin" name="passwordLogin" required />
                    <img
                        src="/eye-close.png"
                        alt="Toggle password visibility"
                        id="eyeiconLogin"
                        onClick={() => togglePasswordVisibility('passwordLogin', 'eyeiconLogin')}
                    />
                    </div>

                    <button type="submit">Login</button>
                </div>
                <button type="button" className="link-button" onClick={() => handleSignupModal(true)}>
                    Want to become an administrator?
                </button>
                </form>
            </div>

        {isSignupVisible && (
            <div id="signup-modal" className="signup-container">
            <form method="post" className="signup-form" action="/signup">
                <div className="signup-cont">
                <h1>Sign Up</h1>
                <hr />
                <label htmlFor="username-signup"><b>Username</b></label>
                <input className="input" type="text" placeholder="Enter Username" id="usernameSignup" name="usernameSignup" required />

                <label htmlFor="password-signup"><b>Password</b></label>
                <div className="password-container">
                    <input type="password" placeholder="Enter Password" id="passwordSignup" name="passwordSignup" required />
                    <img
                    src="/eye-close.png"
                    alt="Toggle password visibility"
                    id="eyeiconSignup"
                    onClick={() => togglePasswordVisibility('passwordSignup', 'eyeiconSignup')}
                    />
                </div>

                <label htmlFor="password-signupRepeat"><b>Repeat Password</b></label>
                <div className="password-container">
                    <input type="password" placeholder="Repeat Password" id="passwordSignupRepeat" name="passwordSignupRepeat" required />
                    <img
                    src="/eye-close.png"
                    alt="Toggle password visibility"
                    id="eyeiconSignupRepeat"
                    onClick={() => togglePasswordVisibility('passwordSignupRepeat', 'eyeiconSignupRepeat')}
                    />
                </div>

                <div className="button-container">
                    <button type="button" onClick={() => handleSignupModal(false)} className="cancelbtn">Cancel</button>
                    <button type="submit">Sign Up</button>
                </div>
                </div>
            </form>
            </div>
        )}
        </div>
    );
};

export default LoginPage;
