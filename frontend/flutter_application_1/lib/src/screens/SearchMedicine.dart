import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'models/Bottle.dart';
import 'DashBoard.dart';

class SearchMedicine extends StatefulWidget {
  @override
  _SearchMedicineState createState() => _SearchMedicineState();
}

class _SearchMedicineState extends State<SearchMedicine> {
  final medicineNameController = TextEditingController();
  final medicineFactureController = TextEditingController();

  Widget build(BuildContext context) {
    bool isForward = false;
    final Size size = MediaQuery.of(context).size;
    // int goals = 60;
    // int points = 75;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        leading: new Icon(Icons.medical_services_rounded,
            color: Colors.black, size: 45.0),
        title: Text(
          'Smart Medicine Box',
          style: TextStyle(
              color: Colors.black,
              fontSize: 23,
              fontFamily: 'Noto',
              fontWeight: FontWeight.bold),
        ),
      ),
      body: Container(
        height: size.height,
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          border: Border.all(),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            SizedBox(height: 20),
            Container(
              height: size.height * 0.13,
              decoration: BoxDecoration(
                border: Border.all(),
                color: Colors.white,
                borderRadius: BorderRadius.circular(25),
              ),
              child: Row(
                children: [
                  Column(
                    children: [
                      Container(
                        height: size.height * 0.0635,
                        width: size.width * 0.75,
                        child: Row(
                          children: [
                            Container(
                              width: size.width * 0.16,
                              padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                              child: Text('약이름:',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                      fontSize: 16,
                                      fontFamily: 'NotoSansKR',
                                      fontWeight: FontWeight.w600)),
                            ),
                            Container(
                              padding: const EdgeInsets.fromLTRB(5, 0, 0, 0),
                              width: size.width * 0.55,
                              child: TextFormField(
                                  keyboardType: TextInputType.text,
                                  controller: medicineNameController,
                                  decoration: InputDecoration(
                                    border: InputBorder.none,
                                    focusedBorder: InputBorder.none,
                                    enabledBorder: InputBorder.none,
                                    errorBorder: InputBorder.none,
                                    disabledBorder: InputBorder.none,
                                    hintText: '약 이름을 입력하세요',
                                  ),
                                  style: TextStyle(
                                      fontSize: 16,
                                      fontFamily: 'NotoSansKR',
                                      fontWeight: FontWeight.w600)),
                            )
                          ],
                        ),
                        decoration: BoxDecoration(
                          border: Border(
                            bottom: BorderSide(
                                color: Colors.black,
                                width: 1,
                                style: BorderStyle.solid),
                            right: BorderSide(
                                color: Colors.black,
                                width: 1,
                                style: BorderStyle.solid),
                          ),
                        ),
                      ),
                      Container(
                        height: size.height * 0.0635,
                        width: size.width * 0.75,
                        child: Row(
                          children: [
                            Container(
                              width: size.width * 0.16,
                              padding: const EdgeInsets.fromLTRB(5, 0, 0, 3),
                              child: Text('제조사:',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                      fontSize: 16,
                                      fontFamily: 'NotoSansKR',
                                      fontWeight: FontWeight.w600)),
                            ),
                            Container(
                              padding: const EdgeInsets.fromLTRB(6, 0, 0, 0),
                              width: size.width * 0.50,
                              child: TextFormField(
                                  keyboardType: TextInputType.text,
                                  controller: medicineFactureController,
                                  decoration: InputDecoration(
                                    border: InputBorder.none,
                                    focusedBorder: InputBorder.none,
                                    enabledBorder: InputBorder.none,
                                    errorBorder: InputBorder.none,
                                    disabledBorder: InputBorder.none,
                                    hintText: '약 제조사 이름을 입력하세요',
                                  ),
                                  style: TextStyle(
                                      fontSize: 16,
                                      fontFamily: 'NotoSansKR',
                                      fontWeight: FontWeight.w600)),
                            )
                          ],
                        ),
                        decoration: BoxDecoration(
                          border: Border(
                            right: BorderSide(
                                color: Colors.black,
                                width: 1,
                                style: BorderStyle.solid),
                          ),
                        ),
                      ),
                    ],
                  ),
                  Container(
                    height: size.height * 0.0635 * 2,
                    width: size.width * 0.14,
                    padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                    child: IconButton(
                      icon: Icon(Icons.search, size: 40),
                      onPressed: () {
                        //검색 함수를 여기다가
                      },
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 20),
            Expanded(
                child: ListView.separated(
                    itemBuilder: (BuildContext context, int index) {},
                    separatorBuilder: (BuildContext contetx, int index) =>
                        const Divider(),
                    itemCount: 0))
          ],
        ),
      ),
    );
  }
}
