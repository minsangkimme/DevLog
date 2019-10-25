const buttonEl = document.querySelectorAll('button');
const imgEl = document.querySelectorAll('img');
const result = {
    taste: '',
    temp: ''
};

window.onload = () => {
    init();
  };

const init = () => {
    // add click event
        buttonEl.forEach((button, i) => {
            button.addEventListener('click', fishBread);            
        });

        imgEl.forEach((img, i) => {
            img.addEventListener('click', fishBread);            
        });
};

const fishBread = (e) => { 
    const burnControl = ['말랑말랑한', '바삭한', '아주 바삭한'];
    const menu = ['고구마', '말차고구마', '말차팥', '미니 타이야끼', 
    '팥 & 크림치즈', '팥 & 호두', '커스타드', '블루베리 & 크림치즈'];    
    const choiceTaste =  e.target.alt;
    const choiceContorl = e.target.innerText;
    const temp = burnControl.filter((data) => (data === choiceContorl  ? data : null));    
    const taste = menu.filter((data) => data === choiceTaste);

    if (temp.length !== 0) { 
        alert(`${temp}굽기를 선택하였습니다.`);
        result.temp = temp;    
    }     
    if (taste.length !== 0) {
        alert(`${taste}맛을 선택하였습니다.`);
        result.taste = taste;
     }
    if (result.temp.length && result.taste.length !== 0) {
        alert('만드는 중..예상시간 : 3 초');
    
        setTimeout(() => {
            alert(`${result.temp} ${result.taste} 붕어빵 입니다.`); 
            return result.temp = '', result.taste = '';            
        }, 3000);
    }     
}