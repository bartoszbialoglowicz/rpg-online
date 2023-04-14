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
        this.inputs.forEach((input: Input) => {
            input.validate();
            if (!input.isValid) {
                this.isValid = false;
                return;
            }
        });
        this.isValid = true;
    };

    private validateAndSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (this.isValid) {
            this.onSubmit();
        } else {
            console.log("bad");
        }
    }

    public render = () => {
        const inputs = this.inputs.map((el: Input) => el.getJSXElement());
        return <form onSubmit={this.validateAndSubmit}>
            {inputs}
            <SubmitInput text={this.submitText}/>
        </form>
    }
};

export default Form;