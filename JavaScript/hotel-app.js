// 고객 리스트
const hotel = {
  guest: [],
};

// 체크인
function CheckIn(name) {
  const guestIndex = hotel.guest.indexOf(name);
  this.name = name;
  this.msg = guestIndex > -1 ? `${name}님은 이미 체크인 상태입니다.` : `안녕하세요. ${name}님 반갑습니다`;

  if (name && typeof name === 'string') {
    if (guestIndex === -1) {
      hotel.guest.push(name);
    }
  } else {
    throw Error('Type or Length Error');
  }
}

// 체크아웃
function CheckOut(name) {
  const guestIndex = hotel.guest.indexOf(name);
  this.name = name;
  this.msg = guestIndex === -1 ? `${name} 님은 없는 고객입니다.` : `${name}님 감사합니다. 안녕히 가세요`;

  if (name && typeof name === 'string') {
    if (guestIndex > -1) {
      hotel.guest.splice(guestIndex, 1);
    }
  } else {
    throw Error('Type or Length Error');
  }
}

// 고객 상태체크
function getStatus() {
  const status = hotel.guest.length > 0 ? `${hotel.guest}님이 체크인 상태입니다.` : '고객이 없습니다';
  return status;
}

var person = new CheckIn('민상'); // CheckIn {name: "민상", msg: "안녕하세요. 민상님 반갑습니다"}
var person = new CheckIn('민상'); // CheckIn {name: "민상", msg: "민상님은 이미 체크인 상태입니다."}
var person = new CheckOut('개미'); // CheckOut {name: "개미", msg: "개미 님은 없는 고객입니다."}
var person = new CheckOut('민상'); // CheckOut {name: "민상", msg: "민상님 감사합니다. 안녕히 가세요"}
getStatus();
