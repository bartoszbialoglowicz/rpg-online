import React from "react"
import type { feedbackResult } from "../../types/RequestTypes";

import './FormFeedback.css';

const FormFeedback: React.FC<{result: feedbackResult, text: string}>= (props) => {
    return <div className={`form-feedback form-feedback-${props.result}`}>
        {props.text}
    </div>
};

export default FormFeedback;