import { feedbackResult } from "../../utils/types";
import FormChange from "./FormChange";
import FormFeedback from "./FormFeedback";
import FormTitle from "./FormTitle"
import RegisterForm from "./RegisterForm"

const RegisterFormContainer: React.FC<{setFormTypeHandler: (type: boolean) => void, setFeedbackHandler: (text:string, type:feedbackResult)=>void, feedbackText?: string, feedbackResult?: feedbackResult}> = (props) => {
    return <div className="form-container">
        <FormTitle formTitle="SIGN UP" />
        <RegisterForm setFeedbackHandler={props.setFeedbackHandler} setFormTypeHandler={props.setFormTypeHandler}/>
        { props.feedbackResult && props.feedbackText && <FormFeedback text={props.feedbackText} result={props.feedbackResult}/>}
        <FormChange setFormTypeHandler={props.setFormTypeHandler} text="Already have an account? Sign in here!" formType={true}/>
    </div>
};

export default RegisterFormContainer;