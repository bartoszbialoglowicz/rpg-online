import { ChangeEvent, useState } from "react";
import { inputType } from "../../utils/types";

import './InputLabel.css';

const InputLabel: React.FC<{name: string, type: inputType, label: string, value?: string, onChange: (event: ChangeEvent<HTMLInputElement>) => void, isValid: boolean}> = (props) => {
    const [isTouched, setIsTouched] = useState(false);
    const cssClass = !isTouched ? "form-input-label" : (!props.isValid ? "form-input-label invalid" : "form-input-label");

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setIsTouched(true);
        props.onChange(event);
    }

    return <div className={cssClass}>
        <label htmlFor={props.name}>{[props.label]}</label>
        <input type={props.type} name={props.name} value={props.value} onChange={onChangeHandler} autoComplete="true"/>
    </div>
};

export default InputLabel;