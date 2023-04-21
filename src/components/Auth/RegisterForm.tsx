import { ChangeEvent, useState } from "react";
import { feedbackResult } from "../../utils/types";
import { useHttp } from "../../hooks/use-http";
import Input from "../../models/Input";
import Form from "../../models/Form";

const RegisterForm: React.FC<{setFeedbackHandler: (text:string, type:feedbackResult)=>void, setFormTypeHandler: (type: boolean)=> void}> = (props) => {
    const dummy_text = 'You have successfully registered your account! You can sign in now.'
    const [emailValue, setEmailValue] = useState('');
    const [nicknameValue, setNicknameValue] = useState('');
    const [password1Value, setPassword1Value] = useState('');
    const [password2Value, setPassword2Value] = useState('');
    
    const setEmailInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(event.target.value);
    }
    const setNicknameInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setNicknameValue(event.target.value);
    }
    const setPassword1InputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword1Value(event.target.value);
    }
    const setPassword2InputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword2Value(event.target.value);
    }
    
    const sendRequest = useHttp(
        'api/createuser/', 
        'POST',
        {'email': 'dupa'})

    // Submit form event, provide feedback into controller and render login form
    const onSubmitHandler = () => {
        props.setFeedbackHandler(dummy_text, 'success');
        props.setFormTypeHandler(true);
    }

    const form = new Form([
        new Input("E-mail address", "email", "email", emailValue, false, setEmailInputValue),
        new Input("Nickname", "text", "nickname", nicknameValue, false, setNicknameInputValue),
        new Input("Password", "password", "password1", password1Value, false, setPassword1InputValue),
        new Input("Repeat password", "password", "password2", password2Value, false, setPassword2InputValue)
    ], "SIGN UP!",onSubmitHandler, false);

    return <div className="register-form">
        {form.render()}
    </div>
};
export default RegisterForm;