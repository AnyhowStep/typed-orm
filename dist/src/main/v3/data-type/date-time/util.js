"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const string_1 = require("../../string");
//Uses UTC
//Truncates if fractionSecondPrecision is too small.
function toSqlUtc(d, fractionalSecondPrecision /*|4|5|6*/) {
    if (!isFinite(d.getTime())) {
        throw new Error("Invalid date passed");
    }
    const year = string_1.StringUtil.zeroPad(d.getUTCFullYear(), 4);
    //getUTCMonth() returns [0, 11]
    //We want [1, 12]
    const month = string_1.StringUtil.zeroPad(d.getUTCMonth() + 1, 2);
    const day = string_1.StringUtil.zeroPad(d.getUTCDate(), 2);
    const hour = string_1.StringUtil.zeroPad(d.getUTCHours(), 2);
    const minute = string_1.StringUtil.zeroPad(d.getUTCMinutes(), 2);
    const second = string_1.StringUtil.zeroPad(d.getUTCSeconds(), 2);
    if (fractionalSecondPrecision == 0) {
        /*
            https://dev.mysql.com/doc/refman/8.0/en/date-and-time-literals.html

            The TIMESTAMP syntax produces a DATETIME value in MySQL
            because DATETIME has a range that more closely corresponds
            to the standard SQL TIMESTAMP type,
            which has a year range from 0001 to 9999.

            (The MySQL TIMESTAMP year range is 1970 to 2038.)
        */
        return [
            "(TIMESTAMP ",
            sqlstring_1.escape(`${year}-${month}-${day} ${hour}:${minute}:${second}`),
            ")"
        ].join("");
    }
    else {
        const ms = string_1.StringUtil.zeroPad(d.getUTCMilliseconds(), fractionalSecondPrecision).substr(0, fractionalSecondPrecision);
        /*
            https://dev.mysql.com/doc/refman/8.0/en/date-and-time-literals.html

            The TIMESTAMP syntax produces a DATETIME value in MySQL
            because DATETIME has a range that more closely corresponds
            to the standard SQL TIMESTAMP type,
            which has a year range from 0001 to 9999.

            (The MySQL TIMESTAMP year range is 1970 to 2038.)
        */
        return [
            "(TIMESTAMP ",
            sqlstring_1.escape(`${year}-${month}-${day} ${hour}:${minute}:${second}.${ms}`),
            ")"
        ].join("");
    }
}
exports.toSqlUtc = toSqlUtc;
//Month is zero-based
//Day is one-based
function isValidDate(year, month, day) {
    var d = new Date(year, month, day);
    if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) {
        return true;
    }
    return false;
}
const mySqlDateTimeRegex = /^(\d{4})-(\d{2})-(\d{2})( (\d{2}):(\d{2}):(\d{2})(\.(\d{1,6}))?)?$/;
//Assumes UTC
function fromSqlUtc(sql, fractionalSecondPrecision /*|4|5|6*/) {
    const match = mySqlDateTimeRegex.exec(sql);
    if (match == undefined) {
        throw new Error(`Invalid MySQL DATETIME string`);
    }
    const year = parseInt(match[1]);
    //1-based
    const month = parseInt(match[2]);
    //1-based
    const dayOfMonth = parseInt(match[3]);
    if (!isValidDate(year, month - 1, dayOfMonth)) {
        throw new Error(`Invalid MySQL DATETIME string; month or day does not exist for given year`);
    }
    const hour = (match[5] == undefined) ?
        0 :
        parseInt(match[5]);
    if (hour > 23) {
        throw new Error(`Hour must be [0, 23]`);
    }
    const minute = (match[6] == undefined) ?
        0 :
        parseInt(match[6]);
    if (minute > 59) {
        throw new Error(`Minute must be [0, 59]`);
    }
    const second = (match[7] == undefined) ?
        0 :
        parseInt(match[7]);
    if (second > 59) {
        throw new Error(`Second must be [0, 59]`);
    }
    const microsecondPart = (match[9] == undefined) ?
        0 :
        parseInt(match[9]);
    if (microsecondPart > 999999) {
        throw new Error(`Microsecond must be [0, 999999]`);
    }
    const millisecond = Math.floor(microsecondPart / 1000);
    const microsecond = microsecondPart - (millisecond * 1000);
    if (match[9] != undefined &&
        match[9].length > fractionalSecondPrecision) {
        throw new Error(`Expected DATETIME(${fractionalSecondPrecision}), received DATETIME(${match[9].length})`);
    }
    //TODO-FEATURE Microsecond support
    //BEGIN TEMPORARY NON-SUPPORT FOR MICROSECOND
    if (microsecond != 0) {
        throw new Error(`Microsecond support for DATETIME is not supported yet`);
    }
    //END TEMPORARY NON-SUPPORT FOR MICROSECOND
    const utcMillisecondTimestamp = Date.UTC(year, 
    //Date.UTC() expects [0, 11]
    month - 1, dayOfMonth, hour, minute, second, millisecond);
    return new Date(utcMillisecondTimestamp);
}
exports.fromSqlUtc = fromSqlUtc;
//# sourceMappingURL=util.js.map