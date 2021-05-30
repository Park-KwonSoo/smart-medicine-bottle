class UserBottle {
  int bottleId;
  String bottleName;

  UserBottle({this.bottleId, this.bottleName});

  factory UserBottle.fromJson(Map<String, dynamic> parsedJson) {
    return UserBottle(
      bottleId: parsedJson['bottleId'],
      bottleName: parsedJson['bottleName'],
    );
  }

  Map<String, dynamic> toJson() =>
      {"bottleId": bottleId, "bottleName": bottleName};
}
