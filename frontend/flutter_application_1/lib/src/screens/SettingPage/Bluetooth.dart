import 'package:flutter/material.dart';
import 'package:Smart_Medicine_Box/src/screens/SettingPage.dart';
import 'package:flutter_blue/flutter_blue.dart';

class Bluetooth extends StatefulWidget {
  @override
  _BluetoothState createState() => _BluetoothState();
}

FlutterBlue flutterBlue;

class _BluetoothState extends State<Bluetooth> {
  @override
  void initState() {
    super.initState();
    flutterBlue = FlutterBlue.instance;
  }

  void _startscan() {
    flutterBlue.startScan(timeout: Duration(seconds: 12));
    var subscription = flutterBlue.scanResults.listen((results) {
      // do something with scan results
      for (ScanResult r in results) {
        print(
            'Device Name : ${r.device.name} // Device ID : ${r.device.id} // Device rssi: ${r.rssi}');
      }
    });
  }

  Widget build(BuildContext context) {
    Widget _buildItem(ScanResult s) {
      return ListTile(
        leading: Text(s.rssi.toString()),
        title: Text(s.device.name),
        subtitle: Text(s.device.id.id),
        onTap: () =>
            Navigator.of(context).push(MaterialPageRoute(builder: (context) {
          return Device(device: s.device);
        })),
      );
    }

    Widget _buildList(List<ScanResult> scanResults) {
      return Column(
        children: scanResults.map((v) => _buildItem(v)).toList(),
      );
    }

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
          child: StreamBuilder<List<ScanResult>>(
              stream: FlutterBlue.instance.scanResults,
              initialData: [],
              builder: (c, snapshot) {
                return _buildList(snapshot.data);
              }),
        ),
        floatingActionButton: StreamBuilder<bool>(
          stream: FlutterBlue.instance.isScanning,
          initialData: false,
          builder: (c, snapshot) {
            if (snapshot.data) {
              return FloatingActionButton(
                child: Icon(Icons.stop),
                onPressed: () => FlutterBlue.instance.stopScan(),
                backgroundColor: Colors.red,
              );
            } else {
              return FloatingActionButton(
                  child: Icon(Icons.search),
                  onPressed: () => FlutterBlue.instance
                      .startScan(timeout: Duration(seconds: 4)));
            }
          },
        ),
      ),
    );
  }
}

class Device extends StatefulWidget {
  Device({Key key, this.device}) : super(key: key);
  final BluetoothDevice device;
  @override
  _DeviceState createState() => _DeviceState();
}

class _DeviceState extends State<Device> {
  void initState() {
    super.initState();
    widget.device.connect();
  }

  @override
  void dispose() {
    widget.device.disconnect();
    super.dispose();
  }

  Widget _buildIconButton() {
    return StreamBuilder<BluetoothDeviceState>(
        stream: widget.device.state,
        initialData: BluetoothDeviceState.connecting,
        builder: (c, snapshot) {
          if (snapshot.data != BluetoothDeviceState.connected)
            return Icon(Icons.warning);
          return IconButton(
            icon: Icon(Icons.bluetooth_searching),
            onPressed: () => widget.device.discoverServices(),
          );
        });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.device.name),
        actions: <Widget>[
          _buildIconButton(),
        ],
      ),
      body: Text('hello'),
    );
  }
}
