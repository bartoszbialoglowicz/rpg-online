import { ChangeEvent, useContext, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import Form from "../../models/Form";
import Input from "../../models/Input";
import { authContextObject, feedbackResult, loginResponse } from "../../utils/types";
import { UserContext } from "../../store/user-context";
import User from "../../models/User";

const LoginForm: React.FC<{setfeedbackHandler: (text: string, type: feedbackResult) => void }> = (props) => {

    const userCtx = useContext(UserContext);

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const getEmailInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(event.target.value);
    };
    const getPasswordInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(event.target.value);
    };

    const emailInput = new Input("E-mail address", "email", "email", emailValue, false, getEmailInputValue);
    const passwordInput = new Input("Passoword", "password", "password", passwordValue, false, getPasswordInputValue);

    const sendRequest = useHttp<loginResponse>(
        'api/token/', 
        'POST', 
        {'email': emailValue, 'password': passwordValue}
    );

    const loginHandler = async () => {
        const {data, code} = await sendRequest();
        if (code === 200) {
            props.setfeedbackHandler("Zalogowano", "success");
            //console.log(data);
            userCtx.login(new User(data.id, data.user, data.email, data.token));
        }
        else {
            console.log(data);
            props.setfeedbackHandler("Incorrect credentials", "error");
        }
    }

    const form = new Form([emailInput, passwordInput], "SIGN IN!", loginHandler, true);


    return <div className="login-form">
        {form.render()}
    </div>
};

export default LoginForm;