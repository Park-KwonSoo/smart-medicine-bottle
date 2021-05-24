import 'package:Smart_Medicine_Box/src/screens/DashBoard.dart';
import 'package:flutter/cupertino.dart';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

import 'SearchMedicine.dart';

class RegisterBottle extends StatefulWidget {
  final String hubid;
  RegisterBottle({Key key, this.hubid}) : super(key: key);
  @override
  _RegisterBottleState createState() => _RegisterBottleState();
}

class _RegisterBottleState extends State<RegisterBottle> {
  final medicineBottleIDController = TextEditingController();

  Future<String> registerhub_Validate() async {
    http.Response bottleresponse = await http.post(
        Uri.encodeFull(DotEnv().env['SERVER_URL'] + 'bottle'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          'bottleId': medicineBottleIDController.text,
          'hubId': widget.hubid
        }));

    if (bottleresponse.statusCode == 201) {
      return "등록 완료";
    } else if (bottleresponse.statusCode == 404) {
      return "Hub 없음";
    } else if (bottleresponse.statusCode == 403) {
      return "유저 정보 없음 ";
    } else if (bottleresponse.statusCode == 404) {
      return "HOST 없음";
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
                  '약병 등록',
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
                  'SmartMedicine 회원가입',
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
                      controller: medicineBottleIDController,
                      decoration: InputDecoration(
                        labelText: '약병 ID',
                        helperText: '현재 사용하시는 약병의 고유번호를 입력하세요',
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
                if (saveMessage == "등록 완료") {
                  showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: new Text('약병 등록'),
                          content: new Text('약병 등록이 완료 되었습니다.'),
                          actions: <Widget>[
                            new FlatButton(
                              child: new Text('Close'),
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (BuildContext context) =>
                                        SearchMedicine(
                                      bottleId: medicineBottleIDController.text,
                                    ),
                                  ),
                                );
                              },
                            ),
                          ],
                        );
                      });
                } else {
                  showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: new Text('오류'),
                          content: new Text(saveMessage),
                          actions: <Widget>[
                            new FlatButton(
                                child: new Text('Close'),
                                onPressed: () {
                                  Navigator.of(context).pop();
                                })
                          ],
                        );
                      });
                }
              },
              shape: RoundedRectangleBorder(
                  borderRadius: new BorderRadius.circular(18.0),
                  side: BorderSide(color: Colors.blue)),
              color: Color(0xff1674f6),
              child: Text(
                '약병 등록',
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
