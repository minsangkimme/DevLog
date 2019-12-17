import React from 'react';

const Step4 = function(props) {
    if (props.currentStep !== 4) { 
        return null; 
    }
    console.log(props)

    const renderSelectBox = props.options.map((option, i) => {
        return <option key={i}>{option.text}</option>
    });

    return (
        <>
        <div className="form-group">
                <h2>{props.title}</h2>
                <select >{ renderSelectBox }</select>
        </div>
        <button type="submit"id="nextBtn">제출</button>
        </>
    );
}

export default Step4;