import React from 'react';

const Step3 = function(props) {
    if (props.currentStep !== 3) { 
        return null; 
    }

    return (
        <div className="form-group">
            <h2>{props.title}</h2>
            <input type="text" name="text" placeholder="입력해주세요" onChange={props.handleChange}/>
        </div>
    );
}

export default Step3;