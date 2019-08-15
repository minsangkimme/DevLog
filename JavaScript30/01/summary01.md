# Drum Kit 정리


## 요구사항 
 
#### KeyBoard 입력을 받아 애니메이션 효과와 Drum 소리가 출력되게 vanilla JS를 이용해서 구현한다
- - -

 *기본 소스코드*
```
  <div class="keys">
    <div data-key="65" class="key">
      <kbd>A</kbd>
      <span class="sound">clap</span>
    </div>
    <div data-key="83" class="key">
      <kbd>S</kbd>
      <span class="sound">hihat</span>
    </div>
    <div data-key="68" class="key">
      <kbd>D</kbd>
      <span class="sound">kick</span>
    </div>
    <div data-key="70" class="key">
      <kbd>F</kbd>
      <span class="sound">openhat</span>
    </div>
    <div data-key="71" class="key">
      <kbd>G</kbd>
      <span class="sound">boom</span>
    </div>
    <div data-key="72" class="key">
      <kbd>H</kbd>
      <span class="sound">ride</span>
    </div>
    <div data-key="74" class="key">
      <kbd>J</kbd>
      <span class="sound">snare</span>
    </div>
    <div data-key="75" class="key">
      <kbd>K</kbd>
      <span class="sound">tom</span>
    </div>
    <div data-key="76" class="key">
      <kbd>L</kbd>
      <span class="sound">tink</span>
    </div>
  </div>

  <audio data-key="65" src="sounds/clap.wav"></audio>
  <audio data-key="83" src="sounds/hihat.wav"></audio>
  <audio data-key="68" src="sounds/kick.wav"></audio>
  <audio data-key="70" src="sounds/openhat.wav"></audio>
  <audio data-key="71" src="sounds/boom.wav"></audio>
  <audio data-key="72" src="sounds/ride.wav"></audio>
  <audio data-key="74" src="sounds/snare.wav"></audio>
  <audio data-key="75" src="sounds/tom.wav"></audio>
  <audio data-key="76" src="sounds/tink.wav"></audio>
```
- - -
## 처리과정 & 코드분석
1. keydown 이 될때마다 로그를 찍어 봤음

2. keydown 됐을 때 실행할 익명함수 작성

3. evnet를 찍었을 때 keyCode 속성이 나옴

4. data-key를 이용함, event.keyCode 속성을 이용하여 동적으로 타겟을 잡음  key, audio 변수에 할당함

```
const audio = document.querySelect(`audio[data-key="${e.keyCode}"]`);

const key = document.querySelect(`key[data-key="${e.keyCode}"]`);
```

5. currentTime 을 사용하여 시간을 0초로 설정함   (키보드 누를때 마다 audio 출력하기 위해)
```
 audio.currentTime = 0;
```

6. play() 실행이 되면서 애니메이션 효과를 주기 위해
  key에 classList.add('playing') 추가함
  ```
  key.classList.add('playing');
  ``` 

7. 각 key에 적용된 CSS 효과를 지우기 위해 *모든* key를 타겟 잡음 (querySelectAll로 타겟을 잡은 keys는 *배열로* 값이 떨어짐)
 ``` 
const keys = document.querySelectAll('.key');
 ```
8. keys를 forEach를 통해 반복하고 css 효과가 끝났을 때 실행 될 removeTransition 함수를 작성함
```
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
```
```
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}
```
8-1. removeTransition 함수에서 event를 찍어보니 css 전환이 완료된 evnet들이 찍혔고 거기에 propertyName 속성이 있었음 그 name이 'transform' 이 아닌 envet들은 return값을 주어 반환 시킴

8-2. removeTransition 안에서의 *this* 가 가리키는 곳은 이벤트가 발생한 *key* 이다.
```
key => key.addEventListener(...)

< this가 가리키는 부분 >
<div data-key="65" class="key">
      <kbd>A</kbd>
      <span class="sound">clap</span>
    </div> ...
``` 
- - -
## 결과
```
<script>

function playSound(e) {  
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key   = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  
  if (!audio) return; // stop the function from running all together
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove("playing");    
}

const keys = document.querySelectorAll('.key');  
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);

</script>
```

![결과](/JavaScript30/01/001.JPG)
- - -

## 찾아본 내용

*data-key*

    custom data attribute 이다. 사용자가 임의로 만들고 생성한 속성 (data-*)
    이 때문에 각각의 div 는 data-key 값을 인덱스처럼 사용할 수 있음.

*currentTime*

    HTML audio/video DOM  currentTime 속성
    currentTime 속성은 audio/video 재생의 현재 초를 설정하거나 반환함. 이 속성을 설정하면 재생이 지정된 위치로 이동함.


*addEventListener("transitionend")*

    CSS 전환이 완료되면 transitionend 이벤트가 발생합니다.
    참고 : CSS transition-property 속성이 제거 된 경우와 같이 완료 전에 전환이 제거되면 transitionend 이벤트가 발생하지 않습니다.

*```<kbd>```*
 ```
 <kbd> 태그는 키보드 입력을 지정할 때 사용함 
 ```

