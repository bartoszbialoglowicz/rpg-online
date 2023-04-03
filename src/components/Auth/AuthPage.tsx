import { useState } from "react";
import LoginFormContainer from "./LoginFormContainer";
import RegisterFormContainer from "./RegisterFormContainer";

const AuthPage = () => {
    // form type -> true for login form false for register form
    const [formType, setFormType] = useState(true);

    const content = formType ? <LoginFormContainer changeFormHandler={setFormType}/> : <RegisterFormContainer changeFormHandler={setFormType}/>;

    return <div className="login-container">
        {content}
    </div>
};

export default AuthPage;