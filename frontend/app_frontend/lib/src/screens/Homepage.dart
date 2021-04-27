import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  final String pageTitle;
  HomePage({Key key, this.pageTitle}) : super(key: key);

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
      appBar: AppBar(
        title: Text('HomePage'),
      ),
      body: Text('홈페이지 작업 영역'),
    );
  }
}
