import { feedbackResult } from "../../utils/types";
import FormChange from "./FormChange";
import FormTitle from "./FormTitle"
import RegisterForm from "./RegisterForm"

const RegisterFormContainer: React.FC<{setFormTypeHandler: (type: boolean) => void, setFeedbackHandler: (text:string, type:feedbackResult)=>void}> = (props) => {
    return <div className="register-form-container">
        <FormTitle formTitle="SIGN UP" />
        <RegisterForm setFeedbackHandler={props.setFeedbackHandler} setFormTypeHandler={props.setFormTypeHandler}/>
        <FormChange setFormTypeHandler={props.setFormTypeHandler} text="Already have an account? Sign in here!" formType={true}/>
    </div>
};

export default RegisterFormContainer;