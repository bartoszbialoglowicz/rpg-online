import React from "react"
import { feedbackResult } from "../../utils/types"

const FormFeedback: React.FC<{result: feedbackResult, text: string}>= (props) => {
    return <div className={`form-feedback ${props.result}`}>
        {props.text}
    </div>
};

export default FormFeedback;