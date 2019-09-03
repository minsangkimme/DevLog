const chkInForm = document.querySelector('.js-CheckInForm');
const chkOutForm = document.querySelector('.js-CheckOutForm');
const chkIn = chkInForm.querySelector('.js-CheckIn');
const chkOut = chkOutForm.querySelector('.js-CheckOut');
const button = document.querySelectorAll('button');

// 고객 리스트
let guest = [];

// 체크인
function checkIn(name) {
  const alreadyCheckIn = guest.indexOf(name) > -1;

  if (alreadyCheckIn) {
    return alert(`${name}님은 이미 체크인 상태입니다.`)
  }

  const checkValue = name && typeof name === 'string' ? guest.push(name) : false;

  if (!checkValue) throw Error('Type or Length Error');

  return alert(`안녕하세요. ${guest[checkValue - 1]}님 반갑습니다`);
}

// 체크아웃
function checkOut(name) {
  const notFoundGuest = guest.indexOf(name) === -1;

    if (notFoundGuest) {
      return alert('없는 고객입니다.');
    }

    let copyGuest = []; // guest 복제용도
    const checkValue = name && typeof name === 'string' ? guest.indexOf(name) : false;

    copyGuest = guest.slice();
    guest.splice(checkValue, 1);

    if (checkValue > -1) {
      return alert(`${copyGuest[checkValue]}님 감사합니다. 안녕히 가세요`);
    }
    if (!checkValue) throw Error('Type or Length Error');
}

// 고객 상태체크
function getStatus() {
  const status = guest.length > 0 ? `${guest}님이 체크인했습니다.` : '고객이 없습니다';
  return alert(status);
}

// submit 컨트롤러
function handleSubmit(event) {
  event.preventDefault();

  // if checkIn Form 이면 실행  else if CheckOut Form이면 실행
  if (this.classList.contains('js-CheckInForm')) {
    const currentInValue = chkIn.value;
    checkIn(currentInValue);
    chkIn.value = '';
  } else if (this.classList.contains('js-CheckOutForm')) {
    const currentOutValue = chkOut.value;
    checkOut(currentOutValue);
    chkOut.value = '';
  }
}

function init() {
  button.forEach((btn) => btn.addEventListener('click', handleSubmit));
  chkInForm.addEventListener('submit', handleSubmit);
  chkOutForm.addEventListener('submit', handleSubmit);
}

init();
