import 'package:Smart_Medicine_Box/src/screens/Register/RegsiterHub.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
// Screen import
import '../../utils/user_secure_stoarge.dart';

class HubModifyList extends StatefulWidget {
  List<int> hublist;
  HubModifyList({Key key, this.hublist}) : super(key: key);

  @override
  _HubModifyListState createState() => _HubModifyListState();
}

class _HubModifyListState extends State<HubModifyList> {
  List<int> _hublist = new List<int>();
  //Get Hub List 함수
  Future<String> getHubList() async {
    String usertoken = await UserSecureStorage.getUserToken();
    http.Response response = await http.get(
      Uri.encodeFull(DotEnv().env['SERVER_URL'] + 'hub'),
      headers: {"authorization": usertoken},
    );
    List<dynamic> values = new List<dynamic>();
    if (_hublist.length != 0) {
      _hublist.clear();
    }
    if (response.statusCode == 200) {
      values = json.decode(response.body);
      for (int i = 0; i < values.length; i++) {
        _hublist.add(values[i]['hubId']);
      }
      print(_hublist);
      return "get완료";
    } else if (response.statusCode == 404) {
      return "Not Found";
    } else {
      return "Error";
    }
  }

  Future<String> deleteHub(int index) async {
    String usertoken = await UserSecureStorage.getUserToken();
    http.Response response = await http.delete(
      Uri.encodeFull(DotEnv().env['SERVER_URL'] + 'hub/' + index.toString()),
      headers: {"authorization": usertoken},
    );
    if (response.statusCode == 204) {
      return "Delete";
    } else {
      return "Error";
    }
  }

  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
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
      body: FutureBuilder(
          future: getHubList(),
          builder: (BuildContext context, AsyncSnapshot snapshot) {
            if (snapshot.hasData == false) {
              return CircularProgressIndicator();
            } else if (snapshot.hasError) {
              return Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  'Error: ${snapshot.error}',
                  style: TextStyle(fontSize: 15),
                ),
              );
            } else {
              return Container(
                height: size.height,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
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
                        itemCount:
                            _hublist.length == null ? 0 : _hublist.length,
                        itemBuilder: (BuildContext context, int index) {
                          return Container(
                            padding: EdgeInsets.all(8.0),
                            decoration: BoxDecoration(
                              border: Border.all(),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(25.0)),
                            ),
                            child: ListTile(
                              title: Text(
                                'HUB ID: ' + '${_hublist[index]}',
                                style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 20,
                                    fontFamily: 'Noto',
                                    fontWeight: FontWeight.bold),
                              ),
                              trailing: Icon(Icons.highlight_remove),
                              onTap: () async {
                                if (_hublist.length == 1) {
                                  showDialog(
                                    context: context,
                                    builder: (BuildContext context) {
                                      return AlertDialog(
                                        title: new Text('허브 삭제'),
                                        content: new Text(
                                            '등록된 허브가 하나이므로 해제가 불가능 합니다.'),
                                        actions: <Widget>[
                                          new FlatButton(
                                              child: new Text('Cloes'),
                                              onPressed: () {
                                                Navigator.of(context).pop();
                                              }),
                                        ],
                                      );
                                    },
                                  );
                                } else {
                                  showDialog(
                                    context: context,
                                    builder: (BuildContext context) {
                                      return AlertDialog(
                                        title: new Text('허브 삭제'),
                                        content: new Text(
                                            _hublist[index].toString() +
                                                '을 삭제 하시겠습니까?'),
                                        actions: <Widget>[
                                          new FlatButton(
                                            child: new Text('삭제'),
                                            onPressed: () async {
                                              await deleteHub(_hublist[index]);
                                              setState(() {});
                                              Navigator.of(context).pop();
                                            },
                                          ),
                                          new FlatButton(
                                            child: new Text('취소'),
                                            onPressed: () {
                                              Navigator.of(context).pop();
                                            },
                                          )
                                        ],
                                      );
                                    },
                                  );
                                }
                              },
                            ),
                          );
                        },
                        separatorBuilder: (BuildContext contetx, int index) =>
                            const Divider(),
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.fromLTRB(0, 20, 0, 20),
                      width: size.width * 0.8,
                      height: size.height * 0.13,
                      margin: EdgeInsets.only(bottom: 0),
                      child: FlatButton(
                        height: size.height * 0.07,
                        onPressed: () async {
                          await Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (BuildContext context) =>
                                  RegisterHub(modify_hub: 1),
                            ),
                          );
                          setState(() {});
                        },
                        child: Text(
                          '허브 추가',
                          textScaleFactor: 1.0,
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 24,
                              fontFamily: 'Noto',
                              fontWeight: FontWeight.bold),
                        ),
                        color: Color(0xff0B1E33),
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(50)),
                      ),
                    ),
                  ],
                ),
              );
            }
          }),
    );
  }
}
