import FormChange from "./FormChange";
import FormTitle from "./FormTitle"
import RegisterForm from "./RegisterForm"

const RegisterFormContainer: React.FC<{changeFormHandler: (type: boolean) => void}> = (props) => {
    return <div className="register-form-container">
        <FormTitle formTitle="SIGN UP" />
        <RegisterForm />
        <FormChange formChangeHandler={props.changeFormHandler} text="Already have an account? Sign in here!" formType={true}/>
    </div>
};

export default RegisterFormContainer;