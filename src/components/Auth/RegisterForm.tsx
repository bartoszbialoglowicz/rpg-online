import { ChangeEvent, FormEvent, useState } from "react";
import { ErrorResponse } from "../../types/AuthTypes";
import { feedbackResult } from "../../types/RequestTypes";
import { useHttp } from "../../hooks/use-http";
import InputLabel from "./InputLabel";
import SubmitInput from "../UI/SubmitInput";
import { AppSettings } from "../../utils/settings";

const RegisterForm: React.FC<{setFeedbackHandler: (text:string, type:feedbackResult)=>void, setFormTypeHandler: (type: boolean)=> void}> = (props) => {

    const succesText = 'Pomyślnie zarejstrowano, możesz się zalogować';
    const emailErrorText = "Nieprawidłowy adres e-mail";
    const nicknameShortErrorText = "Nazwa użytkownika musi zawierać co najmniej 6 znaków";
    const nicknameLongErrorText = "Nazwa użytkownika musi zawierać maksymalnie 64 znaki";
    const passwordErrorText = 
        "Hasło musi zawierać:\n" +
        "**Przynajmniej 8 znaków\n" +
        "**Co najmniej jedną wielką i małą literę\n" +
        "**Co najmniej jedna cyfrę\n";
    const password2ErrorText = "Hasła nie są takie same";

    const [emailValue, setEmailValue] = useState('');
    const [nicknameValue, setNicknameValue] = useState('');
    const [password1Value, setPassword1Value] = useState('');
    const [password2Value, setPassword2Value] = useState('');
    const [nicknameErrorText, setNickNameErrorText] = useState(nicknameShortErrorText);

    const [emailValid, setEmailValid] = useState(true);
    const [nicknameValid, setNicknameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [password2Valid, setPassword2Valid] = useState(true);
    
    const sendRequest = useHttp<ErrorResponse>('api/createuser/', 'POST',
        {
            'email': emailValue,
            'name': nicknameValue,
            'password': password1Value
        }
    )

    // Submit form event, provide feedback into controller and render login form
    const sendRequestHandler = async () => {
        const {data, code} = await sendRequest();
        if (code === 201) {       
            props.setFeedbackHandler(succesText, 'success');
            props.setFormTypeHandler(true);
        }
        else if (code >= 500) {
            props.setFeedbackHandler('Błąd serwera.','error')
        }
        else {
            const unkownError = 'Nierozpoznany błąd. Spróbuj ponowanie za chwilę.'
            const feedbackText = data.email ? data.email[0] : (data.name ? data.name[0] : (data.password ? data.password[0] : unkownError));
            props.setFeedbackHandler(feedbackText, 'error')
        }
        console.log(data, code);
    }

    const setEmailValueHandler = (value: string) => {
        setEmailValue(value);
    }
    const validateEmailHandler = () => {
        setEmailValid(AppSettings.EMAIL_REGEX.test(emailValue));
    }
    const validateNicknameHandler = () => {
        setNicknameValid(true);
        if (!AppSettings.NICKNAME_REGEX.test(nicknameValue)) {
            setNicknameValid(false);
            if (nicknameValue.trim().length < 6)
                setNickNameErrorText(nicknameShortErrorText);
            else
                setNickNameErrorText(nicknameLongErrorText);
        }
    }
    const setNicknameValueHandler = (value: string) => {
        setNicknameValue(value);
    }
    const validatePasswordHandler = () => {
        setPasswordValid(AppSettings.PASSWORD_REGEX.test(password1Value));
        setPassword2Valid(password1Value === password2Value);
    }

    const setPasswordValueHandler = (value: string) => {
        setPassword1Value(value);
    }
    const validatePassword2Handler = () => {
        setPassword2Valid(password1Value === password2Value);
    }

    const setPassword2ValueHandler = (value: string) => {
        setPassword2Value(value);
        setPassword2Valid(value === password1Value);
    }

    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        props.setFeedbackHandler("", "success");
        if (emailValue.trim() === "" || nicknameValue.trim() === "" || password1Value.trim() === "" || password2Value.trim() === "")
            props.setFeedbackHandler("Wypełnij wszystkie pola", "error")
        else if (!emailValid || !nicknameValid || !passwordValid || !password2Valid)
            props.setFeedbackHandler("Sprawdź poprawność wszsytkich pól", "error")
        else 
            sendRequestHandler();
    };

    return <div className="register-form">
        <form onSubmit={onSubmitHandler}>
            <InputLabel name="email" type="email" label="Adres e-mail" isValid={emailValid} errorMsg={emailErrorText} onChange={setEmailValueHandler} onBlur={validateEmailHandler}/>
            <InputLabel name="nickname" type="text" label="Nazwa użytkownika" isValid={nicknameValid} errorMsg={nicknameErrorText} onChange={setNicknameValueHandler} onBlur={validateNicknameHandler}/>
            <InputLabel name="password" type="password" label="Hasło" isValid={passwordValid} errorMsg={passwordErrorText} onChange={setPasswordValueHandler} onBlur={validatePasswordHandler}/>
            <InputLabel name="password2" type="password" label="Powtórz hasło" isValid={password2Valid} errorMsg={password2ErrorText} onChange={setPassword2ValueHandler} onBlur={validatePassword2Handler}/>
            <SubmitInput text="REJESTRACJA" />
        </form>
    </div>
};
export default RegisterForm;