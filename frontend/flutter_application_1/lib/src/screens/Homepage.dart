import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../shared/colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import './SignInPage.dart';
import './SignUpPage.dart';

class HomePage extends StatefulWidget {
  final String pageTitle;
  int screenCount = 0;
  HomePage({Key key, this.pageTitle}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

/// first page class
class _HomePageState extends State<HomePage> {
  void increaseScreen() {
    setState(() {
      widget.screenCount++;
    });
  }

  @override
  void initState() {
    SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;

    ScreenUtil.instance = ScreenUtil(width: size.width, height: size.height)
      ..init(context);

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
                                fontSize: 20,
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
                                    ));
                              },
                              child: Text(
                                '로그인        sdf',
                                textScaleFactor: 1.0,
                                style: TextStyle(
                                    fontSize: 1,
                                    fontFamily: 'Noto',
                                    fontWeight: FontWeight.bold),
                              ),
                              textColor: Colors.black,
                              color: Color(0xff1674f6),
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(50)),
                            )),
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
                                          SignUpPage(),
                                    ));
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
                            )),
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
