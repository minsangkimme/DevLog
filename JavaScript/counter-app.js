const Counter = {
  // 카운트
  cnt: 0,

  // 카운트 상태확인
  getCount: function() {
    return this.cnt;
  },

  // 카운트 증가
  increment: function(number) {
    const empty = number === '' ? false : null;

    if (typeof number === 'number') {
      for (let i = 1; i <= number; i++) {
        this.cnt++;
      }

      return this.getCount();
    }

    if (number === undefined || empty) {
      return ++this.cnt;
    }

    return `${number} 는 잘못된 값입니다.`;
  },

  // 카운트 감소
  decrement: function(number) {
    const empty = number === '' ? false : null;

    if (typeof number === 'number') {
      for (let i = 1; i <= number; i++) {
        this.cnt--;
      }

      return this.getCount();
    }
    if (number === undefined || empty) {
      return --this.cnt;
    }

    return `${number} 는 잘못된 값입니다.`;
  },
};

console.log('----테스트 코드---');
console.log('상태:', Counter.getCount());
console.log('증가:', Counter.increment());
console.log('증가:', Counter.increment());
console.log('증가:', Counter.increment(10));
console.log('상태:', Counter.getCount());
console.log('감소:', Counter.decrement());
console.log('감소:', Counter.decrement());
console.log('감소:', Counter.decrement(3));
console.log('상태:', Counter.getCount());
console.log('증가:', Counter.increment('test'));
console.log('감소:', Counter.decrement('test'));
