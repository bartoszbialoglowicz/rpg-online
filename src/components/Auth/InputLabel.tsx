import { ChangeEvent } from "react";
import { inputType } from "../../utils/types";

const InputLabel: React.FC<{name: string, type: inputType, label: string, value?: string, onChange?: (event: ChangeEvent<HTMLInputElement>) => void}> = (props) => {
    return <div className="form-input-label">
        <label htmlFor={props.name}>{[props.label]}</label>
        <input type={props.type} name={props.name} value={props.value} onChange={props.onChange}/>
    </div>
};

export default InputLabel;