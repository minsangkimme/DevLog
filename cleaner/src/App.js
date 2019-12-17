import React, { useState } from 'react';
import data from './assets/input';
import logo from '../public/bg.png';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import './style.css';


const App =  () => {
   const [currentStep, setCurrentStep] = useState(1);
   const [output, setOutput] = useState([]);
   const [id, setId] = useState(1);
   const [text, setText] = useState('');
   const [answer, setAnswer] = useState([]);

   const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit!!');
    console.log(`
    {
        "id": ${data.formId},
        "items": ${JSON.stringify(output)}        
   }`
   )
}
   const _prev = () => {
    currentStep <= 1 ?  setCurrentStep(currentStep):  setCurrentStep(currentStep - 1);    
   }

   const _next = () => {       
    if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
        currentStep === 3 ? answer.push(text) : null; // step3 들어간 코드        
        output.push({id: currentStep, answer: answer.join(', ')});
        setAnswer([]);
        console.log('output', output);
    } 
   }
// TODO 이전버튼은 저장된 배열에서 값을 꺼내서 input 태그 벨류에 넣기
   const prevBtn = () => {  
       if(currentStep !== 1) {
           return (
            <button type="button" id="prevBtn" onClick={_prev}>&lt; 이전으로</button>
           );
       }
       return null;
   }

   const nextBtn = () => {
    if(currentStep < 4) {
        return (
            <button type="button" id="nextBtn" onClick={_next}>다음으로 &gt;</button>
        );
    }     
    return null;
   }

   const  handleClick = (e) => {
    e.target.parentNode.classList.toggle('active');        
    const isTargetIndex = answer.indexOf(e.target.value);
    if (currentStep === 4) {
        console.log(e.target.value);

    }

    if (isTargetIndex === -1) {
        answer.push(e.target.value); 
    } 
    if (isTargetIndex > -1) {
        answer.splice(isTargetIndex, 1);
    }
    console.dir(answer);
   }

   const handleChange = (e) => {
        setText(e.target.value);
   }

    return (
        <div>
                 <img src={logo}></img>                
                <h1>{data.title}</h1>
                <form id='regForm' action="" onSubmit={handleSubmit}>
                        <Step1
                            currentStep={currentStep}
                            options={data.items[0].options}
                            title={data.items[0].title}
                            handleClick={handleClick}
                        />

                        <Step2 
                            currentStep={currentStep}
                            options={data.items[1].options}
                            title={data.items[1].title}
                            handleClick={handleClick}
                        />

                        <Step3 
                          currentStep={currentStep}
                          options={data.items[2].options}
                          title={data.items[2].title}
                          handleChange={handleChange}
                        />

                        <Step4 
                          currentStep={currentStep}
                          options={data.items[3].options}
                          title={data.items[3].title}
                          handleClick={handleClick}
                        />
                    <div>
                        <div className="btn">
                            {prevBtn()}
                            {nextBtn()}
                        </div>
                    </div>                   
             </form>
        </div>
    )
}

export default App;