# 스마트 약병

---

## Info

하루가 다르게 고령화가 진행되고 있는 대한민국. 2017년 기준, 나이가 65세를 넘은 ‘노인'이 전체 인구의 14%를 넘어섰습니다. 이 연구는 약 복용을 관리하고 지원하는 플랫폼으로, 사용자가 복용중인 약에 관한 정보를 포함하여 약을 규칙적으로 복용할 수 있게 해 줍니다.

---

## 지도교수 : 유인태 교수님

### 팀원

각 개발자의 작업사항을 보시려면 개발자의 이름을 클릭하세요.

- [고원빈 : 프론트엔드, Native Android Application 개발](http://khuhub.khu.ac.kr/2021-1-capstone-design1/RIT_Project1/tree/frontend/frontend)
1. Framework : Flutter 1.6.2
2. 언어 : Dart
3. 주요 통신 : HTTP Request, Response(Server와 통신)

- [박권수 : 백엔드, DB 개발](http://khuhub.khu.ac.kr/2021-1-capstone-design1/RIT_Project1/tree/server/server)
1. Framework : Node.JS, Koa, MongoDB, Mongoose
2. 언어 : JavaScript
3. 주요 통신 : HTTP Request(Application과 통신), MQTT(Care Bridge와 통신)

- [윤형선 : HW, 통신 개발](http://khuhub.khu.ac.kr/2021-1-capstone-design1/RIT_Project1/tree/Hardware/hardware)
1. HW : Raspberry 4B 8GB, Raspberry Pico, 3D Printer
2. 언어 : MicroPython(Python3)
3. 주요 통신 : MQTT(Server와 통신), Bluetooth(약병 및 Care Bridge간 통신)

---

## Features

- **식약처 API**를 통한 약의 정보 데이터베이스화
- 약병 내부의 **약 잔량, 온도, 습도를 측정**하고 **약 복용 시간**을 알려주는 약병
- 어플리케이션을 통한 **약병 정보 조회 및 제어**
- **Care Bridge** 를 통한 확장성 확보 - MQTT Protocol

---

## 시나리오

- 어플리케이션 시나리오

![http://khuhub.khu.ac.kr/2021-1-capstone-design1/RIT_Project1/uploads/9217a148e73c38eff392285e8e25b15f/캡쳐영상.gif](http://khuhub.khu.ac.kr/2021-1-capstone-design1/RIT_Project1/uploads/9217a148e73c38eff392285e8e25b15f/캡쳐영상.gif)

1. 어플리케이션 회원 가입 및 로그인
2. 허브 및 약병 등록
3. 복용중인 약 조회 및 등록
4. 약병 정보 조회

- 약병 시나리오

![http://khuhub.khu.ac.kr/2021-1-capstone-design1/RIT_Project1/uploads/d114cf60bc25f2ed83707b5d8c53e802/약병영상.gif](http://khuhub.khu.ac.kr/2021-1-capstone-design1/RIT_Project1/uploads/d114cf60bc25f2ed83707b5d8c53e802/약병영상.gif)

1. 약병을 열면 Care Bridge로 센서 데이터를 Bluetooth로 전송
2. Care Bridge는 센서 데이터를 Message로 변환 후 Publish
3. 서버는 해당 Message를 Subscribe한 후 Factoring
4. 서버는 Factoring한 데이터를 Message로 변환 후 Publish
5. Care Bridge는 Factoring된 Messge를 Subscribe한 후 Bluetooth로 약병에 전송
6. 약병은 데이터를 LED를 통해 표시

---

## More About

자세한 내용이 궁금하다면?

1. [Application 보러가기](http://khuhub.khu.ac.kr/2021-1-capstone-design1/RIT_Project1/commits/frontend)
2. [Server, DB 보러가기](http://khuhub.khu.ac.kr/2021-1-capstone-design1/RIT_Project1/commits/server)
3. [HW 보러가기](http://khuhub.khu.ac.kr/2021-1-capstone-design1/RIT_Project1/commits/Hardware)

---

## License

---