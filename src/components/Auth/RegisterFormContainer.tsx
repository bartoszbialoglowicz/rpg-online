import { feedbackResult } from "../../types/RequestTypes";
import FormChange from "./FormChange";
import FormFeedback from "./FormFeedback";
import FormTitle from "./FormTitle"
import RegisterForm from "./RegisterForm"

const RegisterFormContainer: React.FC<{setFormTypeHandler: (type: boolean) => void, setFeedbackHandler: (text:string, type:feedbackResult)=>void, feedbackText?: string, feedbackResult?: feedbackResult}> = (props) => {
    return <div className="form-container">
        <FormTitle formTitle="REJESTRACJA" />
        <RegisterForm setFeedbackHandler={props.setFeedbackHandler} setFormTypeHandler={props.setFormTypeHandler}/>
        { props.feedbackResult && props.feedbackText && <FormFeedback text={props.feedbackText} result={props.feedbackResult}/>}
        <FormChange setFormTypeHandler={props.setFormTypeHandler} text="Jeżeli masz już konto zaloguj się tutaj." formType={true}/>
    </div>
};

export default RegisterFormContainer;