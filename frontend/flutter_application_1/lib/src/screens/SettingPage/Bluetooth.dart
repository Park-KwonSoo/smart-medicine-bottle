import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../shared/colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class Bluetooth extends StatefulWidget {
  @override
  _BluetoothState createState() => _BluetoothState();
}

class _BluetoothState extends State<Bluetooth> {
  Widget build(BuildContext context) {
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
