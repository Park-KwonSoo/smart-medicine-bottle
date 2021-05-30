import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import '../screens/models/UserBottle.dart';

final String tableName = 'medicinename';

class DBHelper {
  DBHelper._();

  static final DBHelper _db = DBHelper._();

  factory DBHelper() => _db;

  static Database _database;

  Future<Database> get database async {
    if (_database != null) return _database;

    _database = await initDB();
    return _database;
  }

  initDB() async {
    Directory documentsDirectory = await getApplicationDocumentsDirectory();
    String path = join(documentsDirectory.path, 'medicinename.db');

    return await openDatabase(
      path,
      version: 1,
      onCreate: (Database db, int version) async {
        await db.execute('''
      CREATE TABLE $tableName 
      (bottleId INTEGER PRIMARY KEY,
      bottleName TEXT)
      ''');
      },
    );
  }

  createData(UserBottle bottle) async {
    final db = await database;
    var res = await db.insert(tableName, bottle.toJson(),
        conflictAlgorithm: ConflictAlgorithm.replace);
    return res;
  }

  getBottle(int bottleId) async {
    final db = await database;
    var res =
        await db.query(tableName, where: 'bottleId=?', whereArgs: [bottleId]);
    return res.isNotEmpty ? UserBottle.fromJson(res.first) : Null;
  }

  Future<List<UserBottle>> getAllBottle() async {
    final db = await database;
    var res = await db.query(tableName);
    List<UserBottle> list =
        res.isNotEmpty ? res.map((c) => UserBottle.fromJson(c)).toList() : [];

    return list;
  }

  updateBottle(UserBottle bottle) async {
    final db = await database;
    var res = db.update(tableName, bottle.toJson(),
        where: 'bottleId=?', whereArgs: [bottle.bottleId]);
    return res;
  }
}
