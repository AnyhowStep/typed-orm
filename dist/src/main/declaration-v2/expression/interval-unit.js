"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://dev.mysql.com/doc/refman/5.5/en/date-and-time-functions.html#function_date-add
var IntervalUnit;
(function (IntervalUnit) {
    //These units can be represented with numbers
    IntervalUnit["MICROSECOND"] = "MICROSECOND";
    IntervalUnit["SECOND"] = "SECOND";
    IntervalUnit["MINUTE"] = "MINUTE";
    IntervalUnit["HOUR"] = "HOUR";
    IntervalUnit["DAY"] = "DAY";
    IntervalUnit["WEEK"] = "WEEK";
    IntervalUnit["MONTH"] = "MONTH";
    IntervalUnit["QUARTER"] = "QUARTER";
    IntervalUnit["YEAR"] = "YEAR";
    //These units require strings to represent
    IntervalUnit["SECOND_MICROSECOND"] = "SECOND_MICROSECOND";
    IntervalUnit["MINUTE_MICROSECOND"] = "MINUTE_MICROSECOND";
    IntervalUnit["MINUTE_SECOND"] = "MINUTE_SECOND";
    IntervalUnit["HOUR_MICROSECOND"] = "HOUR_MICROSECOND";
    IntervalUnit["HOUR_SECOND"] = "HOUR_SECOND";
    IntervalUnit["HOUR_MINUTE"] = "HOUR_MINUTE";
    IntervalUnit["DAY_MICROSECOND"] = "DAY_MICROSECOND";
    IntervalUnit["DAY_SECOND"] = "DAY_SECOND";
    IntervalUnit["DAY_MINUTE"] = "DAY_MINUTE";
    IntervalUnit["DAY_HOUR"] = "DAY_HOUR";
    IntervalUnit["YEAR_MONTH"] = "YEAR_MONTH";
})(IntervalUnit = exports.IntervalUnit || (exports.IntervalUnit = {}));
var NumericIntervalUnit;
(function (NumericIntervalUnit) {
    //These units can be represented with numbers
    NumericIntervalUnit["MICROSECOND"] = "MICROSECOND";
    NumericIntervalUnit["SECOND"] = "SECOND";
    NumericIntervalUnit["MINUTE"] = "MINUTE";
    NumericIntervalUnit["HOUR"] = "HOUR";
    NumericIntervalUnit["DAY"] = "DAY";
    NumericIntervalUnit["WEEK"] = "WEEK";
    NumericIntervalUnit["MONTH"] = "MONTH";
    NumericIntervalUnit["QUARTER"] = "QUARTER";
    NumericIntervalUnit["YEAR"] = "YEAR";
})(NumericIntervalUnit = exports.NumericIntervalUnit || (exports.NumericIntervalUnit = {}));
//# sourceMappingURL=interval-unit.js.map