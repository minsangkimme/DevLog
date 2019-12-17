import React from 'react';

const Step1 = function(props) {
    if (props.currentStep !== 1) { 
        return null; 
    }
       
    const renderCheckBox = props.options.map((option, i) => {
    return <p key={i}><input type="checkbox" name="checkbox" id="checkbox" onClick={props.handleClick} value={option.text}/>{option.text}</p>
    });

    return (
        <div className="form-group">
            <h2>{ props.title }</h2>
            { renderCheckBox }
        </div>
    );
}

export default Step1;