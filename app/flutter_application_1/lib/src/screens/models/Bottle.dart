class Bottle {
  final int bottleId;
  final String temperature;
  final String humidity;
  final String balance;
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
    return Bottle(
      bottleId: parsedJson['bottleId'],
      temperature: parsedJson['temperature'].toString(),
      humidity: parsedJson['humidity'].toString(),
      balance: parsedJson['balance'].toString(),
      recentOpen: DateTime.parse(parsedJson['recentOpen']).toLocal(),
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
