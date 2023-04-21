import { useState } from "react";
import LoginFormContainer from "./LoginFormContainer";
import RegisterFormContainer from "./RegisterFormContainer";
import { feedbackResult } from "../../utils/types";

const AuthPage = () => {
    // form type -> true for login form false for register form
    const [formType, setFormType] = useState(true);
    const [feedbackText, setFeedbackText] = useState<null | string>(null);
    const [feedbackType, setFeedbackType] = useState<null | feedbackResult>(null);

    // Provide data from form submit into controller
    const setFeedbackHandler = (text: string, type: feedbackResult) => {
        setFeedbackText(text);
        setFeedbackType(type);
    };

    // Provide additional props is there any feedback
    const loginForm = (feedbackText && feedbackType) ? <LoginFormContainer changeFormHandler={setFormType} setFeedbackHandler={setFeedbackHandler} feedbackText={feedbackText} feedbackResult={feedbackType} /> : <LoginFormContainer changeFormHandler={setFormType} setFeedbackHandler={setFeedbackHandler}/>;
    const registerForm = <RegisterFormContainer setFormTypeHandler={setFormType} setFeedbackHandler={setFeedbackHandler}/>;

    const content = formType ? loginForm : registerForm;

    return <div className="login-container">
        {content}
    </div>
};

export default AuthPage;