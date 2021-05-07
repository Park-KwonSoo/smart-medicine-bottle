import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../shared/colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class DashBoard extends StatefulWidget {
  @override
  _DashBoardState createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xffe5f4ff),
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(65),
        child:Container(
          padding : const EdgeInsets.fromLTRB(0,10,0,0),
          color: Colors.white,
          child : AppBar(
            backgroundColor: Colors.white,
            actions: <Widget> [
              Container (
                width : size.width * 0.2
              
              )

            ],

          ))
      ),
    )
  }
}
