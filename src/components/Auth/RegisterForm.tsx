import { ChangeEvent, useState } from "react";
import { ErrorResponse } from "../../types/AuthTypes";
import { feedbackResult } from "../../types/RequestTypes";
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
    
    const sendRequest = useHttp<ErrorResponse>('api/createuser/', 'POST',
        {
            'email': emailValue,
            'name': nicknameValue,
            'password': password1Value
        }
    )

    // Submit form event, provide feedback into controller and render login form
    const onSubmitHandler = async () => {
        const {data, code} = await sendRequest();
        if (code === 201) {       
            props.setFeedbackHandler(dummy_text, 'success');
            props.setFormTypeHandler(true);
        }
        else if (code >= 500) {
            props.setFeedbackHandler('Server error! Try again later.','error')
        }
        else {
            const unkownError = 'Something went wrong... try again later.'
            const feedbackText = data.email ? data.email[0] : (data.name ? data.name[0] : (data.password ? data.password[0] : unkownError));
            props.setFeedbackHandler(feedbackText, 'error')
        }
        console.log(data, code);
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