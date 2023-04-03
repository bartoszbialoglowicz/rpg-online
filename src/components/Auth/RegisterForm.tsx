import InputLabel from "./InputLabel";

const RegisterForm = () => {
    return <div className="register-form">
        <InputLabel label="E-mail address" type="email" name="email" />
        <InputLabel label="Password" type="password" name="password1" />
        <InputLabel label="Repeat password" type="password" name="password2" /> 
    </div>
};
export default RegisterForm;