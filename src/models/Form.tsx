import { FormEvent } from "react";
import Input from "./Input";
import SubmitInput from "../components/UI/SubmitInput";

class Form {
    isValid: boolean;
    inputs: Input[];
    submitText: string;
    onSubmit: () => void;

    constructor(inputs: Input[], submitText: string, onSubmit: () => void) {
        this.isValid = false;
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
        this.validate();

        if (this.isValid) {
            console.log('ok');
            this.onSubmit();
        } else {
            this.inputs.forEach((el: Input) => console.log(el.isValid));
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