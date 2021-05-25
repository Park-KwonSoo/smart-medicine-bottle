import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
// Screen import
import 'RegisterBottle.dart';
import '../models/Bottle.dart';
import 'BottleList.dart';
import '../../utils/user_secure_stoarge.dart';

class HubList extends StatefulWidget {
  List<int> hublist;
  HubList({Key key, this.hublist}) : super(key: key);

  @override
  _HubListState createState() => _HubListState();
}

class _HubListState extends State<HubList> {
  List<Bottle> _bottleList = new List<Bottle>();
  //Get BottleList
  Future<String> getBottleList(int hubid) async {
    String usertoken = await UserSecureStorage.getUserToken();
    http.Response response = await http.get(
      Uri.encodeFull(
          DotEnv().env['SERVER_URL'] + 'bottle/hub/' + hubid.toString()),
      headers: {"authorization": usertoken},
    );
    print(response.body);
    if (_bottleList.length != 0) {
      _bottleList.clear();
    }
    if (response.statusCode == 200) {
      List<dynamic> values = new List<dynamic>();
      values = json.decode(response.body);

      for (int i = 0; i < values.length; i++) {
        Map<String, dynamic> map = values[i];
        _bottleList.add(Bottle.fromJson(map));
        return "GET";
      }
    } else if (response.statusCode == 404) {
      return "Not Found";
    } else {
      return "Error";
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
                    '등록된 허브 리스트',
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
                  itemCount: widget.hublist.length,
                  itemBuilder: (BuildContext context, int index) {
                    return Container(
                      padding: EdgeInsets.all(8.0),
                      decoration: BoxDecoration(border: Border.all()),
                      child: ListTile(
                          title: Text(
                            'HUB ID: ' + '${widget.hublist[index]}',
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 20,
                                fontFamily: 'Noto',
                                fontWeight: FontWeight.bold),
                          ),
                          trailing: Icon(Icons.arrow_forward),
                          onTap: () async {
                            //허브 id로 가져와서 있으면 바로 넘기기
                            var result =
                                await getBottleList(widget.hublist[index]);
                            if (result == "GET") {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (BuildContext context) =>
                                        BottleList(
                                            bottlelist: _bottleList,
                                            hubid: widget.hublist[index]
                                                .toString()),
                                  ));
                            } else if (result == "Not Found") {
                              showDialog(
                                  context: context,
                                  builder: (BuildContext context) {
                                    return AlertDialog(
                                      title: new Text('Error'),
                                      content: new Text('등록된 약병이 없습니다.'),
                                      actions: <Widget>[
                                        new FlatButton(
                                            child: new Text('등록'),
                                            onPressed: () {
                                              Navigator.push(
                                                  context,
                                                  MaterialPageRoute(
                                                    builder: (BuildContext
                                                            context) =>
                                                        RegisterBottle(
                                                            hubid: widget
                                                                .hublist[index]
                                                                .toString()),
                                                  ));
                                            })
                                      ],
                                    );
                                  });
                            }
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
