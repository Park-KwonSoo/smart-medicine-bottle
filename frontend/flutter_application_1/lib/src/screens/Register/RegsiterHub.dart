import 'package:flutter/cupertino.dart';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

import 'RegisterBottle.dart';
import '../../utils/user_secure_stoarge.dart';

class RegisterHub extends StatefulWidget {
  @override
  _RegisterHubState createState() => _RegisterHubState();
}

class _RegisterHubState extends State<RegisterHub> {
  final medicineBottleIDController = TextEditingController();
  final medicineHubIDController = TextEditingController();
  final medicineHubPortController = TextEditingController();
  final medicineHubHostController = TextEditingController();

  Future<String> registerhub_Validate() async {
    String usertoken = await UserSecureStorage.getUserToken();
    http.Response hubresponse = await http.post(
        Uri.encodeFull(DotEnv().env['SERVER_URL'] + 'hub'),
        headers: {
          "Content-Type": "application/json",
          "authorization": usertoken
        },
        body: jsonEncode({
          'hubId': medicineHubIDController.text,
          'host': medicineHubHostController.text,
          'port': medicineHubPortController.text,
        }));

    if (hubresponse.statusCode == 201) {
      return "허브 등록 완료";
    } else if (hubresponse.statusCode == 409) {
      return "이미 존재하는 hub";
    } else {
      return "오류";
    }
  }

  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    // int goals = 60;
    // int points = 75;

    return Scaffold(
      backgroundColor: Colors.white,
      body: ListView(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 25, 20, 0),
            child: Row(
              children: <Widget>[
                Text(
                  '허브 등록',
                  textScaleFactor: 1.0,
                  style: TextStyle(fontSize: 34),
                )
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 10, 20, 0),
            child: Row(
              children: <Widget>[
                Text(
                  'SmartMedicine 허브 등록',
                  textScaleFactor: 1.0,
                  style: TextStyle(fontSize: 16),
                )
              ],
            ),
          ),
          MediaQuery(
            data: MediaQuery.of(context).copyWith(textScaleFactor: 1.0),
            child: Container(
              height: size.height * 0.6,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 5, 20, 20),
                child: new Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    TextFormField(
                      keyboardType: TextInputType.text,
                      controller: medicineHubIDController,
                      decoration: InputDecoration(
                        labelText: '허브 ID',
                        helperText: '현자 등록하시는 허브의 고유 번호를 입력하세요',
                      ),
                    ),
                    TextFormField(
                      keyboardType: TextInputType.text,
                      controller: medicineHubHostController,
                      decoration: InputDecoration(
                        labelText: 'Host',
                        helperText: '현재 사용하시는 허브의 HOST를 입력하세요',
                      ),
                    ),
                    TextFormField(
                      keyboardType: TextInputType.text,
                      controller: medicineHubPortController,
                      decoration: InputDecoration(
                        labelText: 'Port',
                        helperText: '현재 사용하시는 허브의 PORT를 입력하세요',
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          Container(
            height: 80,
            padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
            child: RaisedButton(
              onPressed: () async {
                String saveMessage = await registerhub_Validate();
                print(saveMessage);
                if (saveMessage == "허브 등록 완료") {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (BuildContext context) =>
                            RegisterBottle(hubid: medicineHubIDController.text),
                      ));
                }
              },
              shape: RoundedRectangleBorder(
                  borderRadius: new BorderRadius.circular(18.0),
                  side: BorderSide(color: Colors.blue)),
              color: Color(0xff1674f6),
              child: Text(
                ' 허브 등록 ',
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
      bottomNavigationBar: BottomAppBar(
        elevation: 0,
        child: Container(
          height: 70,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.fromLTRB(70, 0, 70, 0),
                child: Text(
                  '회원 가입시, 이용 약관 및 개인정보 처리 방침에 동의하는 것으로 간주합니다..',
                  style: TextStyle(fontSize: 12, color: Color(0xff747474)),
                  textAlign: TextAlign.center,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
