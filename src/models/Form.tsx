import { FormEvent } from "react";
import Input from "./Input";
import SubmitInput from "../components/UI/SubmitInput";

class Form {
    isValid: boolean;
    inputs: Input[];
    submitText: string;
    alwaysValid: boolean;
    onSubmit: () => void;

    constructor(inputs: Input[], submitText: string, onSubmit: () => void, alwaysValid: boolean) {
        this.alwaysValid = alwaysValid;
        this.isValid = alwaysValid ? true : false;
        this.submitText = submitText;
        this.onSubmit = onSubmit;
        this.inputs = inputs;
    };

    public validate = () => {
        this.isValid = true;
        this.inputs.forEach((input: Input) => {
            input.validate();
            if (!input.isValid) {
                this.isValid = false;
                return;
            }
        });
    };

    private validateAndSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!this.alwaysValid) {
            this.validate();
        }
        if (this.isValid) {
            this.onSubmit();
        }
    }

    public render = () => {
        const inputs = this.inputs.map((el: Input, index: number) => el.getJSXElement(index));
        return <form onSubmit={this.validateAndSubmit}>
            {inputs}
            <SubmitInput text={this.submitText}/>
        </form>
    }
};

export default Form;