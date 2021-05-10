import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../shared/colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class DashBoard extends StatefulWidget {
  int pageNumber = 1;
  DashBoard({Key key, this.pageNumber}) : super(key: key);

  @override
  _DashBoardState createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  int _selectedIndex = 0;

  Widget build(BuildContext context) {
    _selectedIndex = widget.pageNumber;
    final Size size = MediaQuery.of(context).size;

    var _tabs = [
      ineerInformationpage(context),
      mainpage(context),
      outerInformationpage(context),
      setting(context),
    ];

    return Scaffold(
      backgroundColor: Color(0xffe5f4ff),
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.black),
        backgroundColor: Colors.white,
        title: Text(
          'Medicine Box',
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
            onPressed: () {},
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
      body: _tabs[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        backgroundColor: Colors.grey,
        selectedItemColor: Colors.blue,
        unselectedItemColor: Colors.white.withOpacity(.60),
        selectedFontSize: 14,
        unselectedFontSize: 14,
        currentIndex: _selectedIndex,
        onTap: (int index) => {
          setState(() {
            _onItemTapped(index);
          })
        },
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.favorite), label: 'Inner'),
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(
            label: 'Outer',
            icon: Icon(Icons.favorite),
          )
        ],
      ),
    );
  }

  void _onItemTapped(int index) {
    setState(() {
      widget.pageNumber = index;
    });
  }
}

Widget mainpage(BuildContext context) {
  final Size size = MediaQuery.of(context).size;
  /* 
    Main 화면 
    약의 정보를 가져와서 출력을 하는 곳
    유저 이메일
    약 이름 
    약 제조사
  */
  return Scaffold(
    backgroundColor: Color(0xffe5f4ff),
    body: Container(
      height: size.height * 0.6,
      margin: EdgeInsets.fromLTRB(0, 30, 0, 0),
      padding: EdgeInsets.fromLTRB(5, 0, 5, 5),
      decoration: BoxDecoration(
        border: Border.all(),
        borderRadius: BorderRadius.all(
            Radius.circular(4.0) //         <--- border radius here
            ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Container(
            margin: EdgeInsets.fromLTRB(0, 30, 0, 0),
            height: size.height * 0.1,
            decoration: BoxDecoration(
              border: Border.all(),
              borderRadius: BorderRadius.all(
                  Radius.circular(4.0) //         <--- border radius here
                  ),
            ),
          ),
          Container(
            margin: EdgeInsets.fromLTRB(0, 30, 0, 0),
            height: size.height * 0.1,
            decoration: BoxDecoration(
              border: Border.all(),
              borderRadius: BorderRadius.all(
                  Radius.circular(4.0) //         <--- border radius here
                  ),
            ),
          ),
        ],
      ),
    ),
  );
}

Widget ineerInformationpage(BuildContext context) {
  /* 
    약병 내부 정보 화면
    약병 내부 온도 약병 내부 습도 약병 내부 현황 최근 계폐 시간 을 표시
    맨처음 Inside Information 출력

    이거 고민이 그냥 저기에 있는 대로 할것인지 아니면 appbar를 저렇게 할 것인지

    저거는 container을 잘 성정 하고 text를 설정 해야 할 듯 

    
  */
  return Scaffold(
    backgroundColor: Colors.white,
  );
}

Widget outerInformationpage(BuildContext context) {
  return Scaffold(
    backgroundColor: Colors.blue,
  );
}

Widget setting(BuildContext context) {
  return Scaffold(
    backgroundColor: Colors.green,
  );
}

/*
bottom navbar로 이동
appbar로는 저거 만들어서 사용
설정 smartmedicine box를 app bar 로 구현 
이건 우선 작업 후 추후 작업 



*/
