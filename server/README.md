# SMB (스마트 약병)

# 박권수 : Web Server & Database

- `Server` : **Node.JS**
- `Web Framework` : **Koa**
- `DBMS` : **Mongo DB**
- `Networking` : **HTTP, MQTT**

# DataBase Table & Field

- **유저 Table / 허브(가칭) Table**

![https://github.com/Park-KwonSoo/Smart_Medicine_Bottle/blob/server/design/DataTable1.png?raw=true](https://github.com/Park-KwonSoo/Smart_Medicine_Bottle/blob/server/design/DataTable1.png?raw=true)

- **약병 Table**

![https://github.com/Park-KwonSoo/Smart_Medicine_Bottle/blob/server/design/DataTable2.png?raw=true](https://github.com/Park-KwonSoo/Smart_Medicine_Bottle/blob/server/design/DataTable2.png?raw=true)

- **약 정보 Table**

![https://github.com/Park-KwonSoo/Smart_Medicine_Bottle/blob/server/design/DataTable3.png?raw=true](https://github.com/Park-KwonSoo/Smart_Medicine_Bottle/blob/server/design/DataTable3.png?raw=true)

# ToDo

- [x]  **MQTT Hosting**

→ 5 / 7 : [test.mosquitto.org](http://test.mosquitto.org) 와 raspberry 3.0 model B - mosquitto 설치로 다중 broker 연결, publish & subscribe 확인

- [x]  **Middle Ware**

→ 5 / 9 : jwtMiddleWare ⇒ access tokening

- [x]  **인증 구현**

→ 5 / 9 : Register, Login, Logout, and Access Token

- [x]  **데이터테이블 수정 및 추가 기능 구현**

→ 5 / 9 : schema is changed

- [x]  데이터 처리 로직 구현
- [x]  Node.JS의 특정 유저의 MQTT client를 어떻게 모듈화 시킬까 ?
- [x]  API 유저 인증 추가

→ 5 / 11 : 각 API에 Authorization 추가

- [x]  Bottle API : 데이터 요청 message publishing 추가

→ 5 / 11: Bottle Info 조회 시, Broker로 약병의 현재 상태 요청 메시지 전송

- [ ]  Hub, Bottle, User unregister 추가 및 연관 데이터 처리
- [x]  logic return value 및 status

→ 5 / 11 : ctx.body, status 추가

- [ ]  Private IP의 브로커를 웹서버와 연결
- [ ]  Native Application에 전달할 데이터 규칙 정하기
- [ ]  WebServer AWS 배포
- [ ]  안드로이드 <> 서버 <> 브로커 <> 약병 연결하기

⇒ 안드로이드에서 블루투스로 약병 찾은 후, 해당 약병의 정보를 서버로 전송, 서버는 이 정보를 브로커에게 전송 후 블루투스 통신?

- [ ]  bottleCtrl : lookUpInfo 함수에서 req 보낸 후 응답받은 새로운 bottle을 출력해야 한다.

[Schedule](https://www.notion.so/cdcc6627a8344c8da56ffb3856bfc1b9)