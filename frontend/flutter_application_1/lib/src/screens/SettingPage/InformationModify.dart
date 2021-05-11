import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../shared/colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class InformationModify extends StatefulWidget {
  @override
  _InformationModifyState createState() => _InformationModifyState();
}

class _InformationModifyState extends State<InformationModify> {
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          child: Text('약병 정보 변경 작업 구역'),
        ),
      ),
    );
  }
}
