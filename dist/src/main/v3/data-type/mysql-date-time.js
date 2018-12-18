"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const mySqlDateTimeRegex = /^(\d{4})-(\d{2})-(\d{2})( (\d{2}):(\d{2}):(\d{2})(\.(\d{1,6}))?)?$/;
//Month is zero-based
//Day is one-based
function isValidDate(year, month, day) {
    var d = new Date(year, month, day);
    if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) {
        return true;
    }
    return false;
}
function zeroPad({ value, length, }) {
    const str = value.toString();
    if (str.length >= length) {
        return str;
    }
    else {
        return "0".repeat(length - str.length) + str;
    }
}
function toMySqlDateTimeString(args) {
    const year = zeroPad({
        value: args.year,
        length: 4,
    });
    const month = zeroPad({
        value: args.month,
        length: 2,
    });
    const dayOfMonth = zeroPad({
        value: args.dayOfMonth,
        length: 2,
    });
    const hour = zeroPad({
        value: args.hour,
        length: 2,
    });
    const minute = zeroPad({
        value: args.minute,
        length: 2,
    });
    const second = zeroPad({
        value: args.second,
        length: 2,
    });
    const microsecondPart = zeroPad({
        value: args.microsecondPart,
        length: 6,
    });
    return `${year}-${month}-${dayOfMonth} ${hour}:${minute}:${second}.${microsecondPart}`;
}
/*
    A wrapper for MySQL's DateTime, which is notorious for not having timezones
    implemented.

    The format is,

    YYYY-MM-DD hh:mm:ss.uuuuuu

    Up to microsecond precision, or 6 fractional seconds precision.
*/
class MySqlDateTime {
    constructor(mySqlDateTimeString) {
        const match = mySqlDateTimeRegex.exec(mySqlDateTimeString);
        if (match == undefined) {
            throw new Error(`Invalid MySQL DATETIME string`);
        }
        this.year = parseInt(match[1]);
        //1-based
        this.month = parseInt(match[2]);
        //1-based
        this.dayOfMonth = parseInt(match[3]);
        if (!isValidDate(this.year, this.month - 1, this.dayOfMonth)) {
            throw new Error(`Invalid MySQL DATETIME string; month or day does not exist for given year`);
        }
        this.hour = parseInt(match[5]);
        if (this.hour > 23) {
            throw new Error(`Hour must be [0, 23]`);
        }
        this.minute = parseInt(match[6]);
        if (this.minute > 59) {
            throw new Error(`Minute must be [0, 59]`);
        }
        this.second = parseInt(match[7]);
        if (this.second > 59) {
            throw new Error(`Second must be [0, 59]`);
        }
        const microsecondPart = parseInt(match[9]);
        if (microsecondPart > 999999) {
            throw new Error(`Microsecond must be [0, 999999]`);
        }
        const millisecond = Math.floor(microsecondPart / 1000);
        const microsecond = microsecondPart - (millisecond * 1000);
        this.millisecond = millisecond;
        this.microsecond = microsecond;
    }
    /*
        MySQL DATETIME values do not have a timezone.
        If no `timezoneMinuteOffset` is given, then we assume UTC.
        Zero offset.

        To calculate the `timezoneMinuteOffset`,

        +8 would be 8*60 = 480
        -8:30 would be -(8*60 + 30) = -510

        So, if this MySQL DATETIME value represents a time in
        GMT +8, you would call,

        mySqlDateTime.unixMillisecondTimestamp(480);

        If this represents a time in GMT -5, you would call,

        mySqlDateTime.unixMillisecondTimestamp(-400);
    */
    unixMillisecondTimestamp(timezoneMinuteOffset = 0) {
        const timezoneMillisecondOffset = timezoneMinuteOffset * 60 * 1000;
        const utc = Date.UTC(this.year, this.month - 1, this.dayOfMonth, this.hour, this.minute, this.second, this.millisecond);
        return utc - timezoneMillisecondOffset;
    }
    unixMicrosecondTimestamp(timezoneMinuteOffset = 0) {
        const millisecondTimestamp = this.unixMillisecondTimestamp(timezoneMinuteOffset);
        const microsecondTimestamp = millisecondTimestamp * 1000;
        return microsecondTimestamp + this.microsecond;
    }
    jsDate(timezoneMinuteOffset = 0) {
        return new Date(this.unixMillisecondTimestamp(timezoneMinuteOffset));
    }
    //[0, 999999]
    microsecondPart() {
        return (this.millisecond * 1000) + this.microsecond;
    }
    mySqlString() {
        return toMySqlDateTimeString({
            year: this.year,
            month: this.month,
            dayOfMonth: this.dayOfMonth,
            hour: this.hour,
            minute: this.minute,
            second: this.second,
            microsecondPart: this.microsecondPart(),
        });
    }
    /*
        JS `Date`s only have millisecond precision.
        The microsecond part will be zero.

        Uses UTC.

        To convert to and from MySqlDateTime,

        const jsNow = new Date();
        const mySqlNow = MySqlDateTime.FromJsDate(jsNow);

        const jsNow2 = mySqlNow.jsDate();
        //Should be `true`
        console.log(jsNow.getTime() === jsNow2.getTime());
    */
    static FromJsDate(jsDate) {
        const str = toMySqlDateTimeString({
            year: jsDate.getUTCFullYear(),
            //[0, 11] + 1 = [1, 12]
            month: jsDate.getUTCMonth() + 1,
            //[1, 31]
            dayOfMonth: jsDate.getUTCDate(),
            //[0, 23]
            hour: jsDate.getUTCHours(),
            //[0, 59]
            minute: jsDate.getUTCMinutes(),
            //[0, 59]
            second: jsDate.getUTCSeconds(),
            //[0, 999] * 1000 = [0, 999000]
            microsecondPart: jsDate.getUTCMilliseconds() * 1000,
        });
        return new MySqlDateTime(str);
    }
}
exports.MySqlDateTime = MySqlDateTime;
function dateTime() {
    return sd.or(sd.instanceOf(MySqlDateTime), sd.chain(sd.string(), (name, str) => {
        try {
            const result = new MySqlDateTime(str);
            return result;
        }
        catch (err) {
            throw new Error(`Could not parse ${name}: ${err.message}`);
        }
    }), sd.chain(sd.dateTime(), (name, jsDate) => {
        try {
            const result = MySqlDateTime.FromJsDate(jsDate);
            return result;
        }
        catch (err) {
            throw new Error(`Could not convert jsDate ${name}: ${err.message}`);
        }
    }));
}
exports.dateTime = dateTime;
//# sourceMappingURL=mysql-date-time.js.map