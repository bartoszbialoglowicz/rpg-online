const FormTitle: React.FC<{formTitle: string}> = (props) => {
    return <div className="form-title">
        <h1>{props.formTitle}</h1>
    </div>
};

export default FormTitle;