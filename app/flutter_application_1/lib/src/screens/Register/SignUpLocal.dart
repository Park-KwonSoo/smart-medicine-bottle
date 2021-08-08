import 'dart:convert';
import 'package:Smart_Medicine_Box/src/screens/Homepage.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

import 'RegsiterHub.dart';

class SignUpLocal extends StatefulWidget {
  @override
  _SignUpLocalState createState() => _SignUpLocalState();
}

class _SignUpLocalState extends State<SignUpLocal> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final passwordValidController = TextEditingController();
  bool _validate = false;
  int userRole = 0;

  // Initially password is obscure
  bool passwordVisible = false;
  bool passwordValidationVisible = false;

  Future<String> signup_Validate() async {
    http.Response response = await http.post(
      Uri.encodeFull(DotEnv().env['SERVER_URL'] + 'auth/register'),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode(
        {
          'userId': emailController.text,
          'password': passwordController.text,
          'passwordCheck': passwordValidController.text
        },
      ),
    );
    if (response.statusCode == 201) {
      return "정보 입력 완료";
    } else {
      return "오류";
    }
  }

  @override
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
                  '회원 가입',
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
                      controller: emailController,
                      keyboardType: TextInputType.text,
                      decoration: InputDecoration(
                        labelText: '이메일',
                        helperText: '아아디로 사용할 이메일 주소를 입력해주세요.',
                      ),
                    ),
                    TextFormField(
                      keyboardType: TextInputType.text,
                      controller: passwordController,
                      obscureText:
                          !passwordVisible, //This will obscure text dynamically
                      decoration: InputDecoration(
                        labelText: '비밀번호',
                        helperText: '비밀번호를 입력해주세요',
                        // Here is key idea
                        suffixIcon: IconButton(
                          icon: Icon(
                            // Based on passwordVisible state choose the icon
                            passwordVisible
                                ? Icons.visibility
                                : Icons.visibility_off,
                            color: Theme.of(context).primaryColorDark,
                          ),
                          onPressed: () {
                            // Update the state i.e. toogle the state of passwordVisible variable
                            setState(() {
                              passwordVisible = !passwordVisible;
                            });
                          },
                        ),
                      ),
                    ),
                    TextFormField(
                      onChanged: (text) {
                        if (passwordController.text == text) {
                          setState(() {
                            _validate = false;
                          });
                        } else {
                          setState(() {
                            _validate = true;
                          });
                        }
                      },
                      keyboardType: TextInputType.text,
                      controller: passwordValidController,
                      obscureText:
                          !passwordValidationVisible, //This will obscure text dynamically
                      decoration: InputDecoration(
                        labelText: '비밀번호 확인',
                        helperText: '비밀번호를 확인해주세요',
                        errorText:
                            _validate ? '두 비밀번호가 다릅니다. 다시 확인해주세요.' : null,
                        // Here is key idea
                        suffixIcon: IconButton(
                          icon: Icon(
                            // Based on passwordVisible state choose the icon
                            passwordValidationVisible
                                ? Icons.visibility
                                : Icons.visibility_off,
                            color: Theme.of(context).primaryColorDark,
                          ),
                          onPressed: () {
                            // Update the state i.e. toogle the state of passwordVisible variable
                            setState(() {
                              passwordValidationVisible =
                                  !passwordValidationVisible;
                            });
                          },
                        ),
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
                String saveMessage = await signup_Validate();
                if (saveMessage == "정보 입력 완료") {
                  showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: new Text('회원 가입'),
                          content: new Text('회원 가입이 완료 되었습니다.'),
                          actions: <Widget>[
                            new FlatButton(
                                child: new Text('Close'),
                                onPressed: () {
                                  Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (BuildContext context) =>
                                              HomePage()));
                                })
                          ],
                        );
                      });
                } else {
                  showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: new Text('회원 가입 오류'),
                          content: new Text('정확한 이메일, 비밀번호를 입력해 주세요.'),
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
