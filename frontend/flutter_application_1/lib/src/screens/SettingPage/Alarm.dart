import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../shared/colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class Alarm extends StatefulWidget {
  @override
  _AlarmnState createState() => _AlarmnState();
}

class _AlarmnState extends State<Alarm> {
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          child: Text('약병 내부 페이지 작업 영역'),
        ),
      ),
    );
  }
}
