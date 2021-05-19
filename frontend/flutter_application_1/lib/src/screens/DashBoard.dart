import 'package:flutter/material.dart';
import 'package:Smart_Medicine_Box/src/screens/SettingPage.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

class DashBoard extends StatefulWidget {
  int pageNumber = 1;
  DashBoard({Key key, this.pageNumber}) : super(key: key);

  @override
  _DashBoardState createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  int _selectedIndex = 0;

  Widget build(BuildContext context) {
    _selectedIndex = widget.pageNumber;

    var _tabs = [
      ineerInformationpage(context),
      mainpage(context),
      outerInformationpage(context),
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

Widget mainpage(BuildContext context) {
  Future<String> getHubList() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    http.Response response =
        await http.get(Uri.encodeFull(DotEnv().env['SERVER_URL'] + 'hub'));

    print(response.statusCode);
  }

  final Size size = MediaQuery.of(context).size;
  /* 
    Main 화면 
    약의 정보를 가져와서 출력을 하는 곳
    유저 이메일
    약 이름 
    약 제조사
  */
  return Scaffold(
    backgroundColor: Colors.white,
    body: Container(
      height: size.height * 0.6,
      margin: EdgeInsets.fromLTRB(0, 30, 0, 0),
      padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Container(
            padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
            margin: EdgeInsets.fromLTRB(0, 30, 0, 0),
            height: size.height * 0.15,
            width: size.width,
            decoration: BoxDecoration(
              border: Border.all(),
              borderRadius: BorderRadius.all(
                  Radius.circular(4.0) //         <--- border radius here
                  ),
            ),
            child: new Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '약 이름:',
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 24,
                      fontFamily: 'NotoSansKR',
                      fontWeight: FontWeight.w700),
                ),
                Text(
                  '무슨 무슨 비타민 ',
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 36,
                      fontFamily: 'NotoSansKR',
                      fontWeight: FontWeight.w700),
                ),
              ],
            ),
          ),
          Container(
            padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
            margin: EdgeInsets.fromLTRB(0, 30, 0, 0),
            height: size.height * 0.15,
            width: size.width,
            decoration: BoxDecoration(
              border: Border.all(),
              borderRadius: BorderRadius.all(
                  Radius.circular(4.0) //         <--- border radius here
                  ),
            ),
            child: new Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '약 제조사:',
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 24,
                      fontFamily: 'NotoSansKR',
                      fontWeight: FontWeight.w700),
                ),
                Text(
                  'Test123',
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 32,
                      fontFamily: 'NotoSansKR',
                      fontWeight: FontWeight.w700),
                ),
              ],
            ),
          ),
          Container(
            height: 80,
            padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
            child: RaisedButton(
              onPressed: () async {
                String saveMessage = await getHubList();
              },
              shape: RoundedRectangleBorder(
                  borderRadius: new BorderRadius.circular(18.0),
                  side: BorderSide(color: Colors.blue)),
              color: Color(0xff1674f6),
              child: Text(
                '회원 가입',
                textScaleFactor: 1.0,
                style: TextStyle(
                    fontSize: 16,
                    color: Colors.white,
                    fontWeight: FontWeight.bold),
              ),
            ),
          )
        ],
      ),
    ),
  );
}

Widget ineerInformationpage(BuildContext context) {
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
                                      '14',
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
                                      '57',
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
                                      '57',
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
                                  '15:57',
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

Widget outerInformationpage(BuildContext context) {
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
                                    '2',
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
