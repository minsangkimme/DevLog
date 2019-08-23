# CSS + JS Clock 정리

## 요구 사항

CSS 와 JavaScript를 이용하여 시,분,초 를 각각 동적으로 움직이게 구현한다.

기본 소스코드

```html
<div class="clock">
  <div class="clock-face">
    <div class="hand hour-hand"></div>
    <div class="hand min-hand"></div>
    <div class="hand second-hand"></div>
  </div>
</div>
```

```CSS
    html {
      background: #018DED url(http://unsplash.it/1500/1000?image=881&blur=5);
      background-size: cover;
      font-family: 'helvetica neue';
      text-align: center;
      font-size: 10px;
    }

    body {
      margin: 0;
      font-size: 2rem;
      display: flex;
      flex: 1;
      min-height: 100vh;
      align-items: center;
    }

    .clock {
      width: 30rem;
      height: 30rem;
      border: 20px solid white;
      border-radius: 50%;
      margin: 50px auto;
      position: relative;
      padding: 2rem;
      box-shadow:
        0 0 0 4px rgba(0,0,0,0.1),
        inset 0 0 0 3px #EFEFEF,
        inset 0 0 10px black,
        0 0 10px rgba(0,0,0,0.2);
    }

    .clock-face {
      position: relative;
      width: 100%;
      height: 100%;
      transform: translateY(-3px); /* account for the height of the clock hands */
    }

    .hand {
      width: 50%;
      height: 6px;
      background: black;
      position: absolute;
      top: 50%;
    }
```

## 처리과정 & 코드분석

1. setDate () 함수를 생성하고 setInterval을 이용하여 1000ms 초마다 실행함.

   ```JavaScript
    setInterval(setDate, 1000);
   ```

2. 'now' 변수에 현재 시간을 할당함.

   ```JavaScript
    const now = new Date();
   ```

3. now.getSeconds() 를 이용하여 초를 얻어 seconds 변수에 할당 하였고

   ```JavaScript
    const seconds = now.getSeconds();
   ```

4. secondsDegrees변수에 초를 움직일 때 마다의 각도를 계산하는 식을 작성하여 할당 함

   ```JavaScript
   const secondsDegrees = (seconds / 60) * 360 + 90;
   ```

   - 계산식은 60초로 현재 초를 나눴고 360을 곱해줬다 곱해준 이유는 360도에서 현재의 각도를 계산하기 위해서 + 90 을 한 이유는 css에서 transform: rotate(90deg); 으로 설정을 해서 각도를 맞추기 위해서 + 90 해서 180으로 맞춰줬다.

5. 동적으로 값을 변경하기 위해서 타겟을 잡은 후(secondHand 변수 선언) 이 변수에 style.transform = rotate()를 해 주었다. 동적으로 들어가는 값은 위에서 계산한 'secondsDegrees' 이다.

   ```JavaScript
   secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
   ```

6. 시간과 분도 같은 방식으로 작성함

## 결과

```JavaScript
  <script>
      const secondHand = document.querySelector('.second-hand');
      const minsHand = document.querySelector('.min-hand');
      const hourHand = document.querySelector('.hour-hand');

      function setDate() {
        const now = new Date();
        const seconds = now.getSeconds();
        const secondsDegrees = (seconds / 60) * 360 + 90;
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

        const mins = now.getMinutes();
        const minsDegrees = (mins / 60) * 360 + 90;
        minsHand.style.transform = `rotate(${minsDegrees}deg)`;

        const hour = now.getHours();
        const hourDegrees = (hour / 12) * 360 + 90;
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;

        console.log(hour, mins, seconds);
      }

      setInterval(setDate, 1000);
    </script>
```

![결과](/JavaScript30/02/clock.JPG)

## 찾아본 내용

### _transform-origin_

    변형 된 요소의 위치를 변경할 수 있고 2D변형은 요소의 x축과 y축을 변경할 수 있습니다. 3D 변형은 요소의 z축을 변경할 수도 있습니다.

### _transform_

    transform 속성을 사용함으로써, CSS의 시각적 서식 모델(visual formatting model)의 좌표 공간을 변형시킬 수 있다. 해당 속성에 지정된 값에 따라 엘리먼트(element)에 이동(translate), 회전(rotate), 크기변경(scale), 기울임(skew)등의 효과를 줄 수 있다.
