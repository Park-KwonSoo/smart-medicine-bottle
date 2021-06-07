import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:Smart_Medicine_Box/src/screens/SettingPage.dart';

class InformationModify extends StatefulWidget {
  @override
  _InformationModifyState createState() => _InformationModifyState();
}

class _InformationModifyState extends State<InformationModify> {
  final passwordController = TextEditingController();
  final passwordValidController = TextEditingController();
  final medicineNameController = TextEditingController();
  final medicineFactureController = TextEditingController();
  bool _validate = false;
  int userRole = 0;

  // Initially password is obscure
  bool passwordVisible = false;
  bool passwordValidationVisible = true;

  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    return Scaffold(
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
      body: ListView(
        children: <Widget>[
          Container(
            height: size.height * 0.9,
            margin: EdgeInsets.fromLTRB(0, 10, 0, 0),
            padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
            child: Column(
              children: <Widget>[
                Container(
                  padding: EdgeInsets.fromLTRB(5, 5, 5, 5),
                  height: size.height * 0.08,
                  width: size.width,
                  child: Center(
                    child: Text(
                      '회원 정보 수정',
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
                MediaQuery(
                  data: MediaQuery.of(context).copyWith(textScaleFactor: 1.0),
                  child: Container(
                    height: size.height * 0.6,
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(20, 5, 20, 20),
                      child: new Column(
                        children: <Widget>[
                          SizedBox(height: 15),
                          Container(
                            height: size.height * 0.091,
                            padding: const EdgeInsets.fromLTRB(5, 10, 5, 5),
                            child: Container(
                              width: size.width * 0.85,
                              padding: const EdgeInsets.fromLTRB(5, 16, 5, 3),
                              decoration: BoxDecoration(
                                  color: Color(0xffBDBDBD),
                                  border: Border.all(),
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(5))),
                              child: Text(
                                'test@naver.com',
                                textScaleFactor: 1.0,
                                style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 18,
                                  fontFamily: 'NotoSansKR',
                                ),
                              ),
                            ),
                          ),
                          SizedBox(height: 15),
                          Container(
                            height: size.height * 0.13,
                            padding: const EdgeInsets.fromLTRB(5, 10, 5, 5),
                            child: TextFormField(
                              keyboardType: TextInputType.text,
                              controller: passwordController,
                              obscureText:
                                  !passwordVisible, //This will obscure text dynamically
                              decoration: InputDecoration(
                                border: OutlineInputBorder(
                                    borderSide:
                                        BorderSide(color: Colors.black)),
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
                          ),
                          Container(
                            height: size.height * 0.13,
                            padding: const EdgeInsets.fromLTRB(5, 10, 5, 5),
                            child: TextFormField(
                              keyboardType: TextInputType.text,
                              controller: medicineNameController,
                              decoration: InputDecoration(
                                border: OutlineInputBorder(),
                                labelText: '약 이름',
                                helperText: '약의 이름을 읿력하세요',
                              ),
                            ),
                          ),
                          Container(
                            height: size.height * 0.13,
                            padding: const EdgeInsets.fromLTRB(5, 10, 5, 5),
                            child: TextFormField(
                              keyboardType: TextInputType.text,
                              controller: medicineFactureController,
                              decoration: InputDecoration(
                                border: OutlineInputBorder(),
                                labelText: '약 제조사 이름',
                                helperText: '약 제조사의 이름을 읿력하세요',
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                Container(
                  height: 100,
                  width: size.width * 0.7,
                  padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
                  child: RaisedButton(
                    onPressed: () async {},
                    shape: RoundedRectangleBorder(
                        borderRadius: new BorderRadius.circular(20.0),
                        side: BorderSide(color: Colors.blue)),
                    color: Color(0xff1674f6),
                    child: Text(
                      '회원 정보 수정',
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
        ],
      ),
    );
  }
}
