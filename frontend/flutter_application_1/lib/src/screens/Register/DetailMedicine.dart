import 'package:Smart_Medicine_Box/src/screens/DashBoard.dart';
import 'package:Smart_Medicine_Box/src/screens/Homepage.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../models/Medicine.dart';
import '../../utils/user_secure_stoarge.dart';

class DetailMedicine extends StatefulWidget {
  Medicine searchMedicine;
  String bottleId;
  DetailMedicine({Key key, this.searchMedicine, this.bottleId})
      : super(key: key);
  @override
  _DetailMedicineState createState() => _DetailMedicineState();
}

class _DetailMedicineState extends State<DetailMedicine> {
  final medicineDosageController = TextEditingController();
  //약 등록
  Future<String> patchMedcine() async {
    String usertoken = await UserSecureStorage.getUserToken();
    print(widget.searchMedicine.medicineId);
    print(widget.bottleId);
    http.Response response = await http.patch(
        Uri.encodeFull(
            DotEnv().env['SERVER_URL'] + 'bottle/' + widget.bottleId),
        headers: {
          "Content-Type": "application/json",
          "authorization": usertoken
        },
        body: jsonEncode({
          'medicineId': widget.searchMedicine.medicineId,
          'dosage': medicineDosageController.text
        }));
    print(response.body);
    if (response.statusCode == 200) {
      String usertoken = await UserSecureStorage.setMedicineId(
          widget.searchMedicine.medicineId.toString());
      return "Complete";
    } else if (response.statusCode == 404) {
      return "약병이 존재하지 않습니다.";
    } else if (response.statusCode == 403) {
      return "약병에 접근할 권한이 없습니다.";
    } else {
      return "알 수 없는 오류";
    }
  }

  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    return MaterialApp(
      home: Scaffold(
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
        body: SingleChildScrollView(
          scrollDirection: Axis.vertical,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              SizedBox(height: 30),
              Container(
                padding: EdgeInsets.fromLTRB(5, 5, 5, 5),
                height: size.height * 0.08,
                width: size.width,
                child: Center(
                  child: Text(
                    '세부 약 정보',
                    textAlign: TextAlign.center,
                    textScaleFactor: 1.0,
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 36,
                        fontFamily: 'NotoSansKR',
                        fontWeight: FontWeight.w700),
                  ),
                ),
              ),
              SizedBox(height: 5),
              Container(
                width: size.width,
                padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
                margin: EdgeInsets.all(15),
                decoration: BoxDecoration(
                  border: Border.all(),
                  borderRadius: BorderRadius.all(
                      Radius.circular(25.0) //         <--- border radius here
                      ),
                ),
                child: Column(
                  children: [
                    SizedBox(height: 40),
                    Container(
                      child: Center(
                        child: Text(widget.searchMedicine.name,
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 24,
                                fontFamily: 'NotoSansKR',
                                fontWeight: FontWeight.w700)),
                      ),
                    ),
                    SizedBox(height: 15),
                    Container(
                      width: size.width,
                      alignment: Alignment(0.9, 0),
                      child: Text(
                        '제조사: ' + widget.searchMedicine.company,
                        style: TextStyle(
                          color: Colors.grey,
                          fontSize: 20,
                        ),
                      ),
                    ),
                    SizedBox(height: 30),
                    Container(
                      width: size.width,
                      padding: EdgeInsets.fromLTRB(5, 0, 5, 0),
                      alignment: Alignment(-1, 0),
                      child: Text(
                        '타겟 층 : ' + widget.searchMedicine.target,
                        style: TextStyle(color: Colors.black, fontSize: 16),
                      ),
                    ),
                    SizedBox(height: 15),
                    Container(
                      width: size.width,
                      padding: EdgeInsets.fromLTRB(5, 0, 5, 0),
                      alignment: Alignment(-1, 0),
                      child: Text(
                        '복약 정보 : ' + widget.searchMedicine.dosage,
                        style: TextStyle(color: Colors.black, fontSize: 16),
                      ),
                    ),
                    SizedBox(height: 10),
                    Container(
                      width: size.width,
                      padding: EdgeInsets.fromLTRB(5, 10, 5, 10),
                      alignment: Alignment(-1, 0),
                      child: Column(
                        children: [
                          SizedBox(
                            height: 12,
                          ),
                          Container(
                            width: size.width,
                            child: Text(
                              '경고',
                              style: TextStyle(
                                  color: Colors.redAccent, fontSize: 14),
                            ),
                          ),
                          SizedBox(height: 12),
                          Container(
                            width: size.width,
                            child: Text(
                              widget.searchMedicine.warn,
                              style: TextStyle(
                                  color: Colors.redAccent, fontSize: 14),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 12),
              Container(
                height: size.height * 0.1,
                padding: const EdgeInsets.fromLTRB(20, 10, 20, 5),
                child: TextFormField(
                    keyboardType: TextInputType.text,
                    controller: medicineDosageController,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      errorBorder: InputBorder.none,
                      disabledBorder: InputBorder.none,
                      hintText: '하루에 섭취할 적정 복용량을 숫자만 입력하세요',
                    ),
                    style: TextStyle(
                        fontSize: 16,
                        fontFamily: 'NotoSansKR',
                        fontWeight: FontWeight.w600)),
              ),
              SizedBox(height: 12),
              Container(
                height: size.height * 0.07,
                width: size.width * 0.8,
                child: FlatButton(
                  padding: EdgeInsets.fromLTRB(0, 5, 0, 5),
                  onPressed: () async {
                    String saveMessage = await patchMedcine();
                    if (saveMessage == "Complete") {
                      showDialog(
                          context: context,
                          builder: (BuildContext context) {
                            return AlertDialog(
                              title: new Text('약 등록'),
                              content: new Text('약 등록이 완료 되었습니다.'),
                              actions: <Widget>[
                                new FlatButton(
                                    child: new Text('Close'),
                                    onPressed: () {
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (BuildContext context) =>
                                              DashBoard(
                                            pageNumber: 1,
                                          ),
                                        ),
                                      );
                                    })
                              ],
                            );
                          });
                    }
                  },
                  child: Text(
                    '약 등록',
                    textScaleFactor: 1.0,
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontFamily: 'Noto',
                        fontWeight: FontWeight.bold),
                  ),
                  color: Color(0xff1674f6),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(50)),
                ),
              ),
              SizedBox(height: 30)
            ],
          ),
        ),
      ),
    );
  }
}
