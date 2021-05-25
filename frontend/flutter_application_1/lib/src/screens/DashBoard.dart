import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:intl/intl.dart';

import 'models/Bottle.dart';
import 'models/Medicine.dart';
import 'package:Smart_Medicine_Box/src/screens/SettingPage.dart';

class DashBoard extends StatefulWidget {
  int pageNumber;
  Bottle bottleInformation;
  Medicine medicineInformation;

  DashBoard(
      {Key key,
      this.pageNumber,
      this.bottleInformation,
      this.medicineInformation})
      : super(key: key);

  @override
  _DashBoardState createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  Bottle _bottleinformation = new Bottle();
  int _selectedIndex = 0;
  Medicine _medicineInformation = new Medicine();

  Widget build(BuildContext context) {
    _selectedIndex = widget.pageNumber;
    _medicineInformation = widget.medicineInformation;
    _bottleinformation = widget.bottleInformation;
    var _tabs = [
      ineerInformationpage(context, _bottleinformation),
      mainpage(context, _medicineInformation),
      outerInformationpage(context, _bottleinformation),
    ];

    return Scaffold(
      backgroundColor: Color(0xffe5f4ff),
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.black),
        backgroundColor: Colors.white,
        title: Text(
          'Smart Medicine Box',
          style: TextStyle(
              color: Colors.black,
              fontSize: 20,
              fontFamily: 'Noto',
              fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            icon: Icon(
              Icons.settings,
              color: Colors.black,
            ),
            onPressed: () {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (BuildContext context) => SettingPage(),
                  ));
            },
          )
        ],
      ),
      drawer: Drawer(
        child: ListView(
          children: [
            DrawerHeader(
              child: Text('Drawer Header'),
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
            ),
            ListTile(
              title: Text('Test 1'),
              onTap: () {},
            ),
            ListTile(
              title: Text('Test 2'),
              onTap: () {},
            ),
            ListTile(
              title: Text('Test 3'),
              onTap: () {},
            ),
          ],
        ),
      ),
      body: _tabs[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        backgroundColor: Colors.grey,
        selectedItemColor: Colors.blue,
        unselectedItemColor: Colors.white.withOpacity(.60),
        selectedFontSize: 14,
        unselectedFontSize: 14,
        currentIndex: _selectedIndex,
        onTap: (int index) => {
          setState(() {
            _onItemTapped(index);
          })
        },
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.favorite), label: 'In'),
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(
            label: 'Out',
            icon: Icon(Icons.favorite),
          )
        ],
      ),
    );
  }

  void _onItemTapped(int index) {
    setState(() {
      widget.pageNumber = index;
    });
  }
}

Widget mainpage(BuildContext context, Medicine medicineInformation) {
  final Size size = MediaQuery.of(context).size;
  return Scaffold(
    backgroundColor: Colors.white,
    body: SingleChildScrollView(
      child: Container(
        margin: EdgeInsets.fromLTRB(0, 30, 0, 0),
        padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            SizedBox(height: 20),
            Container(
              width: size.width,
              padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
              margin: EdgeInsets.all(15),
              decoration: BoxDecoration(
                border: Border.all(),
                borderRadius: BorderRadius.all(
                    Radius.circular(25.0) //         <--- border radius here
                    ),
              ),
              child: Column(
                children: [
                  SizedBox(height: 30),
                  Container(
                    child: Center(
                      child: Text(
                          medicineInformation.name == null
                              ? '-'
                              : medicineInformation.name,
                          style: TextStyle(
                              color: Colors.black,
                              fontSize: 24,
                              fontFamily: 'NotoSansKR',
                              fontWeight: FontWeight.w700)),
                    ),
                  ),
                  SizedBox(height: 30),
                  Container(
                    width: size.width,
                    alignment: Alignment(0.9, 0),
                    child: Wrap(
                      children: [
                        Text(
                          '제조사: ',
                          style: TextStyle(
                            color: Colors.grey,
                            fontSize: 14,
                          ),
                        ),
                        Text(
                          medicineInformation.company == null
                              ? '-'
                              : medicineInformation.company,
                          style: TextStyle(
                            color: Colors.grey,
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 30),
                  Container(
                    width: size.width,
                    padding: EdgeInsets.fromLTRB(5, 0, 5, 0),
                    alignment: Alignment(-1, 0),
                    child: Wrap(
                      children: [
                        Text(
                          '타겟 층 : ',
                          style: TextStyle(
                            color: Colors.grey,
                            fontSize: 14,
                          ),
                        ),
                        Text(
                          medicineInformation.target == null
                              ? '-'
                              : medicineInformation.target,
                          style: TextStyle(
                            color: Colors.grey,
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 15),
                  Container(
                    width: size.width,
                    padding: EdgeInsets.fromLTRB(5, 0, 5, 0),
                    alignment: Alignment(-1, 0),
                    child: Wrap(
                      children: [
                        Text(
                          '복약 정보 : ',
                          style: TextStyle(
                            color: Colors.grey,
                            fontSize: 14,
                          ),
                        ),
                        Text(
                          medicineInformation.dosage == null
                              ? '-'
                              : medicineInformation.dosage,
                          style: TextStyle(
                            color: Colors.grey,
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 10),
                  Container(
                    width: size.width,
                    padding: EdgeInsets.fromLTRB(5, 10, 5, 10),
                    alignment: Alignment(-1, 0),
                    child: Column(
                      children: [
                        SizedBox(
                          height: 12,
                        ),
                        Container(
                          width: size.width,
                          child: Text(
                            '경고',
                            style: TextStyle(
                                color: Colors.redAccent, fontSize: 14),
                          ),
                        ),
                        SizedBox(height: 12),
                        Container(
                          width: size.width,
                          child: Text(
                            medicineInformation.warn == null
                                ? '-'
                                : medicineInformation.warn,
                            style: TextStyle(
                                color: Colors.redAccent, fontSize: 14),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    ),
  );
}

Widget ineerInformationpage(BuildContext context, Bottle bottleinformation) {
  final Size size = MediaQuery.of(context).size;
  return Scaffold(
    backgroundColor: Colors.white,
    body: Container(
      height: size.height * 0.9,
      margin: EdgeInsets.fromLTRB(0, 30, 0, 0),
      padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Container(
            padding: EdgeInsets.fromLTRB(5, 5, 5, 5),
            height: size.height * 0.08,
            width: size.width,
            child: Center(
              child: Text(
                'Inside Information',
                textAlign: TextAlign.center,
                textScaleFactor: 1.0,
                style: TextStyle(
                    color: Colors.black,
                    fontSize: 32,
                    fontFamily: 'NotoSansKR',
                    fontWeight: FontWeight.w700),
              ),
            ),
          ),
          Container(
            padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
            margin: EdgeInsets.fromLTRB(0, 10, 0, 0),
            height: size.height * 0.25,
            width: size.width,
            child: Column(
              children: <Widget>[
                Flexible(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        width: size.width * 0.43,
                        height: size.width * 0.45,
                        margin: const EdgeInsets.all(5.0),
                        padding: const EdgeInsets.fromLTRB(10, 5, 10, 10),
                        decoration: BoxDecoration(
                          color: Color(0xff8E97FD),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        child: Column(
                          children: [
                            Container(
                              width: size.width,
                              height: size.height * 0.05,
                              child: Center(
                                child: Text(
                                  '약병 내부 온도',
                                  textAlign: TextAlign.center,
                                  textScaleFactor: 1.0,
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 24,
                                      fontFamily: 'NotoSansKR',
                                      fontWeight: FontWeight.w800),
                                ),
                              ),
                            ),
                            Container(
                              width: size.width,
                              height: size.height * 0.145,
                              child: Center(
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      bottleinformation.temperature
                                                  .toString() ==
                                              null
                                          ? '-'
                                          : bottleinformation.temperature
                                              .toString(),
                                      textAlign: TextAlign.center,
                                      textScaleFactor: 1.0,
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 76,
                                          fontFamily: 'NotoSansKR',
                                          fontWeight: FontWeight.w800),
                                    ),
                                    Text(
                                      '℃',
                                      textAlign: TextAlign.center,
                                      textScaleFactor: 1.0,
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 60,
                                          fontFamily: 'NotoSansKR',
                                          fontWeight: FontWeight.w800),
                                    )
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        width: size.width * 0.43,
                        height: size.width * 0.45,
                        margin: const EdgeInsets.all(5.0),
                        padding: const EdgeInsets.fromLTRB(10, 5, 10, 10),
                        decoration: BoxDecoration(
                          color: Color(0xff8E97FD),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        child: Column(
                          children: [
                            Container(
                              width: size.width,
                              height: size.height * 0.05,
                              child: Center(
                                child: Text(
                                  '약병 내부 습도',
                                  textAlign: TextAlign.center,
                                  textScaleFactor: 1.0,
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 24,
                                      fontFamily: 'NotoSansKR',
                                      fontWeight: FontWeight.w800),
                                ),
                              ),
                            ),
                            Container(
                              width: size.width,
                              height: size.height * 0.14,
                              child: Center(
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      bottleinformation.humidity.toString() ==
                                              null
                                          ? '-'
                                          : bottleinformation.humidity
                                              .toString(),
                                      textAlign: TextAlign.center,
                                      textScaleFactor: 1.0,
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 80,
                                          fontFamily: 'NotoSansKR',
                                          fontWeight: FontWeight.w800),
                                    ),
                                    Text(
                                      '%',
                                      textAlign: TextAlign.center,
                                      textScaleFactor: 1.0,
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 60,
                                          fontFamily: 'NotoSansKR',
                                          fontWeight: FontWeight.w800),
                                    )
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
            margin: EdgeInsets.fromLTRB(0, 0, 0, 0),
            height: size.height * 0.3,
            width: size.width,
            child: Column(
              children: <Widget>[
                Flexible(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        width: size.width * 0.43,
                        height: size.width * 0.45,
                        margin: const EdgeInsets.all(5.0),
                        padding: const EdgeInsets.fromLTRB(10, 5, 10, 10),
                        decoration: BoxDecoration(
                          color: Color(0xff8E97FD),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        child: Column(
                          children: [
                            Container(
                              width: size.width,
                              height: size.height * 0.05,
                              child: Center(
                                child: Text(
                                  '약병 내부 잔량',
                                  textAlign: TextAlign.center,
                                  textScaleFactor: 1.0,
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 24,
                                      fontFamily: 'NotoSansKR',
                                      fontWeight: FontWeight.w800),
                                ),
                              ),
                            ),
                            Container(
                              width: size.width,
                              height: size.height * 0.14,
                              child: Center(
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      bottleinformation.balance.toString() ==
                                              null
                                          ? '-'
                                          : bottleinformation.balance
                                              .toString(),
                                      textAlign: TextAlign.center,
                                      textScaleFactor: 1.0,
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 80,
                                          fontFamily: 'NotoSansKR',
                                          fontWeight: FontWeight.w800),
                                    ),
                                    Text(
                                      '%',
                                      textAlign: TextAlign.center,
                                      textScaleFactor: 1.0,
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 60,
                                          fontFamily: 'NotoSansKR',
                                          fontWeight: FontWeight.w800),
                                    )
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        width: size.width * 0.43,
                        height: size.width * 0.45,
                        margin: const EdgeInsets.all(5.0),
                        padding: const EdgeInsets.fromLTRB(10, 5, 10, 10),
                        decoration: BoxDecoration(
                          color: Color(0xff8E97FD),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        child: Column(
                          children: [
                            Container(
                              width: size.width,
                              height: size.height * 0.05,
                              child: Center(
                                child: Text(
                                  '최근 개폐 시간',
                                  textAlign: TextAlign.center,
                                  textScaleFactor: 1.0,
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 24,
                                      fontFamily: 'NotoSansKR',
                                      fontWeight: FontWeight.w800),
                                ),
                              ),
                            ),
                            Container(
                              width: size.width,
                              height: size.height * 0.14,
                              child: Center(
                                child: Text(
                                  bottleinformation.recentOpen == null
                                      ? '-'
                                      : DateFormat.Hm()
                                          .format(bottleinformation.recentOpen),
                                  textAlign: TextAlign.center,
                                  textScaleFactor: 1.0,
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 60,
                                      fontFamily: 'NotoSansKR',
                                      fontWeight: FontWeight.w800),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    ),
  );
}

Widget outerInformationpage(BuildContext context, Bottle bottleinformation) {
  final Size size = MediaQuery.of(context).size;
  return Scaffold(
    backgroundColor: Colors.white,
    body: Container(
      height: size.height * 0.9,
      margin: EdgeInsets.fromLTRB(0, 30, 0, 0),
      padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Container(
            padding: EdgeInsets.fromLTRB(5, 5, 5, 5),
            height: size.height * 0.08,
            width: size.width,
            child: Center(
              child: Text(
                'Outside Information',
                textAlign: TextAlign.center,
                textScaleFactor: 1.0,
                style: TextStyle(
                    color: Colors.black,
                    fontSize: 32,
                    fontFamily: 'NotoSansKR',
                    fontWeight: FontWeight.w700),
              ),
            ),
          ),
          Container(
            padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
            margin: EdgeInsets.fromLTRB(0, 10, 0, 0),
            height: size.height * 0.20,
            width: size.width,
            child: Column(
              children: <Widget>[
                Flexible(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        padding: EdgeInsets.fromLTRB(5, 5, 5, 0),
                        width: size.width * 0.9,
                        height: size.height * 0.18,
                        decoration: BoxDecoration(
                          color: Color(0xff8E97FD),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        child: Column(
                          children: [
                            Container(
                              width: size.width,
                              height: size.height * 0.05,
                              child: Center(
                                child: Text(
                                  '권장 약 복용량',
                                  textAlign: TextAlign.center,
                                  textScaleFactor: 1.0,
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 28,
                                      fontFamily: 'NotoSansKR',
                                      fontWeight: FontWeight.w800),
                                ),
                              ),
                            ),
                            Container(
                              width: size.width,
                              height: size.height * 0.12,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    bottleinformation.dosage == null
                                        ? '-'
                                        : bottleinformation.dosage.toString(),
                                    textAlign: TextAlign.center,
                                    textScaleFactor: 1.0,
                                    style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 80,
                                        fontFamily: 'NotoSansKR',
                                        fontWeight: FontWeight.w800),
                                  ),
                                  Text(
                                    ' 개',
                                    textScaleFactor: 1.0,
                                    style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 64,
                                        fontFamily: 'NotoSansKR',
                                        fontWeight: FontWeight.w800),
                                  )
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Container(
            margin: EdgeInsets.fromLTRB(0, 0, 0, 0),
            height: size.height * 0.20,
            width: size.width,
            child: Column(
              children: <Widget>[
                Flexible(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        padding: EdgeInsets.fromLTRB(5, 5, 5, 0),
                        width: size.width * 0.9,
                        height: size.height * 0.18,
                        decoration: BoxDecoration(
                          color: Color(0xff8E97FD),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        child: Column(
                          children: [
                            Container(
                              width: size.width,
                              height: size.height * 0.05,
                              child: Center(
                                child: Text(
                                  '약 복용 시간',
                                  textAlign: TextAlign.center,
                                  textScaleFactor: 1.0,
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 28,
                                      fontFamily: 'NotoSansKR',
                                      fontWeight: FontWeight.w800),
                                ),
                              ),
                            ),
                            Container(
                              width: size.width,
                              height: size.height * 0.12,
                              child: Center(
                                child: Text(
                                  '15:57',
                                  textAlign: TextAlign.center,
                                  textScaleFactor: 1.0,
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 70,
                                      fontFamily: 'NotoSansKR',
                                      fontWeight: FontWeight.w800),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    ),
  );
}

/*
bottom navbar로 이동
appbar로는 저거 만들어서 사용
설정 smartmedicine box를 app bar 로 구현 
이건 우선 작업 후 추후 작업 



*/
