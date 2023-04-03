type inputType = 'email' | 'text' | 'password';

const InputLabel: React.FC<{name: string, type: inputType, label: string}> = (props) => {
    return <div className="form-input-label">
        <label htmlFor={props.name}>{[props.label]}</label>
        <input type={props.type} name={props.name}/>
    </div>
};

export default InputLabel;