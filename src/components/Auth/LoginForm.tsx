import { useHttp } from "../../hooks/use-http";
import SubmitInput from "../UI/SubmitInput";
import InputLabel from "./InputLabel";

const LoginForm = () => {
    const loginHandler = () => {
        sendRequest();
    }
    const sendRequest = useHttp('api/token/', 'POST');

    return <div className="login-form">
        <form onSubmit={loginHandler}>
            <InputLabel type="text" label="E-mail address" name="email" />
            <InputLabel type="password" label="Password" name="password" />
            <SubmitInput text="SIGN IN" />
        </form>
    </div>
};

export default LoginForm;