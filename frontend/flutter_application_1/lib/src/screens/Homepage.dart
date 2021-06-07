import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../shared/colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import './Register/SignInPage.dart';
import 'Register/SignUpLocal.dart';

class HomePage extends StatefulWidget {
  HomePage({Key key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

/// first page class
class _HomePageState extends State<HomePage> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;

    return Scaffold(
      body: GestureDetector(
        child: Container(
          color: Colors.white,
          height: size.height,
          child: Center(
              child: MediaQuery(
            data: MediaQuery.of(context).copyWith(textScaleFactor: 1.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                Container(
                  height: size.height * 0.5,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: <Widget>[
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Text(
                            'SMART MEDICINE BOX',
                            textScaleFactor: 1.0,
                            style: TextStyle(
                                color: Color(0xff004ca2),
                                fontSize: 30,
                                fontFamily: 'Noto',
                                fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                      AnimatedOpacity(
                        opacity: 1,
                        duration: Duration(milliseconds: 500),
                        child: Container(
                            padding: EdgeInsets.fromLTRB(0, 0, 0, 20),
                            child: Image.asset('images/main_logo.png',
                                width: 200, height: 250)),
                      ),
                    ],
                  ),
                ),
                Container(
                  height: size.height * 0.3,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisSize: MainAxisSize.max,
                    children: <Widget>[
                      GestureDetector(
                        child: Container(
                          width: size.width * 0.8,
                          height: 46,
                          margin: EdgeInsets.only(bottom: 0),
                          child: FlatButton(
                            padding: EdgeInsets.fromLTRB(0, 5, 0, 5),
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (BuildContext context) =>
                                      SignInPage(),
                                ),
                              );
                            },
                            child: Text(
                              '로그인',
                              textScaleFactor: 1.0,
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 16,
                                  fontFamily: 'Noto',
                                  fontWeight: FontWeight.bold),
                            ),
                            color: Color(0xff1674f6),
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(50)),
                          ),
                        ),
                      ),
                      GestureDetector(
                        child: Container(
                          width: size.width * 0.8,
                          padding: EdgeInsets.all(0),
                          child: OutlineButton(
                            padding: EdgeInsets.fromLTRB(0, 25, 0, 15),
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (BuildContext context) =>
                                      SignUpLocal(),
                                ),
                              );
                            },
                            child: Text(
                              '회원 가입',
                              textScaleFactor: 1.0,
                              style:
                                  TextStyle(fontSize: 16, fontFamily: 'Noto'),
                            ),
                            textColor: Colors.black,
                            highlightedBorderColor: highlightColor,
                            borderSide: BorderSide.none,
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(50)),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          )),
        ),
      ),
      backgroundColor: bgColor,
    );
  }
}
