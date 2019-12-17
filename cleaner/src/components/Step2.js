import React from 'react';

const Step2 = function(props) {
    if (props.currentStep !== 2) { 
        return null; 
    }

    const renderRadio = props.options.map((option, i) => {
        return <p key={i}><input type="radio" name="radio" id="radio"  value={option.text} onClick={props.handleClick}/>{option.text}</p>
        });

    return (
        <div className="form-group">
            <h2>{props.title}</h2>
            { renderRadio }
        </div>
    );
}

export default Step2;