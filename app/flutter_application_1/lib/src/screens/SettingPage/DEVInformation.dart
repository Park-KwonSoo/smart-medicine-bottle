import 'package:flutter/material.dart';

import 'package:Smart_Medicine_Box/src/screens/SettingPage.dart';

class DEVInformation extends StatefulWidget {
  @override
  _DEVInformationState createState() => _DEVInformationState();
}

class _DEVInformationState extends State<DEVInformation> {
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
      body: Text('1234'),
    );
  }
}
