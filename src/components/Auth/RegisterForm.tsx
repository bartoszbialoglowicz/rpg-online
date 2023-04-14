import { ChangeEvent, FormEvent, useState } from "react";
import { feedbackResult } from "../../utils/types";
import SubmitInput from "../UI/SubmitInput";
import InputLabel from "./InputLabel";
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

    //const emailInput = new Input("E-mail address", "email", "email", emailValue, false, setEmailInputValue);
    //const nicknameInput = new Input("Nickname", "text", "nickname", nicknameValue, false, setNicknameInputValue);
    //const password1Input = new Input("Password", "password", "password1", password1Value, false, setPassword1InputValue); 
    //const password2Input = new Input("Repeat password", "password", "password2", password2Value, false, setPassword2InputValue)
    
    
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
    ], "SIGN UP!",onSubmitHandler);
    /*
    <form onSubmit={onSubmitHandler}>
            {emailInput.getJSXElement()}
            <InputLabel label="Nickname" type="text" name="nickname" value={nicknameValue} onChange={setNicknameInputValue}/>
            <InputLabel label="Password" type="password" name="password1" value={password1Value} onChange={setPassword1InputValue}/>
            <InputLabel label="Repeat password" type="password" name="password2" value={password2Value} onChange={setPassword2InputValue}/>
            <SubmitInput text="SIGN UP!"/>
        </form>
    */
    return <div className="register-form">
        {form.render()}
    </div>
};
export default RegisterForm;