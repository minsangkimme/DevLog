# 카운터 앱 (Console)

## 요구사항

- [ ] 순수 JavaScript 사용
- [ ] 구현 방법에 대한 문법은 자유롭게
- [ ] 초기 누적된 값은 `0`
- [ ] `getCount()` 호출시 현재까지 누적된 값을 반환한다.
- [ ] `increment()` 호출시 현재까지 누적된 값을 1 증가시킨다.
- [ ] `decrement()` 호출시 현재까지 누적된 값을 1 감소시킨다.

```js
console.log(Counter.getCount()); // 0
Counter.increment();
Counter.increment();
console.log(Counter.getCount()); // 2
Counter.decrement();
console.log(Counter.getCount()); // 1
```

## Bonus 요구사항

- [ ] `increment()`와 `decrement()` 호출시 인자로 숫자를 넘기면 넘긴 숫자만큼 값이 증가한다.

#### 예

```js
console.log(Counter.getCount()); // 0
Counter.increment(5);
console.log(Counter.getCount()); // 5
Counter.decrement(2);
console.log(Counter.getCount()); // 3
```

## 결과

```JavaScript
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
```
