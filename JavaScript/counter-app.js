const counter = {
  // 카운트
  cnt: 0,
};
// 카운트 상태확인
function getCount() {
  return counter.cnt;
}

// 카운트 증가
function Increment(number) {
  // 매개변수 값 만큼 증가
  if (typeof number === 'number') {
    for (let i = 1; i <= number; i++) {
      counter.cnt++;
    }

    this.status = getCount();
  }

  // 기본 증가
  if (!number) {
    this.status = ++counter.cnt;
  }
}

// 카운트 감소
function Decrement(number) {
  // 매개변수 값 만큼 감소
  if (typeof number === 'number') {
    for (let i = 1; i <= number; i++) {
      counter.cnt--;
    }

    this.status = getCount();
  }

  // 기본 감소
  if (!number) {
    this.status = --counter.cnt;
  }
}

var count = new Increment(); // Increment {status: 1}
var count = new Increment(4); // Increment {status: 5}
var count = new Decrement(); // Decrement {status: 4}
var count = new Decrement(4); // Decrement {status: 0}

getCount(); //상태확인
