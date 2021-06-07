import 'package:flutter/material.dart';
import 'package:rxdart/subjects.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:Smart_Medicine_Box/src/screens/SettingPage.dart';
import 'package:Smart_Medicine_Box/src/screens/SettingPage/customTimepicker.dart';

final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
    FlutterLocalNotificationsPlugin();
// Streams are created so that app can respond to notification-related events since the plugin is initialised in the `main` function
final BehaviorSubject<ReceivedNotification> didReceiveLocalNotificationSubject =
    BehaviorSubject<ReceivedNotification>();

final BehaviorSubject<String> selectNotificationSubject =
    BehaviorSubject<String>();

NotificationAppLaunchDetails notificationAppLaunchDetails;

class ReceivedNotification {
  final int id;
  final String title;
  final String body;
  final String payload;

  ReceivedNotification({
    @required this.id,
    @required this.title,
    @required this.body,
    @required this.payload,
  });
}

class Alarm extends StatefulWidget {
  @override
  _AlarmnState createState() => _AlarmnState();
}

class _AlarmnState extends State<Alarm> {
  FlutterLocalNotificationsPlugin fltrNotification;

  List<Widget> alarmList = [];
  List<dynamic> weekdays = [];
  List<String> times = [];
  List<int> timesHours = [];
  List<int> timesMinutes = [];
  List<dynamic> saveIndex = [];
  List<dynamic> isSwitched = [];
  List<bool> _weekday = [false, false, false, false, false, false, false];

  void initState() {
    super.initState();
    main();
  }

  Future<void> main() async {
    // needed if you intend to initialize in the `main` function
    WidgetsFlutterBinding.ensureInitialized();
    // NOTE: if you want to find out if the app was launched via notification then you could use the following call and then do something like
    // change the default route of the app
    // var notificationAppLaunchDetails =
    //     await flutterLocalNotificationsPlugin.getNotificationAppLaunchDetails();

    var initializationSettingsAndroid =
        new AndroidInitializationSettings('app_icon');
    var initializationSettingsIOS = IOSInitializationSettings(
        requestAlertPermission: true,
        requestBadgePermission: true,
        requestSoundPermission: true,
        onDidReceiveLocalNotification:
            (int id, String title, String body, String payload) async {});
    var initializationSettings = InitializationSettings(
        initializationSettingsAndroid, initializationSettingsIOS);
    await flutterLocalNotificationsPlugin.initialize(initializationSettings,
        onSelectNotification: (String payload) async {
      if (payload != null) {
        debugPrint('notification payload: ' + payload);
      }
    });
  }

  void _requestIOSPermissions() {
    flutterLocalNotificationsPlugin
        .resolvePlatformSpecificImplementation<
            IOSFlutterLocalNotificationsPlugin>()
        ?.requestPermissions(
          alert: true,
          badge: true,
          sound: true,
        );
  }

  void insertAlarm() {
    setState(() {
      weekdays.add([false, false, false, false, false, false, false]);
      times.add(' ');
      timesHours.add(0);
      timesMinutes.add(0);
      isSwitched.add(false);

      var length = saveIndex.length;

      if (saveIndex.length == 0) {
        saveIndex.add(1);
      } else {
        saveIndex.add(saveIndex[length - 1] + 1);
      }

      length = saveIndex.length;
      /*
      _prefs.setString('alarmList', weekdays.toString());
      for (var i = 0; i < times.length; i++) {
        _prefs.setString('time' + (saveIndex[i]).toString(),
            '${timesHours[i]}:${timesMinutes[i]}');
      }
      _prefs.setString('timeIndex', saveIndex.toString());
      _prefs.setString('toggle', isSwitched.toString());
*/
      print(saveIndex);
    });
  }

  void rerendering() {
    print(weekdays);
    print(times);
    print(timesHours);
    print(timesMinutes);
    setState(() {});
  }

  void _configureDidReceiveLocalNotificationSubject() {
    didReceiveLocalNotificationSubject.stream
        .listen((ReceivedNotification receivedNotification) async {
      await showDialog(
        context: context,
        builder: (BuildContext context) => CupertinoAlertDialog(
          title: receivedNotification.title != null
              ? Text(receivedNotification.title)
              : null,
          content: receivedNotification.body != null
              ? Text(receivedNotification.body)
              : null,
          actions: [
            CupertinoDialogAction(
              isDefaultAction: true,
              child: Text('Ok'),
              onPressed: () async {
                Navigator.of(context, rootNavigator: true).pop();
                await Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) =>
                        SecondScreen(receivedNotification.payload),
                  ),
                );
              },
            )
          ],
        ),
      );
    });
  }

  void _configureSelectNotificationSubject() {
    selectNotificationSubject.stream.listen((String payload) async {
      await Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => SecondScreen(payload)),
      );
    });
  }

  @override
  void dispose() {
    didReceiveLocalNotificationSubject.close();
    selectNotificationSubject.close();
    super.dispose();
  }

  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
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
        drawer: Drawer(
          child: ListView(
            children: [
              DrawerHeader(
                child: Text('Drawer Header'),
                decoration: BoxDecoration(
                  color: Colors.blue,
                ),
              ),
              ListTile(
                title: Text('Test 1'),
                onTap: () {},
              ),
              ListTile(
                title: Text('Test 2'),
                onTap: () {},
              ),
              ListTile(
                title: Text('Test 3'),
                onTap: () {},
              ),
            ],
          ),
        ),
        body: SingleChildScrollView(
          scrollDirection: Axis.vertical,
          child: Padding(
            padding: EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Container(
                      width: 180,
                      height: 80,
                      padding: const EdgeInsets.all(20.0),
                      child: RaisedButton(
                        onPressed: () async {
                          insertAlarm();
                        },
                        shape: RoundedRectangleBorder(
                            borderRadius: new BorderRadius.circular(30.0),
                            side: BorderSide(color: Colors.blue)),
                        color: Color(0xff1674f6),
                        child: Text(
                          '알람 추가',
                          textScaleFactor: 1.0,
                          style: TextStyle(
                              fontSize: 16,
                              color: Colors.white,
                              fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                  ],
                ),
                for (var i = 0; i < weekdays.length; i++)
                  inAlarmData(
                    context,
                    weekdays,
                    weekdays[i],
                    _showWeeklyAtDayAndTime,
                    times[i],
                    timesHours[i],
                    timesMinutes[i],
                    i + 1,
                    rerendering,
                    size,
                  )
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget inAlarmData(
    BuildContext context,
    var allweekddata,
    var weekdayArray,
    var activeFunctions,
    var timeString,
    var timeHour,
    var timesMinite,
    var index,
    var rerendering,
    Size size,
  ) {
    SharedPreferences _prefs;

    var savetimeStrings;
    var setDaysString = ['월', '화', '수', '목', '금', '토', '일'];

    return Container(
        margin: EdgeInsets.fromLTRB(0, 0, 0, 20),
        decoration: BoxDecoration(
          border: Border.all(
            color: Color(0xffd0d0d0),
          ),
          borderRadius: BorderRadius.all(Radius.circular(5)),
        ),
        child: Column(
          children: <Widget>[
            Container(
              alignment: Alignment.center,
              width: size.width,
              height: 50.0,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      for (var i = 0; i < weekdayArray.length; i++)
                        GestureDetector(
                          onTap: () async {
                            _prefs = await SharedPreferences.getInstance();

                            if (weekdayArray[i] == false) {
                              weekdayArray[i] = true;
                            } else {
                              weekdayArray[i] = false;
                            }

                            _prefs.setString(
                                'alarmList', allweekddata.toString());

                            rerendering();
                          },
                          child: Container(
                              margin: EdgeInsets.fromLTRB(15, 0, 0, 0),
                              width: size.width * 0.09,
                              child: Text(
                                setDaysString[i],
                                style: TextStyle(
                                    color: weekdayArray[i] == false
                                        ? Colors.teal
                                        : Colors.red,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 20.0),
                              )),
                        ),
                    ],
                  )
                ],
              ),
              color: Colors.white,
            ),
            RaisedButton(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(5.0)),
              elevation: 4.0,
              onPressed: () async {
                _prefs = await SharedPreferences.getInstance();
                var abc = await DatePicker.showPicker(
                  context,
                  theme: DatePickerTheme(
                    containerHeight: 210.0,
                  ),
                  showTitleActions: true,
                  onConfirm: (time) {
                    print('confirm $time');

                    // realTime = new DateTime(time.hour, time.minute);
                    timeHour = time.hour;
                    timesMinite = time.minute;

                    savetimeStrings = '${time.hour}:${time.minute}';

                    var minutString;

                    if (timesMinite.toString().length == 1) {
                      minutString = '0' + timesMinite.toString();
                    } else {
                      minutString = timesMinite.toString();
                    }

                    if (timeHour - 12 < 0) {
                      timeString = '오전 ${time.hour}:' + minutString;
                    } else {
                      if (timeHour == 12) {
                        timeString = '오후 ${time.hour}:' + minutString;
                      } else {
                        timeString = '오후 ${time.hour - 12}:' + minutString;
                      }
                    }
                  },
                  pickerModel: CustomPicker(
                      currentTime: DateTime.now(), locale: LocaleType.ko),
                );

                times[index - 1] = timeString;
                timesHours[index - 1] = timeHour;
                timesMinutes[index - 1] = timesMinite;

                _prefs.setString('time' + (saveIndex[index - 1]).toString(),
                    savetimeStrings);

                print(savetimeStrings);

                setState(() {
                  savetimeStrings = savetimeStrings;
                });
                // rerendering();
              },
              child: Container(
                alignment: Alignment.center,
                height: 50.0,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Container(
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                              Icon(
                                Icons.access_time,
                                size: 18.0,
                                color: Colors.teal,
                              ),
                              Text(
                                "   " + timeString,
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: Colors.teal,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 18.0),
                              ),
                            ],
                          ),
                        )
                      ],
                    ),
                  ],
                ),
              ),
              color: Colors.white,
            ),
            Container(
              padding: EdgeInsets.fromLTRB(20, 0, 20, 0),
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(5.0),
                  color: Colors.white),
              child: Container(
                alignment: Alignment.center,
                height: 50.0,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Text(
                      "알람 설정",
                      style: TextStyle(
                          color: Colors.teal,
                          fontWeight: FontWeight.bold,
                          fontSize: 18.0),
                    ),
                    Switch(
                        value: isSwitched[index - 1],
                        onChanged: (value) async {
                          print(savetimeStrings);
                          if (value == true) {
                            _prefs = await SharedPreferences.getInstance();
                            int count = 1;
                            bool allDayFalse = true;
                            for (var i = 0; i < weekdayArray.length; i++) {
                              if (weekdayArray[i] == true) {
                                await activeFunctions(timeHour, timesMinite,
                                    i + 1, index * 10, count);
                                count++;
                                allDayFalse = false;
                              }
                            }
                            if (allDayFalse == true) {
                              showDialog(
                                  context: context,
                                  builder: (BuildContext context) {
                                    return AlertDialog(
                                      title: new Text('요일 선택 오류'),
                                      content:
                                          new Text('선택된 요일이 없습니다. 요일을 선택해주세요.'),
                                      actions: <Widget>[
                                        new FlatButton(
                                            child: new Text('닫기'),
                                            onPressed: () {
                                              Navigator.of(context).pop();
                                            })
                                      ],
                                    );
                                  });
                            } else if (_prefs.getString('time' +
                                    (saveIndex[index - 1]).toString()) ==
                                null) {
                              showDialog(
                                  context: context,
                                  builder: (BuildContext context) {
                                    return AlertDialog(
                                      title: new Text('시간 설정 오류'),
                                      content:
                                          new Text('설정된 시간이 없습니다. 시간을 설정해주세요.'),
                                      actions: <Widget>[
                                        new FlatButton(
                                            child: new Text('닫기'),
                                            onPressed: () {
                                              Navigator.of(context).pop();
                                            })
                                      ],
                                    );
                                  });
                            } else {
                              setState(() {
                                print(value);
                                isSwitched[index - 1] = value;
                                _prefs.setString(
                                    'alarmList', allweekddata.toString());
                                // _prefs.setString(
                                //     'time' + saveIndex[index - 1].toString(),
                                //     savetimeStrings);
                                _prefs.setString(
                                    'timeIndex', saveIndex.toString());
                                _prefs.setString(
                                    'toggle', isSwitched.toString());
                                print('time' + index.toString());
                                showDialog(
                                    context: context,
                                    builder: (BuildContext context) {
                                      return AlertDialog(
                                        title: new Text('알람'),
                                        content: new Text('알람 설정을 완료 하였습니다.'),
                                        actions: <Widget>[
                                          new FlatButton(
                                              child: new Text('확인'),
                                              onPressed: () {
                                                Navigator.of(context).pop();
                                              })
                                        ],
                                      );
                                    });
                              });
                            }
                          } else {
                            _prefs = await SharedPreferences.getInstance();
                            int count = 1;
                            for (var i = 0; i < weekdayArray.length; i++) {
                              if (weekdayArray[i] == true) {
                                await flutterLocalNotificationsPlugin
                                    .cancel((index * 10) + count);
                                count++;
                              }
                            }
                            setState(() {
                              isSwitched[index - 1] = value;
                              _prefs.setString('toggle', isSwitched.toString());
                            });
                          }
                        }),
                    GestureDetector(
                        onTap: () async {
                          showDialog(
                              context: context,
                              builder: (BuildContext context) {
                                return AlertDialog(
                                  title: new Text('알람 삭제'),
                                  content: new Text('선택한 알람을 삭제하시겠습니까?'),
                                  actions: <Widget>[
                                    new FlatButton(
                                        child: new Text('취소'),
                                        onPressed: () {
                                          Navigator.of(context).pop();
                                        }),
                                    new FlatButton(
                                        child: new Text('삭제'),
                                        onPressed: () async {
                                          _prefs = await SharedPreferences
                                              .getInstance();
                                          int count = 1;
                                          for (var i = 0;
                                              i < weekdayArray.length;
                                              i++) {
                                            if (weekdayArray[i] == true) {
                                              await flutterLocalNotificationsPlugin
                                                  .cancel((index * 10) + count);
                                              count++;
                                            }
                                          }
                                          print(saveIndex);
                                          allweekddata.removeAt(index - 1);
                                          _prefs.remove('time' +
                                              saveIndex[index - 1].toString());
                                          times.removeAt(index - 1);
                                          saveIndex.removeAt(index - 1);
                                          isSwitched.removeAt(index - 1);
                                          _prefs.setString('alarmList',
                                              allweekddata.toString());
                                          _prefs.setString('timeIndex',
                                              saveIndex.toString());
                                          _prefs.setString(
                                              'toggle', isSwitched.toString());
                                          rerendering();
                                          Navigator.of(context).pop();
                                        })
                                  ],
                                );
                              });
                        },
                        child: Icon(
                          Icons.close,
                        ))
                  ],
                ),
              ),
            ),
          ],
        ));
  }

  /// weekday 가 1부터 7순으로 일 월 화 수 목 금 토 일 순서로 구성이 되어 있음 이에 따라 설정한 Weekday time 에 학습 알람을 뛰어주는 역할을 해주는 함수
  Future<void> _showWeeklyAtDayAndTime(
      int a, int b, int weekday, int index, int idindex) async {
    Day setDay;

    if (weekday == 1) {
      setDay = Day.Monday;
    } else if (weekday == 2) {
      setDay = Day.Tuesday;
    } else if (weekday == 3) {
      setDay = Day.Wednesday;
    } else if (weekday == 4) {
      setDay = Day.Thursday;
    } else if (weekday == 5) {
      setDay = Day.Friday;
    } else if (weekday == 6) {
      setDay = Day.Saturday;
    } else if (weekday == 7) {
      setDay = Day.Sunday;
    }
    print('dd');

    var time = Time(a, b, 0);
    var androidPlatformChannelSpecifics = AndroidNotificationDetails(
        'show weekly channel id',
        'show weekly channel name',
        'show weekly description');
    var iOSPlatformChannelSpecifics = IOSNotificationDetails();
    var platformChannelSpecifics = NotificationDetails(
        androidPlatformChannelSpecifics, iOSPlatformChannelSpecifics);
    await flutterLocalNotificationsPlugin.showWeeklyAtDayAndTime(
        index + idindex,
        '약통 알람 ',
        '알약 섭취 시간인  ${_toTwoDigitString(time.hour)}:${_toTwoDigitString(time.minute)}이 되었습니다.',
        setDay,
        time,
        platformChannelSpecifics);
  }

  String _toTwoDigitString(int value) {
    return value.toString().padLeft(2, '0');
  }

  Future<void> onDidReceiveLocalNotification(
      int id, String title, String body, String payload) async {
    // display a dialog with the notification details, tap ok to go to another page
    await showDialog(
      context: context,
      builder: (BuildContext context) => CupertinoAlertDialog(
        title: title != null ? Text(title) : null,
        content: body != null ? Text(body) : null,
        actions: [
          CupertinoDialogAction(
            isDefaultAction: true,
            child: Text('Ok'),
            onPressed: () async {
              Navigator.of(context, rootNavigator: true).pop();
              await Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => SecondScreen(payload),
                ),
              );
            },
          )
        ],
      ),
    );
  }
}

class SecondScreen extends StatefulWidget {
  SecondScreen(this.payload);

  final String payload;

  @override
  State<StatefulWidget> createState() => SecondScreenState();
}

class SecondScreenState extends State<SecondScreen> {
  String _payload;
  @override
  void initState() {
    super.initState();
    _payload = widget.payload;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Second Screen with payload: ${(_payload ?? '')}'),
      ),
      body: Center(
        child: RaisedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: Text('Go back!'),
        ),
      ),
    );
  }
}
