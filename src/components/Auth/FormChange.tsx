const FormChange: React.FC<{formChangeHandler: (type: boolean) => void, text: string, formType: boolean}> = (props) => {
    return <div className="form-change">
        <p onClick={() => {props.formChangeHandler(props.formType)}}>{props.text}</p>
    </div>
};

export default FormChange;