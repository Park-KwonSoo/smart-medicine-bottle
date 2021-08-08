class Medicine {
  final int medicineId;
  final String antiEffect;
  final String company;
  final String dosage;
  final String name;
  final String target;
  final String warn;

  Medicine(
      {this.medicineId,
      this.antiEffect,
      this.company,
      this.dosage,
      this.name,
      this.target,
      this.warn});

  factory Medicine.fromJson(Map<String, dynamic> parsedJson) {
    return Medicine(
      medicineId: parsedJson['medicineId'],
      antiEffect: parsedJson['antiEffect'],
      company: parsedJson['company'],
      dosage: parsedJson['dosage'],
      name: parsedJson['name'],
      target: parsedJson['target'],
      warn: parsedJson['warn'],
    );
  }

  Map<String, dynamic> toJson() => {
        "medicineId": medicineId,
        "antiEffect": antiEffect,
        "company": company,
        "dosage": dosage,
        "name": name,
        "target": target,
        "warn": warn,
      };
}
