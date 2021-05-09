import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../shared/colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class DashBoard extends StatefulWidget {
  int pageNumber = 1;

  @override
  _DashBoardState createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  int _selectedIndex = 0;

  Widget build(BuildContext context) {
    _selectedIndex = widget.pageNumber;
    final Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xffe5f4ff),
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(65),
        child: Container(
          padding: const EdgeInsets.fromLTRB(0, 10, 0, 0),
          color: Colors.white,
          child: AppBar(
            backgroundColor: Colors.white,
            actions: <Widget>[
              Container(
                width: size.width * 0.25,
                child: FlatButton(
                  onPressed: () => {
                    _onItemTapped(0),
                  },
                  child: Stack(
                    children: <Widget>[
                      Container(
                        margin: EdgeInsets.fromLTRB(0, 4, 0, 0),
                        padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
                        child: Text(
                          '임시1',
                          style: TextStyle(
                              color: widget.pageNumber == 0
                                  ? Color(0xff1674f6)
                                  : null,
                              fontSize: 14,
                              fontFamily: 'Noto',
                              fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Container(
                width: size.width * 0.25,
                child: FlatButton(
                  onPressed: () => {
                    _onItemTapped(1),
                  },
                  child: Stack(
                    children: <Widget>[
                      Container(
                        margin: EdgeInsets.fromLTRB(0, 4, 0, 0),
                        padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
                        child: Text(
                          '임시2',
                          style: TextStyle(
                              color: widget.pageNumber == 1
                                  ? Color(0xff1674f6)
                                  : null,
                              fontSize: 14,
                              fontFamily: 'Noto',
                              fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Container(
                width: size.width * 0.25,
                child: FlatButton(
                  onPressed: () => {
                    _onItemTapped(2),
                  },
                  child: Stack(
                    children: <Widget>[
                      Container(
                        margin: EdgeInsets.fromLTRB(0, 4, 0, 0),
                        padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
                        child: Text(
                          '임시3',
                          style: TextStyle(
                              color: widget.pageNumber == 2
                                  ? Color(0xff1674f6)
                                  : null,
                              fontSize: 14,
                              fontFamily: 'Noto',
                              fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Container(
                width: size.width * 0.25,
                child: FlatButton(
                  onPressed: () => {
                    _onItemTapped(3),
                  },
                  child: Stack(
                    children: <Widget>[
                      Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            margin: EdgeInsets.fromLTRB(0, 4, 0, 0),
                            padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
                            child: Image.asset(
                              'images/setting.png',
                              color: widget.pageNumber == 3
                                  ? Color(0xff1674f6)
                                  : null,
                            ),
                          ),
                        ],
                      )
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _onItemTapped(int index) {
    setState(() {
      widget.pageNumber = index;
    });
  }
}
