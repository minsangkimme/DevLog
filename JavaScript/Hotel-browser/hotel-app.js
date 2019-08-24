const chkInForm = document.querySelector('.js-CheckInForm');
const chkOutForm = document.querySelector('.js-CheckOutForm');
const chkIn = chkInForm.querySelector('.js-CheckIn');
const chkOut = chkOutForm.querySelector('.js-CheckOut');
const button = document.querySelectorAll('button');

// 고객 리스트
let _name = [];

// 체크인
function checkIn(name) {
  if (_name.indexOf(name) > -1)
    return alert(`${name}님은 이미 체크인 상태입니다.`);

  const valueCheck =
    typeof name === 'string' && name.length > 0 ? _name.push(name) : false;

  if (!valueCheck) return alert('ERROR: Type Or Length Error');

  return alert(`안녕하세요. ${_name[valueCheck - 1]}님 반갑습니다`);
}

// 체크아웃
function checkOut(name) {
  if (_name.indexOf(name) === -1) return alert('없는 고객입니다.');

  let guest = []; // this._name 복제용도
  const valueCheck =
    typeof name === 'string' && name.length > 0 ? _name.indexOf(name) : false;

  guest = _name.slice();
  _name.splice(valueCheck, 1);

  if (valueCheck > -1)
    return alert(`${guest[valueCheck]}님 감사합니다. 안녕히 가세요`);
  if (!valueCheck) return alert('ERROR: Type Or Length Error');
}

// 고객 상태체크
function getStatus() {
  const status =
    _name.length > 0 ? `${_name}님이 체크인했습니다.` : '고객이 없습니다';
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
  button.forEach(btn => btn.addEventListener('click', handleSubmit));
  chkInForm.addEventListener('submit', handleSubmit);
  chkOutForm.addEventListener('submit', handleSubmit);
}

init();
