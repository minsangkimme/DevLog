#  Array Cardio Day 1

## 요구사항
Array의 여러가지(filter, map, reduce, sort, ...) 메소드를 활용해보자.

## 진행과정

```javascript
const inventors = [
        { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
        { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
        { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
        { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
        { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
        { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
        { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
        { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
        { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
        { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
        { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
        { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
      ];

      const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];
```

### 1. filter 활용하기 
filter 는 해당 조건이 true 면 조건에 맞게 필터링 하여 배열로 반환한다.
ES6 문법 화살표 함수를 이용하여 식별자 inventor 로 할당 후 'year'이 1500 이상 1600 미만의 값으로 조건을 걸어 보았습니다.
```javascript
 // Array.prototype.filter()
 // 1. Filter the list of inventors for those who were born in the 1500's
      const fifteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600));
```
![filter](/JavaScript30/04/filter.JPG)

### 2. map 활용하기
map은 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다. 해당배열과 동일한 배열의 길이로 반환합니다

inventors객체에 name을 fullName 으로 출력하기
```javascript
    // Array.prototype.map()
    // 2. Give us an array of the inventors' first and last names
      const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
      console.table(fullNames);
```
![map](/JavaScript30/04/map.JPG)

### 3.sort 활용하기
sort 메소드는 배열의 요소를 적절한 위치에 정렬한 후 그 배열을 반환합니다.

inventors객체에 year키의 value를 비교하여 양수면 바뀌지 않고 음수면 바뀝니다. 오름차순으로 정렬되는 결과를 얻을 수 있습니다.

```javascript
    // Array.prototype.sort()
    // 3. Sort the inventors by birthdate, oldest to youngest
      const orderd = inventors.sort((a, b) => (a.year > b.year ? 1 : -1));
      console.table(orderd);            
```

![sort](/JavaScript30/04/sort.JPG)



### 4. reduce 활용하기
메소드는 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.

리듀서 함수의 반환 값은 누산기에 할당되고, 누산기는 순회 중 유지되므로 결국 최종 결과는 하나의 값이 됩니다.

total은 누산기 역할 입니다

inventor은  처리할 현재 요소 입니다.

inventors객체에 passed 에서 year 의 값을 뺀 결과를 얻을 수 있습니다.

  ###### ~~(개인적으로 어떻게 활용해야할지 어려운 메소드 더 공부해야 겠다)~~.
```javascript
    // Array.prototype.reduce()
    // 4. How many years did all the inventors live?
      const totalYears = inventors.reduce((total, inventor) => {
        return total + (inventor.passed - inventor.year);
      }, 0);
```
![reduce](/JavaScript30/04/reduce.JPG)

### 5. sort 응용하기 1
sort 메소드를 이용하여 수명이 긴 사람부터 적은순으로  정렬해 보았습니다.

passed - year 빼는데 비교를 하기위해 각각 변수에 할당하였습니다.
결과는 내림차순으로 얻을 수 있었습니다.

```javascript
    // Sort the inventors by years lived
      const oldest = inventors.sort((a, b) => {
        const lastGuy = a.passed - a.year;
        const nextGuy = b.passed - b.year;
        return lastGuy > nextGuy ? -1 : 1;
      });
      console.table(oldest);
```
![sort2](/JavaScript30/04/sort2.JPG)

### 6. 'querySelectAll' 반환값 으로 Array 메소드 활용하기
 예제 사이트에 접속한 후
.mw-category를 querySelector로 잡아서 category 변수에 할당 후 category에 'a' 태그를 querySelectAll로 잡아서 links 변수에 할당 하였습니다.
querySelectorAll의 반환 값은 NodeList로 떨어지기 때문에 배열이아니라 유사배열 입니다.그래서 Array의 메소드 활용에 제한이 있습니다. 

그렇기에 Array로 인식을 시켜주는 방법엔 여러가지 있지만 여기서는 Array.from으로 해보았습니다.(CanIuse에서 스펙 확인 후 지원브라우저에 맞게 사용해야함)

그 결과 querySelectAll을 사용하여 Array의 메소드를 활용할 수 있었습니다.

결과는 category의 a 태그에서 map을 이용하여 text를 뽑아냈고 그 결과에 filter를 이용하여 includes메소드로 'de' 요소가 포함된 문자열만 출력 되었습니다.

```javascript
  // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
       const category = document.querySelector('.mw-category');
       const links = Array.from(category.querySelectorAll('a'));

       const de = links.map(link => link.textContent).filter(streetName => streetName.includes('de'));
```
![querySelectorAll](/JavaScript30/04/querySelectorAll.JPG)
![querySelectorAll2](/JavaScript30/04/querySelectorAll2.JPG)

### 7. sort 응용하기 2
'성' 을 알파벳 순으로 정렬해보았습니다.
split()메서드를 사용한 이유는 ', 'comma와 space 구분으로 이루어져 있어서 그 기준으로 배열로 담아냈습니다.

결과 알파벳 순위가 앞부터 뒷순으로 오름차순으로 정렬한 결과를 얻을 수 있었습니다.

```javascript
    // Sort the people alphabetically by last name
      const alpha = people.sort((lastOne, nextOne) => {
         const [aLast, aFirst] = lastOne.split(', ');
         const [bLast, bFirst] = nextOne.split(', ');
         return aLast > bLast ? 1 : -1;
      });
    console.table(alpha);
```
![sort3](/JavaScript30/04/sort3.JPG)
![sort4](/JavaScript30/04/sort4.JPG)

### 8. reduce 응용하기 1

data라는 배열에는 여러가지 종류의 중복되는 데이터들이 존재하는데 그것을 reduce 메소드로 초기화값을 객체로 설정하여 해당 데이터가 들어오면 그 값을 증가시켜 보았습니다.

코드가 어떻게 돌아가는지 눈으로 확인하기 위하여 log를 찍는 코드를 포함해서 작성하였습니다.





```javascript
// Sum up the instances of each of these
      const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

      const transportation = data.reduce((obj, item) => {
        console.log('-----');
        console.log('obj', obj);
        console.log('item', item);
        console.log('obj[item]', obj[item]);
        if (!obj[item]) {
          obj[item] = 0;
        }
        obj[item]++;
        console.log('obj', obj);
        return obj;
      }, {})

      console.log(transportation);
```

![reduce2](/JavaScript30/04/reduce2.JPG)

초기화값이 {} 이기때문에 obj가 {}로 시작을 하고 처리할 현재요소는 data의 0번째 인덱스의 car 입니다.

obj[item]에 즉 obj객체에 car라는 key가 없기때문에 if문 조건에 맞게 실행되어 key의 value를 0으로 셋팅한뒤에 그 value값을 증가시킵니다. 

이런식으로 obj 객체에 해당 item 즉key 가 없으면 key를 생성하면서 0으로 셋팅 후 카운팅을 하게 됩니다.

결과는
![reduce3](/JavaScript30/04/reduce3.JPG)

## 찾아본 내용

*[includes](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)*

    includes() 메서드는 배열이 특정 요소를 포함하고 있는지 판별합니다.


*[reduce](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)*


    reduce() 메서드는 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.

    리듀서 함수는 네 개의 인자를 가집니다.

    누산기accumulator (acc)
    현재 값 (cur)
    현재 인덱스 (idx)
    원본 배열 (src)

    리듀서 함수의 반환 값은 누산기에 할당되고, 누산기는 순회 중 유지되므로 결국 최종 결과는 하나의 값이 됩니다.