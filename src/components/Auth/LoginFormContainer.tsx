import LoginForm from "./LoginForm";
import FormTitle from "./FormTitle";
import FormChange from "./FormChange";
import { useState } from "react";
import { feedbackResult } from "../../utils/types";
import FormFeedback from "./FormFeedback";

const LoginFormContainer: React.FC<{changeFormHandler: (type: boolean) => void, feedbackResult?: feedbackResult, feedbackText?: string}> = (props) => {

    return <div className="login-form-container">
        <FormTitle formTitle="SIGN IN"/>
        <LoginForm />
        <FormChange text="Do not have an account? Register here!" formChangeHandler={props.changeFormHandler} formType={false}/>
        {props.feedbackResult && props.feedbackText && <FormFeedback result={props.feedbackResult} text={props.feedbackText}/>} 
    </div>
};

export default LoginFormContainer;