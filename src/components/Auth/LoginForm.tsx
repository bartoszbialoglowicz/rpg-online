import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { feedbackResult } from "../../types/RequestTypes";
import { LoginResponse } from "../../types/AuthTypes";
import { UserContext } from "../../store/user-context";
import User from "../../models/User";

import './LoginForm.css';
import InputLabel from "./InputLabel";
import { AppSettings } from "../../utils/settings";
import SubmitInput from "../UI/SubmitInput";

const LoginForm: React.FC<{setfeedbackHandler: (text: string, type: feedbackResult) => void }> = (props) => {

    const userCtx = useContext(UserContext);

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    
    const sendRequest = useHttp<LoginResponse>(
        'api/token/', 
        'POST', 
        {'email': emailValue, 'password': passwordValue}
    );

    const setEmailValueHandler = (value: string) => {
        setEmailValue(value);
    };

    const setPasswordValueHandler = (value: string) => {
        setPasswordValue(value);
    };

    const validateEmailField = () => {
        setEmailValid(AppSettings.EMAIL_REGEX.test(emailValue));
    };

    const loginHandler = async () => {
        setIsLoading(true);
        props.setfeedbackHandler('', 'success')
        try {
            const {data, code} = await sendRequest();
            if (code === 200) {
                props.setfeedbackHandler("Zalogowano", "success");
                userCtx.login(new User(data.id, data.user, data.email, data.token));
            }
            else {
                console.log(data);
                props.setfeedbackHandler("Niepoprawne dane logowania", "error");
            }
        } catch (error: any) {
            props.setfeedbackHandler("Awaria serwera!", "error");
        }
        setIsLoading(false);
    }

    const onFormSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        if (emailValue.trim() === "" || passwordValue.trim() === "")
            props.setfeedbackHandler("Wypełnij wszystkie pola.", "error")
        else if (!emailValid)
            props.setfeedbackHandler("Wprowadź poprawny adres email.", 'error')
        else
            loginHandler();
    } 

    return <div className="login-form">
        <form onSubmit={onFormSubmitHandler}>
            <InputLabel label="E-mail" type="email" name="e-mail" isValid={emailValid} onChange={setEmailValueHandler} onBlur={validateEmailField} errorMsg="Wprowadź poprawny adres email."/>
            <InputLabel label="Hasło" type="password" name="password" isValid={true} onChange={setPasswordValueHandler} errorMsg=""/>
            <SubmitInput text="ZAGRAJ"/>
            {isLoading && "CZEKAĆ"}
        </form>
    </div>
};

export default LoginForm;