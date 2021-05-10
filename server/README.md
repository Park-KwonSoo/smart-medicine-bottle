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
- [ ]  API 유저 인증 추가
- [ ]  Bottle API : 데이터 요청 message publishing 추가
- [ ]  Hub, Bottle, User unregister 추가 및 연관 데이터 처리
- [ ]  logic return value 및 status

[Schedule](https://www.notion.so/cdcc6627a8344c8da56ffb3856bfc1b9)