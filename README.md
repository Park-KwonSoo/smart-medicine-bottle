# 스마트 약병

---

![http://khuhub.khu.ac.kr/2021-1-capstone-design1/RIT_Project1/uploads/9b1f91d1e434746875438f6b8eb5dfab/메인_메뉴.png](http://khuhub.khu.ac.kr/2021-1-capstone-design1/RIT_Project1/uploads/9b1f91d1e434746875438f6b8eb5dfab/메인_메뉴.png)

## Info

<aside>
💡 하루가 다르게 고령화가 진행되고 있는 대한민국. 2017년 기준, 나이가 65세를 넘은 ‘노인'이 전체 인구의 14%를 넘어섰습니다. 이 연구는 약 복용을 관리하고 지원하는 플랫폼으로, 사용자가 복용중인 약에 관한 정보를 포함하여 약을 규칙적으로 복용할 수 있게 해 줍니다.

</aside>

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

- 박권수 : 웹 개발
1. Framework : React
2. 언어 : TypeScript
3. 주요 프로토콜 : HTTP Request(RESTful API)

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
- **Web for Doctor**를 통하여 복약지도

---

## 시나리오

- **약병 시나리오**

![https://user-images.githubusercontent.com/72953899/141595024-d89ef1f7-5829-4828-8633-706301061e9b.png](https://user-images.githubusercontent.com/72953899/141595024-d89ef1f7-5829-4828-8633-706301061e9b.png)

![https://user-images.githubusercontent.com/72953899/141595045-53e18d3f-f1c1-48bd-92af-1b3ac3e00c7d.png](https://user-images.githubusercontent.com/72953899/141595045-53e18d3f-f1c1-48bd-92af-1b3ac3e00c7d.png)

1. 약병을 열면 Care Bridge로 센서 데이터를 Bluetooth로 전송
2. Care Bridge는 센서 데이터를 Message로 변환 후 Publish
3. 서버는 해당 Message를 Subscribe한 후 Factoring
4. 서버는 Factoring한 데이터를 Message로 변환 후 Publish
5. Care Bridge는 Factoring된 Messge를 Subscribe한 후 Bluetooth로 약병에 전송
6. 약병은 데이터를 LED를 통해 표시

- **어플리케이션 for 환자 시나리오**

![https://user-images.githubusercontent.com/72953899/141595060-503a0b90-3996-49a1-b403-37c4522c6ede.png](https://user-images.githubusercontent.com/72953899/141595060-503a0b90-3996-49a1-b403-37c4522c6ede.png)

1. 회원가입 및 로그인(소셜 로그인 : 구글, 네이버, 카카오)
2. 환자는 CareBridge와 Smart Medicine Bottle을 등록
3. 담당의 요청 수락
4. 의사에게 처방받은 QR코드를 스마트 약병에 등록
5. 담당의에게 복약지도 받기

- **웹 for 의사 시나리오**

![https://user-images.githubusercontent.com/72953899/141595061-d1762966-8515-4055-951a-b49c1f9d2604.png](https://user-images.githubusercontent.com/72953899/141595061-d1762966-8515-4055-951a-b49c1f9d2604.png)

![https://user-images.githubusercontent.com/72953899/141595063-81af2df6-4322-49b5-a5f8-e4ff5625cde7.png](https://user-images.githubusercontent.com/72953899/141595063-81af2df6-4322-49b5-a5f8-e4ff5625cde7.png)

![https://user-images.githubusercontent.com/72953899/141595066-c6a005d8-0d66-407a-8dab-7b65c0bd9e63.png](https://user-images.githubusercontent.com/72953899/141595066-c6a005d8-0d66-407a-8dab-7b65c0bd9e63.png)

1. 회원가입 및 로그인
2. 회원가입시 관리자의 승인을 받아야하고, 의사의 자격정보 업로드 해야 함
3. 방문한 환자 대상으로 관리 환자 등록 요청 전송
4. 공공데이터를 통해 처방할 약 검색 및 환자에게 약 처방
5. 처방한 약을 환자가 등록하면 환자의 복약 정보 관리
6. 환자에게 복약 지도

---

## More About

<aside>
💡 자세한 내용이 궁금하다면?

</aside>

1. [Application 보러가기](http://khuhub.khu.ac.kr/2021-1-capstone-design1/RIT_Project1/commits/frontend)
2. [Server, DB 보러가기](http://khuhub.khu.ac.kr/2021-1-capstone-design1/RIT_Project1/commits/server)
3. [HW 보러가기](http://khuhub.khu.ac.kr/2021-1-capstone-design1/RIT_Project1/commits/Hardware)
4. [작품 시연 영상](https://youtu.be/TAVe_jBfYEo)

[https://youtu.be/TAVe_jBfYEo](https://youtu.be/TAVe_jBfYEo)

---

## License

---