import { ChangeEvent } from "react";
import { inputType } from "../utils/types";
import InputLabel from "../components/Auth/InputLabel";
import { AppSettings } from "../utils/settings";

class Input {
    label: string;
    type: inputType;
    name: string;
    value: string;
    isValid: boolean;
    defaultValidator: () => boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

    private setValidator = () => {
        if (this.type === 'email') {
            return () => AppSettings.EMAIL_REGEX.test(this.value);
        }
        else if (this.type === 'password') {
            return () => AppSettings.PASSWORD_REGEX.test(this.value);
        }
        return () => AppSettings.NICKNAME_REGEX.test(this.value);
    }

    constructor(label: string, type: inputType, name: string, value: string, isValid: boolean, onChange: (event: ChangeEvent<HTMLInputElement>) => void) {
        this.label = label;
        this.type = type;
        this.name = name;
        this.isValid = isValid;
        this.value = value ? value : '';
        this.onChange = onChange;
        this.defaultValidator = this.setValidator();
    }

    public getJSXElement = (id: number) => {
        return <InputLabel key={id} label={this.label} type={this.type} name={this.name} value={this.value} onChange={this.onChange} />
    }
    
    public validate = (fn?: ()=> boolean) => {
        this.isValid = fn ? fn() : this.defaultValidator();
    }
};

export default Input;