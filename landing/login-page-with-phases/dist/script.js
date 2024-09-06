"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const login = new LoginForm("form");
});
class LoginForm {
    /**
     * @param el CSS selector of the form to use
     */
    constructor(el) {
        var _a, _b, _c, _d;
        /** Timeout for the login attempt */
        this.loginTimeout = 0;
        /** Sign in or sign up */
        this._accessMode = 0;
        /** Email entered in the form */
        this._email = "";
        /** Password entered in the form */
        this._password = "";
        /** Display the password. */
        this._passwordShow = false;
        /** There are errors with the user input. */
        this._hasErrors = false;
        /** Stage of sign-in flow */
        this._loginStage = 0;
        /** User is logging in. */
        this._loginWorking = false;
        this.el = document.querySelector(el);
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.clickAction.bind(this));
        (_b = this.el) === null || _b === void 0 ? void 0 : _b.addEventListener("input", this.emailValidate.bind(this));
        (_c = this.el) === null || _c === void 0 ? void 0 : _c.addEventListener("submit", this.login.bind(this));
        (_d = this.el) === null || _d === void 0 ? void 0 : _d.reset();
    }
    get accessMode() {
        return this._accessMode;
    }
    set accessMode(value) {
        var _a, _b;
        const attr = "data-access";
        const current = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelector(`[${attr}="${this.accessMode}"]`);
        const next = (_b = this.el) === null || _b === void 0 ? void 0 : _b.querySelector(`[${attr}="${value}"]`);
        if (current) {
            current.ariaSelected = "false";
        }
        if (next) {
            next.ariaSelected = "true";
        }
        this._accessMode = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        var _a;
        const emailEl = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelector("[data-email]");
        if (emailEl) {
            emailEl.textContent = value;
        }
        this._email = value;
    }
    /** Email error message */
    get emailError() {
        return this.emailValid ? "" : LoginInvalid.Email;
    }
    /** Email has been properly entered. */
    get emailValid() {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return !!this.email.length && emailRegex.test(this.email);
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    /** Password error message */
    get passwordError() {
        return this.passwordValid ? "" : LoginInvalid.Password;
    }
    /** Password is valid (since this is a demo, check only for a length). */
    get passwordValid() {
        return !!this.password.length;
    }
    get passwordShow() {
        return this._passwordShow;
    }
    set passwordShow(value) {
        var _a, _b;
        this._passwordShow = value;
        if ((_b = (_a = this.el) === null || _a === void 0 ? void 0 : _a.password) === null || _b === void 0 ? void 0 : _b.type) {
            this.el.password.type = value ? "text" : "password";
            // hide the previous state
            const stateThen = !value ? PasswordDisplay.On : PasswordDisplay.Off;
            const stateThenIcon = this.el.querySelector(`[data-icon="eye-${stateThen}"]`);
            stateThenIcon === null || stateThenIcon === void 0 ? void 0 : stateThenIcon.setAttribute("display", "none");
            // show the current state
            const stateNow = value ? PasswordDisplay.On : PasswordDisplay.Off;
            const stateNowIcon = this.el.querySelector(`[data-icon="eye-${stateNow}"]`);
            stateNowIcon === null || stateNowIcon === void 0 ? void 0 : stateNowIcon.removeAttribute("display");
            // update the accessible label
            const button = this.el.querySelector(`[data-action="password"]`);
            const buttonTitle = value ? PasswordDisplayLabel.Hide : PasswordDisplayLabel.Show;
            button === null || button === void 0 ? void 0 : button.setAttribute("title", buttonTitle);
        }
    }
    get hasErrors() {
        return this._hasErrors;
    }
    set hasErrors(value) {
        this._hasErrors = value;
    }
    get loginStage() {
        return this._loginStage;
    }
    set loginStage(value) {
        var _a;
        const pages = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelector("[data-stage]");
        pages.setAttribute("data-stage", `${value}`);
        this._loginStage = value;
    }
    get loginWorking() {
        return this._loginWorking;
    }
    set loginWorking(value) {
        var _a, _b, _c;
        // temporarily disable controls if working
        const segmentsRaw = Array.from(((_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelectorAll("[data-access]")) || []);
        const segments = segmentsRaw;
        segments.forEach(segment => {
            segment.disabled = value;
        });
        if ((_b = this.el) === null || _b === void 0 ? void 0 : _b.email) {
            this.el.email.disabled = value;
        }
        if ((_c = this.el) === null || _c === void 0 ? void 0 : _c.password) {
            this.el.password.disabled = value;
        }
        const actionButtons = [
            {
                action: "continue",
                defaultText: LoginState.Continue,
                workingText: LoginState.ContinueWorking
            },
            {
                action: "login",
                defaultText: LoginState.Login,
                workingText: LoginState.LoginWorking
            },
            {
                action: "back"
            }
        ];
        actionButtons.forEach((button) => {
            var _a;
            const buttonEl = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelector(`[data-action="${button.action}"]`);
            if (buttonEl) {
                if (value && button.workingText) {
                    buttonEl.textContent = button.workingText;
                }
                else if (button.defaultText) {
                    buttonEl.textContent = button.defaultText;
                }
                buttonEl.disabled = value;
            }
        });
        this._loginWorking = value;
    }
    /** Switch between signing in or signing up. */
    accessModeToggle() {
        if (this.loginStage === 0) {
            if (this.accessMode === AccessMode.SignIn) {
                this.accessMode = AccessMode.SignUp;
            }
            else {
                this.accessMode = AccessMode.SignIn;
            }
        }
    }
    /**
     * Perform a given action of the clicked button.
     * @param e Click event
     */
    clickAction(e) {
        const target = e.target;
        const action = target.getAttribute("data-action");
        if (action === "access") {
            this.accessModeToggle();
            this.greetingUpdate();
        }
        else if (action === "back") {
            this.passwordGoBack();
        }
        else if (action === "password") {
            this.passwordShowToggle();
        }
    }
    /**
     * Validate the email on the fly.
     * @param e Input event
     */
    emailValidate(e) {
        var _a, _b;
        const target = e.target;
        if (this.hasErrors && target.name === "email" && !target.validity.typeMismatch) {
            const lastValue = this.email;
            this.email = (_b = (_a = this.el) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.value;
            this.errorCheck();
            this.email = lastValue;
        }
    }
    /** Check the input of the current stage for errors. */
    errorCheck() {
        if (this.loginStage === 0) {
            this.errorCheckEmail();
        }
        else if (this.loginStage === 1) {
            this.errorCheckPassword();
        }
    }
    /** Check the email for errors. */
    errorCheckEmail() {
        var _a, _b;
        if ((_a = this.el) === null || _a === void 0 ? void 0 : _a.email) {
            this.hasErrors = !this.emailValid;
            this.el.email.ariaInvalid = this.hasErrors;
            // display the email error
            const emailError = (_b = this.el) === null || _b === void 0 ? void 0 : _b.querySelector("#email-error");
            if (emailError) {
                emailError.textContent = this.emailError;
            }
            if (this.hasErrors) {
                this.el.email.setAttribute("aria-errormessage", "email-error");
                return;
            }
            this.el.email.removeAttribute("aria-errormessage");
        }
    }
    /** Check the password for errors. */
    errorCheckPassword() {
        var _a, _b;
        if ((_a = this.el) === null || _a === void 0 ? void 0 : _a.password) {
            this.hasErrors = !this.passwordValid;
            this.el.password.ariaInvalid = this.hasErrors;
            // display the password error
            const passwordError = (_b = this.el) === null || _b === void 0 ? void 0 : _b.querySelector("#password-error");
            if (passwordError) {
                passwordError.textContent = this.passwordError;
            }
            if (this.hasErrors) {
                this.el.password.setAttribute("aria-errormessage", "password-error");
                return;
            }
            this.el.password.removeAttribute("aria-errormessage");
        }
    }
    /** Update the greeting to reflect signing in or signing up. */
    greetingUpdate() {
        var _a;
        const greeting = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelector("[data-greeting]");
        if (greeting) {
            if (this.accessMode === AccessMode.SignUp) {
                greeting.textContent = Greeting.SignUp;
            }
            else {
                greeting.textContent = Greeting.SignIn;
            }
        }
    }
    /**
     * Attempt log in using the given credentials.
     * @param e Submit event
     */
    login(e) {
        e.preventDefault();
        if (!this.loginWorking) {
            const timeout = 750;
            this.loginWorking = true;
            this.loginTimeout = setTimeout(this.loginActions.bind(this), timeout);
        }
    }
    /** Actions after login (resets upon success since this is a front-end demo) */
    loginActions() {
        var _a, _b, _c, _d;
        this.loginWorking = false;
        if (this.loginStage === 0) {
            this.email = (_b = (_a = this.el) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.value;
        }
        else {
            this.password = (_d = (_c = this.el) === null || _c === void 0 ? void 0 : _c.password) === null || _d === void 0 ? void 0 : _d.value;
        }
        this.errorCheck();
        if (!this.hasErrors) {
            if (this.accessMode === AccessMode.SignIn && this.loginStage === 0) {
                this.loginStage = 1;
                return;
            }
            this.loginRevertData(true);
        }
    }
    /**
     * Revert input until the first stage.
     * @param revertAll Revert all input.
     */
    loginRevertData(revertAll = false) {
        var _a;
        this.loginStage = 0;
        this.password = "";
        if (revertAll === true) {
            (_a = this.el) === null || _a === void 0 ? void 0 : _a.reset();
        }
    }
    /** Cancel password input and go back to the first stage. */
    passwordGoBack() {
        var _a, _b;
        this.loginRevertData();
        if ((_a = this.el) === null || _a === void 0 ? void 0 : _a.password) {
            // reset the password input
            this.el.password.value = this.password;
            this.el.password.ariaInvalid = false;
            this.el.password.removeAttribute("aria-errormessage");
            // clear the message
            const passwordError = (_b = this.el) === null || _b === void 0 ? void 0 : _b.querySelector("#password-error");
            if (passwordError) {
                passwordError.textContent = "";
            }
        }
    }
    /** Toggle whether the password should be shown */
    passwordShowToggle() {
        this.passwordShow = !this.passwordShow;
    }
}
var AccessMode;
(function (AccessMode) {
    AccessMode[AccessMode["SignIn"] = 0] = "SignIn";
    AccessMode[AccessMode["SignUp"] = 1] = "SignUp";
})(AccessMode || (AccessMode = {}));
var Greeting;
(function (Greeting) {
    Greeting["SignIn"] = "Greetings!";
    Greeting["SignUp"] = "Create an Account";
})(Greeting || (Greeting = {}));
var LoginInvalid;
(function (LoginInvalid) {
    LoginInvalid["Email"] = "Enter your email";
    LoginInvalid["Password"] = "Enter your password";
})(LoginInvalid || (LoginInvalid = {}));
var LoginState;
(function (LoginState) {
    LoginState["Continue"] = "Continue";
    LoginState["ContinueWorking"] = "Continuing\u2026";
    LoginState["Login"] = "Sign In";
    LoginState["LoginWorking"] = "Signing in\u2026";
})(LoginState || (LoginState = {}));
var PasswordDisplay;
(function (PasswordDisplay) {
    PasswordDisplay["Off"] = "off";
    PasswordDisplay["On"] = "on";
})(PasswordDisplay || (PasswordDisplay = {}));
var PasswordDisplayLabel;
(function (PasswordDisplayLabel) {
    PasswordDisplayLabel["Hide"] = "Hide password";
    PasswordDisplayLabel["Show"] = "Show password";
})(PasswordDisplayLabel || (PasswordDisplayLabel = {}));