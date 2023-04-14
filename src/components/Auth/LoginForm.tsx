import { ChangeEvent, FormEvent, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import SubmitInput from "../UI/SubmitInput";
import InputLabel from "./InputLabel";
import Form from "../../models/Form";
import Input from "../../models/Input";

const LoginForm = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const sendRequest = useHttp(
        'api/token/', 
        'POST', 
        {'email': emailValue, 'password': passwordValue}
    );

    const loginHandler = () => {
        sendRequest();
    }

    const getEmailInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(event.target.value);
    };
    const getPasswordInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(event.target.value);
    };

    const form = new Form([
        new Input("E-mail address", "email", "email", emailValue, false, getEmailInputValue),
        new Input("Passoword", "password", "password", passwordValue, false, getPasswordInputValue)
    ], "SIGN IN!", loginHandler);

    return <div className="login-form">
        {form.render()}
    </div>
};

export default LoginForm;