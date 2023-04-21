import LoginForm from "./LoginForm";
import FormTitle from "./FormTitle";
import FormChange from "./FormChange";
import { feedbackResult } from "../../utils/types";
import FormFeedback from "./FormFeedback";

const LoginFormContainer: React.FC<{changeFormHandler: (type: boolean) => void, setFeedbackHandler: (text: string, type: feedbackResult) => void, feedbackResult?: feedbackResult, feedbackText?: string}> = (props) => {

    return <div className="login-form-container">
        <FormTitle formTitle="SIGN IN"/>
        {props.feedbackResult && props.feedbackText && <FormFeedback result={props.feedbackResult} text={props.feedbackText}/>} 
        <LoginForm  setfeedbackHandler={props.setFeedbackHandler}/>
        <FormChange text="Do not have an account? Register here!" setFormTypeHandler={props.changeFormHandler} formType={false}/>
    </div>
};

export default LoginFormContainer;