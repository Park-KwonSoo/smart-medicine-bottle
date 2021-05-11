import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../shared/colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class DEVInformation extends StatefulWidget {
  @override
  _DEVInformationState createState() => _DEVInformationState();
}

class _DEVInformationState extends State<DEVInformation> {
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          child: Text('개발자 정보 작업 구역'),
        ),
      ),
    );
  }
}
