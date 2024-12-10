import LoginForm from "./LoginForm";
import FormTitle from "./FormTitle";
import FormChange from "./FormChange";
import { feedbackResult } from "../../types/RequestTypes";
import FormFeedback from "./FormFeedback";

import './LoginFormContainer.css';

const LoginFormContainer: React.FC<{changeFormHandler: (type: boolean) => void, setFeedbackHandler: (text: string, type: feedbackResult) => void, feedbackResult?: feedbackResult, feedbackText?: string}> = (props) => {

    return <div className="form-container">
        <FormTitle formTitle="LOGOWANIE"/> 
        <LoginForm  setfeedbackHandler={props.setFeedbackHandler}/>
        {props.feedbackResult && props.feedbackText && <FormFeedback result={props.feedbackResult} text={props.feedbackText}/>}
        <FormChange text="Jeżeli nie masz konta zarejestruj się tutaj" setFormTypeHandler={props.changeFormHandler} formType={false}/>
    </div>
};

export default LoginFormContainer;