import LoginForm from "./LoginForm";
import FormTitle from "./FormTitle";
import FormChange from "./FormChange";
import { feedbackResult } from "../../utils/types";
import FormFeedback from "./FormFeedback";

import './LoginFormContainer.css';

const LoginFormContainer: React.FC<{changeFormHandler: (type: boolean) => void, setFeedbackHandler: (text: string, type: feedbackResult) => void, feedbackResult?: feedbackResult, feedbackText?: string}> = (props) => {

    return <div className="form-container">
        <FormTitle formTitle="SIGN IN"/> 
        <LoginForm  setfeedbackHandler={props.setFeedbackHandler}/>
        {props.feedbackResult && props.feedbackText && <FormFeedback result={props.feedbackResult} text={props.feedbackText}/>}
        <FormChange text="Do not have an account? Register here!" setFormTypeHandler={props.changeFormHandler} formType={false}/>
    </div>
};

export default LoginFormContainer;