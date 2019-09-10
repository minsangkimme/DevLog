# 오늘배운 React 정리

## 공부환경 : Window10, chrome, vscode

## 키워드

- npm
- npx
- 설치명령어
- 실행명령어
- 디렉터리 구조
- Coding, Run, Deploy
- Component

## 1. npm

Node.js를 이용해서 만들어진 여러 앱들이 있는데 그런 앱들을 명령어 환경에서 손쉽게 설치할 수 있도록 도와주는 도구 쉽게 말해 node.js 계의 앱 스토어 또는 구글플레이 같은 역할을 하는 소프트웨어이다. npm을 사용하려면 node.js 홈페이지에서 node.js를 설치하면 된다.

버전은 LTS(안전한 버전) / Current(최신버전) 으로 나뉜다.

    ## 1.1 npx
    npm을 설치하면 npx도 설치되는데 npx는 설치하고자 하는 소프트웨어를 일회용으로 다운로드 받은 다음에 실행한 후 지운다.

npx명령어를 사용하면 장점은 ? 소프트웨어를 항상 최신 버전으로 사용할 수 있게 된다.

## 2. 설치

1. node.js 홈페이지에서 버전을 선택하여 설치를 한다.

2. cmd창을 열어 `npm -v` 를 입력하면 버전 정보를 확인할 수 있으면 npm이 성공적으로 설치된 것을 확인할 수 있다.

3. `npm install -g create-react-app@2.1.8` 명령어를 사용하여 `create-react-app`을 2.1.8 버전으로 설치를 합니다. 버전을 표시하지 않으면 최신버전으로 설치가 됩니다.
   -g 는 global의 약자이고 -g 옵션을 사용하여 설치하게 되면 컴퓨터 어디에서든지 `create-react-app` 라는 프로그램을 설치 실행 할 수 있기 때문에 편리하다
   (mac 사용자는 설치가 거부된다면 앞에 sudo를 붙여 관리자의권한으로 실행 설치한다.)

4. `create-react-app` 명령어를 사용하면 설치한 create-react-app 버전을 확인할 수 있다.

## 3. create-react-app을 이용한 개발환경 구축

1. 바탕화면에 예)react-app 폴더를 생성한다.

2. cmd창에서 cd 이동 명령어를 사용하여 react-app 폴더 경로로 이동한다.

3. `create-react-app .` 명령어를 이용하여 현재 디렉터리에 ( .은 현재디렉터리를 의미함 ) 설치를한다.

4. react-app 폴더에 create-react-app이 우리가 개발하는데 필요로 할만한 것들이 설치됨

## 4. 실행 명령어

`npm run start` 명령어를 실행하면 create-react-app이 기본적으로 제공하는 샘플 웹앱이 실행이 된다.

## 5. 디렉터리 구조

public : index.html이 있는 곳 이다.

_여기서 중요한 것은_ 우리는 Component들을 만들어 갈 것이고 이 Component들이 들어가도록 create-react-app은 id가 \*\* 인 곳으로 약속해놨다.

그렇다면 내용이 되는 Component 들은 어디서 수정 하는 것일까? (src디렉터리에서 파일..)

src : 개발 작업을 하게 되면 대부분의 파일은 src 라는 디렉터리 안에 넣게 된다.

## 6. Component

react에서 말하는 Component란 사용자가 정의하여 만든 태그를 Component라고 한다.

## 7. Deploy (배포)

프로덕션의 모드의 앱을 만들 때 다시말해 빌드할 때는
`npm run build` 라는 명령어를 치면 build라는 디렉터리가 생성이 된다.

build 디렉터리 안에는 create-react-app이 실제 프로덕션 환경에서 사용되는 앱을 만들기 위해서 우리가 이미 갖고 있는 index.html에서 공백과 같은 불필요하게 용량을 차지하는 정보를 싹 지웠다. --> 전체용량이 작아짐

결론: 실제로 서비스할 때는 build 디렉터리 안에 있는 파일들을 쓰면 된다 라는 것이고, 웹 서버가 문서를 찾는 최상위 디렉터리(document root) 에다가 build 디렉터리 안쪽에 파일들을 위치 시키면 된다. 그럼 실 서버 환경이 완성이 된다.

## 8. 웹 서버 설치

serve 는 npm을 통해 설치할 수 있는 간단한 웹서버이다.
`npm install -g serve` 명령어를 하면은 컴퓨터 어디에서나 server 라는 명령어를 통해서 웹 서버를 설치할 수 있고 또는 `npx serve -s build` 명령어를 사용하면 한번만 실행 시킬 웹서버를 다운로드 하게 된다.
뒤에 -s build 를 하게 되면 "serve 라는 웹 서버를 다운로드 받아서 실행 시킬 때 우리가 생성한 build 디렉터리를 document root 로 하겠다" 라고 지정하는 것이 -s 옵션이다.
