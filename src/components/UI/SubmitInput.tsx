import React from "react"

import './SubmitInput.css';

const SubmitInput: React.FC<{text: string}> = (props) => {
    return <div className="submit-input-container">
        <input type="submit" value={props.text}/>
    </div>
};

export default SubmitInput;