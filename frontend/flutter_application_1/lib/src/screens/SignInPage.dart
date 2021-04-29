import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class SignInPage extends StatefulWidget {
  @override
  _SignInPageState createState() => _SignInPageState();
}

///
class _SignInPageState extends State<SignInPage> {
  bool passwordVisible = false;
  bool _validateEmail = false;
  bool _validatePassword = false;
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    final mqData = MediaQuery.of(context);
    final mqDataScale = mqData.copyWith(textScaleFactor: 1.0);

    return WillPopScope(
      onWillPop: () {
        if (Navigator.canPop(context)) {
          //Navigator.pop(context);
          Navigator.of(context).pop();
        } else {
          SystemNavigator.pop();
        }
      },
      child: Scaffold(
        // appBar: AppBar(
        //     elevation: 0,
        //     backgroundColor: white,
        //     title: Padding(
        //       padding: const EdgeInsets.fromLTRB(0, 0, 0, 0),
        //       child: Text('',
        //           textScaleFactor: 1.0,
        //           style: TextStyle(
        //               color: Colors.grey, fontFamily: 'Noto', fontSize: 16)),
        //     )),
        body: Builder(
          builder: (BuildContext context) {
            return ListView(
              children: <Widget>[
                Padding(
                  padding: EdgeInsets.only(top: 25, left: 18, right: 18),
                  child: Stack(
                    children: <Widget>[
                      Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Padding(
                            padding: const EdgeInsets.fromLTRB(20, 0, 0, 0),
                            child: Text('로그인',
                                textScaleFactor: 1.0,
                                style: TextStyle(
                                    fontSize: 34,
                                    fontFamily: 'Noto',
                                    fontWeight: FontWeight.bold)),
                          ),
                          Padding(
                            padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
                            child: new Column(
                              children: <Widget>[
                                MediaQuery(
                                  data: mqDataScale,
                                  child: TextFormField(
                                    keyboardType: TextInputType.text,
                                    controller: emailController,
                                    decoration: InputDecoration(
                                      labelText: '이메일',
                                      helperText: '이메일 주소를 입력해주세요.',
                                      contentPadding:
                                          EdgeInsets.fromLTRB(0, 5, 0, 5),
                                      errorText: _validateEmail
                                          ? '등록되지 않은 아이디입니다.'
                                          : null,
                                      labelStyle: TextStyle(
                                          fontSize: 14,
                                          color: Color(0xff000000)),
                                      helperStyle: TextStyle(
                                          fontSize: 12,
                                          color: Color(0xffb2b2b2)),
                                      // Here is key idea
                                    ),
                                  ),
                                )
                              ],
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
                            child: new Column(
                              children: <Widget>[
                                MediaQuery(
                                  data: mqDataScale,
                                  child: TextFormField(
                                    keyboardType: TextInputType.text,
                                    controller: passwordController,
                                    obscureText:
                                        !passwordVisible, //This will obscure text dynamically
                                    decoration: InputDecoration(
                                      labelText: '비밀번호',
                                      helperText: '비밀번호를 입력해 주세요.',
                                      errorText: _validatePassword
                                          ? '비밀번호가 일치하지 않습니다.'
                                          : null,
                                      labelStyle: TextStyle(
                                          fontSize: 14,
                                          color: Color(0xff000000)),
                                      helperStyle: TextStyle(
                                          fontSize: 12,
                                          color: Color(0xffb2b2b2)),
                                      // Here is key idea
                                      suffixIcon: IconButton(
                                        icon: Icon(
                                          // Based on passwordVisible state choose the icon
                                          passwordVisible
                                              ? Icons.visibility
                                              : Icons.visibility_off,
                                          color: Color(0xff2c2c2c),
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
                                )
                              ],
                            ),
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                              Container(
                                width: size.width * 0.8,
                                height: 46,
                                child: RaisedButton(
                                  color: Color(0xff1674f6),
                                  child: Text("로그인",
                                      textScaleFactor: 1.0,
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 16,
                                          fontFamily: 'Noto',
                                          fontWeight: FontWeight.bold)),
                                  onPressed: () async {
                                    String saveMessage;
                                    if (emailController.text.isEmpty ||
                                        passwordController.text.isEmpty) {
                                      showDialog(
                                          context: context,
                                          builder: (BuildContext context) {
                                            return AlertDialog(
                                              title: new Text('이메일 & 비밀번호'),
                                              content: new Text(
                                                  '이메일과 비밀번호를 입력해주세요.'),
                                              actions: <Widget>[
                                                new FlatButton(
                                                    child: new Text('Close'),
                                                    onPressed: () {
                                                      Navigator.of(context)
                                                          .pop();
                                                    })
                                              ],
                                            );
                                          });
                                    }
                                  },
                                  shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(20)),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
