class User {
  final String userId;
  final String token;

  User({this.userId, this.token});

  factory User.fromJson(Map<String, dynamic> parsedJson) {
    return User(
      userId: parsedJson['userId'],
      token: parsedJson['token'],
    );
  }
  Map<String, dynamic> toJson() => {
        "userId": userId,
        "token": token,
      };
}
