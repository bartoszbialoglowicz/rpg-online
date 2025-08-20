import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { inputType } from "../../types/AuthTypes";

import './InputLabel.css';

type Props = {
    name: string, 
    type: inputType, 
    label: string, 
    isValid: boolean,
    errorMsg: string,
    onChange?: (value: string) => void,
    onBlur?: () => void
}

const InputLabel: React.FC<Props> = (props) => {
    const cssClass = !props.isValid ? "form-input-label invalid" : "form-input-label";

    const ref = useRef<HTMLInputElement>(null);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (props.onChange)
            props.onChange(ref.current!.value);
    }

    const onBlurHandler = () => {
        if (props.onBlur)
            props.onBlur();
    };

    const errorMsgs = props.errorMsg.split('**').map((el, index) => <p key={index}>{el}</p>);

    return <div className={cssClass}>
        <label htmlFor={props.name}>{[props.label]}</label>
        <input type={props.type} name={props.name} onChange={onChangeHandler} onBlur={onBlurHandler} autoComplete="true" ref={ref} />
        {!props.isValid && <div className="form-input-label-error">{errorMsgs}</div>}
    </div>
};

export default InputLabel;