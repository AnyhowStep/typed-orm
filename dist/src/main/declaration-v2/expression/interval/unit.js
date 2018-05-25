"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://dev.mysql.com/doc/refman/5.5/en/date-and-time-functions.html#function_date-add
var Unit;
(function (Unit) {
    //These units can be represented with numbers
    Unit["MICROSECOND"] = "MICROSECOND";
    Unit["SECOND"] = "SECOND";
    Unit["MINUTE"] = "MINUTE";
    Unit["HOUR"] = "HOUR";
    Unit["DAY"] = "DAY";
    Unit["WEEK"] = "WEEK";
    Unit["MONTH"] = "MONTH";
    Unit["QUARTER"] = "QUARTER";
    Unit["YEAR"] = "YEAR";
    //These units require strings to represent
    Unit["SECOND_MICROSECOND"] = "SECOND_MICROSECOND";
    Unit["MINUTE_MICROSECOND"] = "MINUTE_MICROSECOND";
    Unit["MINUTE_SECOND"] = "MINUTE_SECOND";
    Unit["HOUR_MICROSECOND"] = "HOUR_MICROSECOND";
    Unit["HOUR_SECOND"] = "HOUR_SECOND";
    Unit["HOUR_MINUTE"] = "HOUR_MINUTE";
    Unit["DAY_MICROSECOND"] = "DAY_MICROSECOND";
    Unit["DAY_SECOND"] = "DAY_SECOND";
    Unit["DAY_MINUTE"] = "DAY_MINUTE";
    Unit["DAY_HOUR"] = "DAY_HOUR";
    Unit["YEAR_MONTH"] = "YEAR_MONTH";
})(Unit = exports.Unit || (exports.Unit = {}));
//# sourceMappingURL=unit.js.map