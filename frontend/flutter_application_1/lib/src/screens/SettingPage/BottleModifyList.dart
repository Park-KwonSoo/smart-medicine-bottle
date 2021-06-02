import 'dart:convert';
import 'package:Smart_Medicine_Box/src/screens/Register/RegisterBottle.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../models/Bottle.dart';
import '../DashBoard.dart';
import '../../utils/user_secure_stoarge.dart';
import '../../utils/DBHelper.dart';
import '../models/UserBottle.dart';

class BottleModifyList extends StatefulWidget {
  BottleModifyList({Key key}) : super(key: key);

  @override
  _BottleModifyListState createState() => _BottleModifyListState();
}

class _BottleModifyListState extends State<BottleModifyList> {
  List<Bottle> _bottleList = new List<Bottle>();
  Future<String> getBottleList() async {
    String hubid = await UserSecureStorage.getHubId();
    String usertoken = await UserSecureStorage.getUserToken();

    var provider = DBHelper();
    http.Response response = await http.get(
      Uri.encodeFull(
          DotEnv().env['SERVER_URL'] + 'bottle/hub/' + hubid.toString()),
      headers: {"authorization": usertoken},
    );

    if (_bottleList.length != 0) {
      _bottleList.clear();
    }
    if (response.statusCode == 200) {
      List<dynamic> values = new List<dynamic>();
      values = json.decode(response.body);

      for (int i = 0; i < values.length; i++) {
        Map<String, dynamic> map = values[i];
        _bottleList.add(Bottle.fromJson(map));
      }
      for (int i = 0; i < _bottleList.length; i++) {
        UserBottle temp = new UserBottle();
        temp.bottleId = _bottleList[i].bottleId;
        temp.bottleName = _bottleList[i].bottleId.toString();
        provider.createData(temp);
      }
      List<UserBottle> _userbottleList = new List<UserBottle>();
      _userbottleList = await provider.getAllBottle();
      for (int i = 0; i < _userbottleList.length; i++) {
        print(_userbottleList[i].bottleId);
      }

      print(provider.getAllBottle());
      return "GET";
    } else if (response.statusCode == 404) {
      return "Not Found";
    } else {
      return "Error";
    }
  }

  Future<String> deleteBottle(int index) async {
    String usertoken = await UserSecureStorage.getUserToken();
    http.Response response = await http.delete(
      Uri.encodeFull(DotEnv().env['SERVER_URL'] + 'bottle/' + index.toString()),
      headers: {"authorization": usertoken},
    );
    print('asdgasdga');
    print(response.statusCode);
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
        future: getBottleList(),
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
                  SizedBox(height: 10),
                  Container(
                    height: size.height * 0.07,
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
                  ),
                  SizedBox(height: 10),
                  Expanded(
                    child: GridView.builder(
                      padding: const EdgeInsets.all(30),
                      itemCount:
                          _bottleList.length == null ? 0 : _bottleList.length,
                      gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
                        maxCrossAxisExtent: 200,
                        crossAxisSpacing: 10,
                        mainAxisSpacing: 10,
                      ),
                      itemBuilder: (BuildContext context, int index) {
                        return InkResponse(
                          splashColor: Colors.transparent,
                          child: Container(
                            height: 140,
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              border: Border.all(),
                              borderRadius: BorderRadius.all(
                                Radius.circular(16.0),
                              ),
                            ),
                            child: Column(
                              children: [
                                Container(
                                  decoration: BoxDecoration(
                                    border: Border(
                                      bottom: BorderSide(
                                          color: Colors.black,
                                          width: 1,
                                          style: BorderStyle.solid),
                                    ),
                                  ),
                                  height: 40,
                                  child: Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Container(
                                        height: 40,
                                        child: Center(
                                          child: Text(
                                            '${_bottleList[index].bottleId}',
                                            style: TextStyle(
                                                color: Colors.black,
                                                fontSize: 20,
                                                fontFamily: 'Noto',
                                                fontWeight: FontWeight.bold),
                                          ),
                                        ),
                                      ),
                                      Container(
                                        child: IconButton(
                                          alignment: Alignment(0.9, 0),
                                          icon: Icon(
                                            Icons.create_sharp,
                                            color: Colors.black,
                                          ),
                                          onPressed: () {},
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                SizedBox(height: 10),
                                Container(
                                  height: 90,
                                  child: Icon(
                                    Icons.medical_services_outlined,
                                    size: 100,
                                  ),
                                )
                              ],
                            ),
                          ),
                          onTap: () {
                            if (_bottleList.length == 1) {
                              showDialog(
                                context: context,
                                builder: (BuildContext context) {
                                  return AlertDialog(
                                    title: new Text('약병 삭제'),
                                    content:
                                        new Text('등록된 약병이 하나이므로 해제가 불가능 합니다.'),
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
                                        _bottleList[index].bottleId.toString() +
                                            '을 삭제 하시겠습니까?'),
                                    actions: <Widget>[
                                      new FlatButton(
                                        child: new Text('삭제'),
                                        onPressed: () async {
                                          print('dfg');
                                          await deleteBottle(
                                              _bottleList[index].bottleId);
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
                        );
                      },
                    ),
                  ),
                  Container(
                    padding: EdgeInsets.fromLTRB(0, 20, 0, 20),
                    width: size.width * 0.8,
                    height: size.height * 0.13,
                    margin: EdgeInsets.only(bottom: 0),
                    child: FlatButton(
                      height: size.height * 0.06,
                      onPressed: () async {
                        await Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (BuildContext context) =>
                                RegisterBottle(modify_bottle: true),
                          ),
                        );
                        setState(() {});
                      },
                      child: Text(
                        '약병 추가',
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
        },
      ),
    );
  }
}
