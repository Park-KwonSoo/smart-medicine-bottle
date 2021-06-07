import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../models/Medicine.dart';
import 'DetailMedicine.dart';
import '../../utils/user_secure_stoarge.dart';

class SearchMedicine extends StatefulWidget {
  String bottleId;
  SearchMedicine({Key key, this.bottleId}) : super(key: key);
  @override
  _SearchMedicineState createState() => _SearchMedicineState();
}

class _SearchMedicineState extends State<SearchMedicine> {
  List<Medicine> _medicineList = new List<Medicine>();
  final medicineNameController = TextEditingController();
  final medicineCompanyController = TextEditingController();

  Future<String> postMeicineList() async {
    String usertoken = await UserSecureStorage.getUserToken();
    http.Response response = await http.post(
        Uri.encodeFull(DotEnv().env['SERVER_URL'] + 'medicine'),
        headers: {
          "Content-Type": "application/json",
          "authorization": usertoken
        },
        body: jsonEncode({
          'name': medicineNameController.text,
          'company': medicineCompanyController.text,
        }));

    if (_medicineList.length != 0) {
      _medicineList.clear();
    }
    if (response.statusCode == 200) {
      List<dynamic> values = new List<dynamic>();
      values = json.decode(response.body);
      for (int i = 0; i < values.length; i++) {
        Map<String, dynamic> map = values[i];
        _medicineList.add(Medicine.fromJson(map));
      }
      return "GET";
    } else {
      return "Not Found";
    }
  }

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
                                  controller: medicineCompanyController,
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
                      onPressed: () async {
                        String saveMessage = await postMeicineList();
                        if (saveMessage == "GET") {
                          setState(() {});
                        }
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
                    itemBuilder: (BuildContext context, int index) {
                      return Container(
                        padding: EdgeInsets.all(8.0),
                        decoration: BoxDecoration(border: Border.all()),
                        child: ListTile(
                            title: Text(
                              'Medicine: ' + _medicineList[index].name,
                              style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 20,
                                  fontFamily: 'Noto',
                                  fontWeight: FontWeight.bold),
                            ),
                            trailing: Icon(Icons.arrow_forward),
                            onTap: () async {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (BuildContext context) =>
                                        DetailMedicine(
                                      searchMedicine: _medicineList[index],
                                      bottleId: widget.bottleId,
                                    ),
                                  ));
                            }),
                      );
                    },
                    separatorBuilder: (BuildContext contetx, int index) =>
                        const Divider(),
                    itemCount: _medicineList.length == null
                        ? 0
                        : _medicineList.length))
          ],
        ),
      ),
    );
  }
}
