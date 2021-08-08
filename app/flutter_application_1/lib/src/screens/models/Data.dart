import 'Medicine.dart';

class Data {
  final int totalItem;
  final List<Medicine> result;

  Data({this.totalItem, this.result});

  factory Data.fromJson(Map<String, dynamic> parsedJson) {
    var list = parsedJson['result'] as List;
    List<Medicine> resultList = list.map((i) => Medicine.fromJson(i)).toList();

    return Data(
      totalItem: parsedJson['totalItem'],
      result: resultList,
    );
  }
  Map<String, dynamic> toJson() => {
        "totalItem": totalItem,
        "result": result,
      };
}
