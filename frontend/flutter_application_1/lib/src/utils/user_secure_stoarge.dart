import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class UserSecureStorage {
  static final _storage = FlutterSecureStorage();

  static const _keyToken = 'usertoken';

  static const _keyUserId = 'userid';

  static Future setUserId(String userid) async =>
      await _storage.write(key: _keyUserId, value: userid);

  static Future<String> getUserID() async =>
      await _storage.read(key: _keyUserId);

  static Future setUserToken(String userToken) async =>
      await _storage.write(key: _keyToken, value: userToken);

  static Future<String> getUserToken() async =>
      await _storage.read(key: _keyToken);
}
