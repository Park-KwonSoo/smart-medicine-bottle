import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';

class CustomPicker extends CommonPickerModel {
  var indexs;

  String digits(int value, int length) {
    return '$value'.padLeft(length, "0");
  }

  CustomPicker({DateTime currentTime, LocaleType locale})
      : super(locale: LocaleType.ko) {
    this.currentTime = currentTime ?? DateTime.now();
    var _dayPeriod = 0;
    this.setLeftIndex(this.currentTime.hour);
    this.setMiddleIndex(this.currentTime.minute);
    this.setRightIndex(_dayPeriod);
    _fillRightList();
  }

  @override
  String leftStringAtIndex(int index) {
    if (index >= 1 && index < 13) {
      return this.digits(index, 2);
    } else {
      return null;
    }
  }

  @override
  String middleStringAtIndex(int index) {
    if (index >= 0 && index < 60) {
      return this.digits(index, 2);
    } else {
      return null;
    }
  }

  @override
  String rightStringAtIndex(int index) {
    if (index == 0) {
      return 'AM';
    } else if (index == 1) {
      return 'PM';
    }
    return null;
  }

  void _fillRightList() {
    this.rightList = List.generate(2, (int index) {
      return '$index';
    });
  }

  @override
  void setRightIndex(int index) {
    super.setRightIndex(index);
    indexs = index;
    _fillRightList();
  }

  @override
  String leftDivider() {
    return ":";
  }

  @override
  String rightDivider() {
    return " ";
  }

  @override
  List<int> layoutProportions() {
    return [1, 1, 1];
  }

  @override
  DateTime finalTime() {
    var leftindex;

    if (indexs == 1) {
      if (this.currentLeftIndex() == 12) {
        leftindex = 12;
      } else {
        leftindex = this.currentLeftIndex() + 12;
      }
    } else if (indexs == 0) {
      if (this.currentLeftIndex() == 12) {
        leftindex = 0;
      } else {
        leftindex = this.currentLeftIndex();
      }
    }

    return currentTime.isUtc
        ? DateTime.utc(currentTime.year, currentTime.month, currentTime.day,
            leftindex, this.currentMiddleIndex(), this.currentRightIndex())
        : DateTime(currentTime.year, currentTime.month, currentTime.day,
            leftindex, this.currentMiddleIndex(), this.currentRightIndex());
  }
}
