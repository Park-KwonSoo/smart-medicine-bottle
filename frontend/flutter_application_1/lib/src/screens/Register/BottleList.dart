import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../models/Bottle.dart';
import '../DashBoard.dart';
import '../models/Medicine.dart';

class BottleList extends StatefulWidget {
  List<Bottle> bottlelist;
  String hubid;
  BottleList({Key key, this.bottlelist, this.hubid}) : super(key: key);

  @override
  _BottleListState createState() => _BottleListState();
}

class _BottleListState extends State<BottleList> {
  Bottle _bottleinformation = new Bottle();
  Medicine _medicineinformation = new Medicine();

  Future<Bottle> getbottle(int index) async {
    http.Response response = await http.get(Uri.encodeFull(
        DotEnv().env['SERVER_URL'] +
            'bottle/' +
            widget.bottlelist[index].bottleId.toString()));

    if (response.statusCode == 200) {
      Map<String, dynamic> jsonData = jsonDecode(response.body);
      print(jsonData);
      _bottleinformation = Bottle.fromJson(jsonData);
    }
  }

  Future<Bottle> getmedicine(int index) async {
    http.Response medicineresponse = await http.get(Uri.encodeFull(
        DotEnv().env['SERVER_URL'] +
            'medicine/' +
            widget.bottlelist[index].medicineId.toString()));
    if (medicineresponse.statusCode == 200) {
      Map<String, dynamic> data = jsonDecode(medicineresponse.body);
      _medicineinformation = Medicine.fromJson(data);
    }
  }

  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Container(
          height: size.height,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              SizedBox(height: 70),
              Container(
                height: size.height * 0.1,
                width: size.width,
                child: Center(
                  child: Text(
                    '등록된 약병 리스트',
                    textScaleFactor: 1.0,
                    style: TextStyle(
                        fontSize: 28,
                        fontFamily: 'Noto',
                        fontWeight: FontWeight.bold),
                  ),
                ),
                decoration: BoxDecoration(border: Border.all()),
              ),
              SizedBox(height: 30),
              Expanded(
                child: ListView.separated(
                  padding: const EdgeInsets.all(30),
                  itemCount: widget.bottlelist.length == null
                      ? 0
                      : widget.bottlelist.length,
                  itemBuilder: (BuildContext context, int index) {
                    return Container(
                      padding: EdgeInsets.all(8.0),
                      decoration: BoxDecoration(border: Border.all()),
                      child: ListTile(
                          title: Text(
                            'BOTTLE ID : ' +
                                '${widget.bottlelist[index].bottleId}',
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 20,
                                fontFamily: 'Noto',
                                fontWeight: FontWeight.bold),
                          ),
                          trailing: Icon(Icons.arrow_forward),
                          onTap: () async {
                            getbottle(index);
                            getmedicine(index);
                            print(_bottleinformation);
                            print(_medicineinformation);

                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (BuildContext context) => DashBoard(
                                    pageNumber: 1,
                                    bottleInformation: _bottleinformation,
                                    medicineInformation: _medicineinformation,
                                  ),
                                ));
                          }),
                    );
                  },
                  separatorBuilder: (BuildContext contetx, int index) =>
                      const Divider(),
                ),
              )
            ],
          )),
    );
  }
}
