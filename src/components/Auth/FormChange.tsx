const FormChange: React.FC<{setFormTypeHandler: (type: boolean) => void, text: string, formType: boolean}> = (props) => {
    return <div className="form-change">
        <p onClick={() => {props.setFormTypeHandler(props.formType)}}>{props.text}</p>
    </div>
};

export default FormChange;