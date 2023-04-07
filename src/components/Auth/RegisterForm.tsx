import { FormEvent } from "react";
import { feedbackResult } from "../../utils/types";
import SubmitInput from "../UI/SubmitInput";
import InputLabel from "./InputLabel";

const RegisterForm: React.FC<{setFeedbackHandler: (text:string, type:feedbackResult)=>void, setFormTypeHandler: (type: boolean)=> void}> = (props) => {
    const dummy_text = 'You have successfully registered your account! You can sign in now.'

    // Submit form event, provide feedback into controller and render login form
    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        props.setFeedbackHandler(dummy_text, 'success');
        props.setFormTypeHandler(true);
    }

    return <div className="register-form">
        <form onSubmit={onSubmitHandler}>
            <InputLabel label="E-mail address" type="email" name="email" />
            <InputLabel label="Password" type="password" name="password1" />
            <InputLabel label="Repeat password" type="password" name="password2" />
            <SubmitInput text="SIGN UP!"/>
        </form>
    </div>
};
export default RegisterForm;