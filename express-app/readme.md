# express-app

## 목적 및 과정

1. node를 사용하였고 server와 api-server를 분리함
2. api-server에서는 데이터만 관리하고 server 에서는 client 요청에 대한 응답
3. server에서 api-server 로 데이터 요청하고 응답으로 데이터를 보냄
4. 응답을 받은 server는 client 요청에 대한 응답으로 페이지에 렌더링 하게 되는 요청과 응답원리에 대한 통신 흐름을 공부함

client -> server -> api-server (요청(request))

client <- server <- api-server (응답(response))

### 설치 dependencies

express, request, hbs
