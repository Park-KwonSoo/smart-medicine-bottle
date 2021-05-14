import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../shared/colors.dart';
import 'package:rxdart/subjects.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter_application_1/src/screens/SettingPage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';

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
        body: FlatButton(
          height: size.height * 0.07,
          onPressed: () {
            _showDailyAtTime(1, 2);
          },
          child: Text(
            '알람 설정',
            textScaleFactor: 1.0,
            style: TextStyle(
                color: Colors.white,
                fontSize: 24,
                fontFamily: 'Noto',
                fontWeight: FontWeight.bold),
          ),
          color: Color(0xff8E97FD),
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(50)),
        ),
      ),
    );
  }

  Future<void> _cancelNotification() async {
    await flutterLocalNotificationsPlugin.cancel(0);
  }

  Future<void> _showTimeoutNotification() async {
    var androidPlatformChannelSpecifics = AndroidNotificationDetails(
        'silent channel id',
        'silent channel name',
        'silent channel description',
        timeoutAfter: 3000,
        styleInformation: DefaultStyleInformation(true, true));
    var iOSPlatformChannelSpecifics =
        IOSNotificationDetails(presentSound: false);
    var platformChannelSpecifics = NotificationDetails(
        androidPlatformChannelSpecifics, iOSPlatformChannelSpecifics);
    await flutterLocalNotificationsPlugin.show(0, 'timeout notification',
        'Times out after 3 seconds', platformChannelSpecifics);
  }

  Future<void> _cancelAllNotifications() async {
    await flutterLocalNotificationsPlugin.cancelAll();
  }

  /// 매일 지정된 시간에 Alarm 을 트는 Function
  Future<void> _showDailyAtTime(int a, int b) async {
    var time = Time(11, 24, 0);
    var androidPlatformChannelSpecifics = AndroidNotificationDetails(
        'repeatDailyAtTime channel id',
        'repeatDailyAtTime channel name',
        'repeatDailyAtTime description');
    var iOSPlatformChannelSpecifics = IOSNotificationDetails();
    var platformChannelSpecifics = NotificationDetails(
        androidPlatformChannelSpecifics, iOSPlatformChannelSpecifics);
    await flutterLocalNotificationsPlugin.showDailyAtTime(
        1,
        '알람 시간 알림 ',
        '설정하신 시간인  ${_toTwoDigitString(time.hour)}시 ${_toTwoDigitString(time.minute)}분입니다.',
        time,
        platformChannelSpecifics);

    var pendingNotificationRequests =
        await flutterLocalNotificationsPlugin.pendingNotificationRequests();

    print(pendingNotificationRequests.toList());
  }

  /// weekday 가 1부터 7순으로 일 월 화 수 목 금 토 일 순서로 구성이 되어 있음 이에 따라 설정한 Weekday time 에 학습 알람을 뛰어주는 역할을 해주는 함수
  Future<void> _showWeeklyAtDayAndTime(
      int a, int b, int weekday, int index, int idindex) async {
    print(index + idindex);

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
