class Bottle {
  final int bottleId;
  final int temperature;
  final int humidity;
  final int balance;
  final DateTime recentOpen;
  final int medicineId;
  final int hubId;
  final int dosage;

  Bottle(
      {this.bottleId,
      this.temperature,
      this.humidity,
      this.balance,
      this.recentOpen,
      this.medicineId,
      this.hubId,
      this.dosage});

  factory Bottle.fromJson(Map<String, dynamic> parsedJson) {
    var list = parsedJson['data'] as List;

    return Bottle(
      bottleId: parsedJson['bottleId'],
      temperature: parsedJson['temperature'],
      humidity: parsedJson['humidity'],
      balance: parsedJson['balance'],
      recentOpen: parsedJson['recentOpen'],
      medicineId: parsedJson['medicineId'],
      hubId: parsedJson['hubId'],
      dosage: parsedJson['dosage'],
    );
  }

  Map<String, dynamic> toJson() => {
        "bottleId": bottleId,
        "temperature": temperature,
        "humidity:": humidity,
        "balance": balance,
        "recentOpen": recentOpen,
        "medicineId": medicineId,
        "hubId": hubId,
        "dosage": dosage,
      };
}
