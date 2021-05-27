import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:intl/intl.dart';

import '../utils/user_secure_stoarge.dart';
import 'models/Bottle.dart';
import 'models/Medicine.dart';
import 'package:Smart_Medicine_Box/src/screens/SettingPage.dart';
import 'Register/BottleList.dart';

class DashBoard extends StatefulWidget {
  int pageNumber;

  DashBoard({
    Key key,
    this.pageNumber,
  }) : super(key: key);

  @override
  _DashBoardState createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  int _selectedIndex = 0;
  List<Bottle> _bottleList = new List<Bottle>();
  //Get BottleList
  Future<String> getBottleList() async {
    String usertoken = await UserSecureStorage.getUserToken();
    String hubid = await UserSecureStorage.getHubId();
    http.Response response = await http.get(
      Uri.encodeFull(DotEnv().env['SERVER_URL'] + 'bottle/hub/' + hubid),
      headers: {"authorization": usertoken},
    );
    print(response.body);
    if (_bottleList.length != 0) {
      _bottleList.clear();
    }
    if (response.statusCode == 200) {
      List<dynamic> values = new List<dynamic>();
      values = json.decode(response.body);

      for (int i = 0; i < values.length; i++) {
        Map<String, dynamic> map = values[i];
        _bottleList.add(Bottle.fromJson(map));
        return "GET";
      }
    } else if (response.statusCode == 404) {
      return "Not Found";
    } else {
      return "Error";
    }
    return "Error";
  }

  Widget build(BuildContext context) {
    _selectedIndex = widget.pageNumber;
    var _tabs = [
      ineerInformationpage(context),
      mainpage(context),
      outerInformationpage(context),
    ];

    return WillPopScope(
      child: Scaffold(
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
      ),
      onWillPop: () async {
        await getBottleList();
        Navigator.push(
            context,
            MaterialPageRoute(
              builder: (BuildContext context) =>
                  BottleList(bottlelist: _bottleList),
            ));
      },
    );
  }

  void _onItemTapped(int index) {
    setState(() {
      widget.pageNumber = index;
    });
  }
}

Widget mainpage(BuildContext context) {
  Medicine _medicineInformation = new Medicine();

  Future<Medicine> _getmedicine() async {
    String usertoken = await UserSecureStorage.getUserToken();
    String medicineid = await UserSecureStorage.getMedicineId();
    http.Response medicineresponse = await http.get(
      Uri.encodeFull(
          DotEnv().env['SERVER_URL'] + 'medicine/' + medicineid.toString()),
      headers: {"authorization": usertoken},
    );

    if (medicineresponse.statusCode == 200) {
      Map<String, dynamic> data = jsonDecode(medicineresponse.body);
      _medicineInformation = Medicine.fromJson(data);
    }
    print(1);
    print(_medicineInformation.company);
    return _medicineInformation;
  }

  final Size size = MediaQuery.of(context).size;
  return Scaffold(
    backgroundColor: Colors.white,
    body: SingleChildScrollView(
      child: FutureBuilder(
        future: _getmedicine(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.hasData == false) {
            return CircularProgressIndicator();
          } else if (snapshot.hasError) {
            return Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                'Error: ${snapshot.error}',
                style: TextStyle(fontSize: 15),
              ),
            );
          } else {
            return Container(
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
                      borderRadius: BorderRadius.all(Radius.circular(
                              25.0) //         <--- border radius here
                          ),
                    ),
                    child: Column(
                      children: [
                        SizedBox(height: 30),
                        Container(
                          child: Center(
                            child: Text(
                                '${snapshot.data.name}' == null
                                    ? '-'
                                    : '${snapshot.data.name}',
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
                                _medicineInformation.company == null
                                    ? '-'
                                    : _medicineInformation.company,
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
                                _medicineInformation.target == null
                                    ? '-'
                                    : _medicineInformation.target,
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
                                _medicineInformation.dosage == null
                                    ? '-'
                                    : _medicineInformation.dosage,
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
                                  _medicineInformation.warn == null
                                      ? '-'
                                      : _medicineInformation.warn,
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
            );
          }
        },
      ),
    ),
  );
}

Widget ineerInformationpage(BuildContext context) {
  //get bottle
  Future<Bottle> _getbottle() async {
    String usertoken = await UserSecureStorage.getUserToken();
    String bottleid = await UserSecureStorage.getBottleId();
    Bottle _bottleinformation = new Bottle();
    http.Response response = await http.get(
        Uri.encodeFull(DotEnv().env['SERVER_URL'] + 'bottle/' + bottleid),
        headers: {"authorization": usertoken});

    if (response.statusCode == 200) {
      Map<String, dynamic> jsonData = jsonDecode(response.body);
      _bottleinformation = Bottle.fromJson(jsonData);
    }
    return _bottleinformation;
  }

  final Size size = MediaQuery.of(context).size;

  return Scaffold(
    backgroundColor: Colors.white,
    body: FutureBuilder(
      future: _getbottle(),
      builder: (BuildContext context, AsyncSnapshot snapshot) {
        if (snapshot.hasData == false) {
          return CircularProgressIndicator();
        } else if (snapshot.hasError) {
          return Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              'Error: ${snapshot.error}',
              style: TextStyle(fontSize: 15),
            ),
          );
        } else {
          return Container(
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
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          Text(
                                            '${snapshot.data.temperature}' ==
                                                    null
                                                ? '-'
                                                : '${snapshot.data.temperature}',
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
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          Text(
                                            snapshot.data.humidity.toString() ==
                                                    null
                                                ? '-'
                                                : snapshot.data.humidity
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
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          Text(
                                            snapshot.data.balance.toString() ==
                                                    null
                                                ? '-'
                                                : snapshot.data.balance
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
                                        snapshot.data.recentOpen == null
                                            ? '-'
                                            : DateFormat.Hm().format(
                                                snapshot.data.recentOpen),
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
          );
        }
      },
    ),
  );
}

Widget outerInformationpage(BuildContext context) {
  Bottle _bottleinformation = new Bottle();
  //get bottle
  Future<Bottle> _getbottle() async {
    String usertoken = await UserSecureStorage.getUserToken();
    String bottleid = await UserSecureStorage.getBottleId();
    Bottle _bottleinformation = new Bottle();
    http.Response response = await http.get(
        Uri.encodeFull(DotEnv().env['SERVER_URL'] + 'bottle/' + bottleid),
        headers: {"authorization": usertoken});

    if (response.statusCode == 200) {
      Map<String, dynamic> jsonData = jsonDecode(response.body);
      print(jsonData);
      _bottleinformation = Bottle.fromJson(jsonData);
    }
    print(1);
    print(_bottleinformation.toJson());
    return _bottleinformation;
  }

  final Size size = MediaQuery.of(context).size;
  return Scaffold(
    backgroundColor: Colors.white,
    body: FutureBuilder(
        future: _getbottle(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.hasData == false) {
            return CircularProgressIndicator();
          } else if (snapshot.hasError) {
            return Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                'Error: ${snapshot.error}',
                style: TextStyle(fontSize: 15),
              ),
            );
          } else {
            print(123412);
            print(snapshot.data.dosage);
            return Container(
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
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          Text(
                                            snapshot.data.dosage == null
                                                ? '-'
                                                : snapshot.data.dosage
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
            );
          }
        }),
  );
}
