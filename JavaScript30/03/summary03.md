# CSS Variables

## 요구사항

css에서 변수를 사용하여 값을 설정 해보고 javascript로 css를 동적으로 컨트롤 해보자.

기본 소스코드

```html
<h2>Update CSS Variables with <span class="hl">JS</span></h2>

<div class="controls">
  <label for="spacing">Spacing:</label>
  <input
    id="spacing"
    type="range"
    name="spacing"
    min="10"
    max="200"
    value="10"
    data-sizing="px"
  />

  <label for="blur">Blur:</label>
  <input
    id="blur"
    type="range"
    name="blur"
    min="0"
    max="25"
    value="10"
    data-sizing="px"
  />

  <label for="base">Base Color</label>
  <input id="base" type="color" name="base" value="#ffc600" />
</div>

<img src="https://source.unsplash.com/7bwQXzbF6KE/800x500" />
```

```css
<style>
    body {
        text-align: center;
        background: #193549;
        color: white;
        font-family: 'helvetica neue', sans-serif;
        font-weight: 100;
        font-size: 50px;
      }

      .controls {
        margin-bottom: 50px;
      }

      input {
        width: 100px;
      }
    </style>
```

## 처리과정 & 코드분석

1. css에서 :root 가상클래스에 변수를 추가해 주었다.

   (:root 에 추가해주는 것이 모든 요소에 변수를 정의하는 데에 도움이 된다.)

2. 커스텀 속성 정의 부분 (--\* 패밀리)

```css
:root {
  --base: #ffc600;
  --spacing: 10px;
  --blur: 10px;
}
```

3. img태그에 선언한 변수들을 이용해서 값을 설정함

   캐스케이딩 변수 사용 부분 (var()함수)

```css
img {
  padding: var(--spacing);
  background: var(--base);
  filter: blur(var(--blur));
}
```

4. input 요소들을 감싸고있는 controls 클래스, input 요소들을 다 선택하기 위해 querySelectorAll로 잡아서 inputs에 할당 함

   전부 타겟으로 잡는 이유는 ? 다음 작업에서 각 input요소에 addEventListener를 해주기 위해서임

```javascript
const inputs = document.querySelectorAll('.controls input');
```

5. inputs은 querySelectorAll로 잡았기 때문에 배열이 아닌 NodeList로 반환이 된다. NodeList에 forEach메서드가 있기 때문에 다른 설정없이 forEach를 사용해서 각 input 요소에 addEventListener를 추가했다.

   range 설정을 실시간으로 변하는것을 확인하기 위해 mousemove와 change를 addEventListener로 주었다.

```javascript
inputs.forEach(input => input.addEventListener('change', handleUpdate));

inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
```

6. handleUpdate 함수 작성

```javascript
function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
}
```

6-1. `this.dataset`은 html에 input 태그에 작성된 data-\* 들을 가리킨다. 그 중에 sizing을 선택해서 `this.dataset.sizing`

6-2. `suffix`를 생성한 이유는 값을 설정할 때 --spacing, --blur가 px단위 때문에 input태그에서 설정한 `data-sizing='px'` 이기 때문에 suffix로 할당함

6-3. `` document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix); ``

    document.documentElement는 읽기 전용 속성으로 document 의 루트 요소인 Element를 반환한다.

    style.setProperty()는 CSS 스타일 선언 객체의 속성에 대한 새 값을 설정한다.

    .setProperty ( propertyName , value, priority ) 의 구문이다.

6-4. `` (`--${this.name}`, this.value + suffix) `` propertyName은 --변수네임, value는 값+suffix 로 set 해주었다.

## 결과

```css
<style>
      :root {
        --base: #ffc600;
        --spacing: 10px;
        --blur: 10px;
      }

      img {
        padding: var(--spacing);
        background: var(--base);
        filter: blur(var(--blur));
      }

      .hl {
        color: var(--base);
      }

      body {
        text-align: center;
        background: #193549;
        color: white;
        font-family: 'helvetica neue', sans-serif;
        font-weight: 100;
        font-size: 50px;
      }

      .controls {
        margin-bottom: 50px;
      }

      input {
        width: 100px;
      }
    </style>
```

```javascript
<script>
      const inputs = document.querySelectorAll('.controls input');

      function handleUpdate() {
        const suffix = this.dataset.sizing || '';
        document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
      }

      inputs.forEach(input => input.addEventListener('change', handleUpdate));
      inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
</script>
```

![결과](/javascript30/03/blur01.JPG)
![결과](/javascript30/03/blur02.JPG)

## 찾아본 내용

_css filter 속성_

    filter CSS 속성은 흐림 효과나 색상 변형 등 그래픽 효과를 요소에 적용합니다. 보통 필터는 이미지 렌더링, 배경, 테두리 등의 조정에 쓰입니다.

_:root 의사 클래스_

    :root 의사 클래스는 문서의 루트요소를 나타낸다 HTML에서는 보통 html 요소를 지칭한다 CSS 커스텀 속성 정의 부분은 대시(-) 두개로 시작하며 그 뒤의 이름은 대소문자를  구분한다.

_Document.documentElement_

    읽기 전용 속성으로 document 의 루트 요소인 Element를 반환한다 (가령, HTML 문서의 <html> 요소).

_setProperty_

    .setProperty() 방법 인터페이스는 CSS 스타일 선언 객체의 속성에 대한 새 값을 설정합니다
    .setProperty ( propertyName , value, priority );

## 참고자료

[css filter](https://developer.mozilla.org/ko/docs/Web/CSS/filter)

[:root](https://brunch.co.kr/@techhtml/27)

[Document.documentElement](https://developer.mozilla.org/ko/docs/Web/API/Document/documentElement)

[setProperty](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty)
