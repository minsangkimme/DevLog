# 호텔 앱 (Console)

## 요구사항

- [ ] 순수 JavaScript 사용
- [ ] 구현 방법에 대한 문법은 자유롭게
- [ ] `checkIn('이름')` 문자열의 성함을 받는다
  - [ ] 잘못된 값, 빈값에 대한 검증을 진행한다.
  - [ ] 검증에 대한 오류를 제공해준다.
- [ ] `getStatus()` 호출시 현재까지 체크인한 고객들의 이름 문자열로 반환한다.
  - [ ] 고객이 아무도 없을때 없다는 문자열을 반환한다.
- [ ] `checkOut('이름')` 문자열의 성함을 받는다
  - [ ] 잘못된 값이나 빈값에 대한 검증을 진행한다.
  - [ ] 검증에 대한 오류를 제공해준다.

```js
console.log(Hotel.checkIn('이름')); // 안녕하세요. 이름님 반갑습니다
console.log(Hotel.checkIn('이름2')); // 안녕하세요. 이름2님 반갑습니다
console.log(Hotel.checkIn('이름3')); // 안녕하세요. 이름3님 반갑습니다
console.log(Hotel.getStatus()); // 이름님, 이름2님, 이름3님이 체크인했습니다.
console.log(Hotel.checkOut('이름')); // 이름님 감사합니다. 안녕히 가세요
console.log(Hotel.getStatus()); // 이름2님, 이름3님이 체크인했습니다.
```

## Bonus 요구사항

- [ ] 중복 이름에 대한 체크
