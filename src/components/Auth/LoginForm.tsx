import { ChangeEvent, FormEvent, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import SubmitInput from "../UI/SubmitInput";
import InputLabel from "./InputLabel";

const LoginForm = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const sendRequest = useHttp(
        'api/token/', 
        'POST', 
        {'email': emailValue, 'password': passwordValue}
    );

    const loginHandler = (event: FormEvent) => {
        event.preventDefault();
        sendRequest();
    }

    const getEmailInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(event.target.value);
    };
    const getPasswordInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(event.target.value);
    };

    return <div className="login-form">
        <form onSubmit={loginHandler}>
            <InputLabel type="text" label="E-mail address" name="email" value={emailValue} onChange={getEmailInputValue}/>
            <InputLabel type="password" label="Password" name="password" value={passwordValue} onChange={getPasswordInputValue}/>
            <SubmitInput text="SIGN IN" />
        </form>
    </div>
};

export default LoginForm;