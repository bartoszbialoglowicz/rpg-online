import SubmitInput from "../UI/SubmitInput";
import InputLabel from "./InputLabel";

const LoginForm = () => {
    return <div className="login-form">
        <form>
            <InputLabel type="text" label="E-mail address" name="email" />
            <InputLabel type="password" label="Password" name="password" />
            <SubmitInput text="SIGN IN" />
        </form>
    </div>
};

export default LoginForm;