"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const mySqlDateTimeRegex = /^(\d{2}):(\d{2}):(\d{2})(\.(\d{1,6}))?$/;
function zeroPad({ value, length, }) {
    const str = value.toString();
    if (str.length >= length) {
        return str;
    }
    else {
        return "0".repeat(length - str.length) + str;
    }
}
function toMySqlTimeString(args) {
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
    return `${hour}:${minute}:${second}.${microsecondPart}`;
}
/*
    A wrapper for MySQL's Time, which is notorious for not having timezones
    implemented.

    The format is,

    hh:mm:ss.uuuuuu

    Up to microsecond precision, or 6 fractional seconds precision.
*/
class MySqlTime {
    constructor(mySqlTimeString) {
        const match = mySqlDateTimeRegex.exec(mySqlTimeString);
        if (match == undefined) {
            throw new Error(`Invalid MySQL DATETIME string`);
        }
        this.hour = parseInt(match[1]);
        if (this.hour > 23) {
            throw new Error(`Hour must be [0, 23]`);
        }
        this.minute = parseInt(match[2]);
        if (this.minute > 59) {
            throw new Error(`Minute must be [0, 59]`);
        }
        this.second = parseInt(match[3]);
        if (this.second > 59) {
            throw new Error(`Second must be [0, 59]`);
        }
        const microsecondPart = (match[5] == undefined) ?
            0 :
            parseInt(match[5]);
        if (microsecondPart > 999999) {
            throw new Error(`Microsecond must be [0, 999999]`);
        }
        const millisecond = Math.floor(microsecondPart / 1000);
        const microsecond = microsecondPart - (millisecond * 1000);
        this.millisecond = millisecond;
        this.microsecond = microsecond;
    }
    /*
        MySQL TIME values do not have a timezone.
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

        -----

        This is only an approximation of timezone offsets!
        Use a *real* timezone library if you need offsets
        for whatever reason.
    */
    unixMillisecondTimestamp(timezoneMinuteOffset = 0) {
        const timezoneMillisecondOffset = timezoneMinuteOffset * 60 * 1000;
        const utc = Date.UTC(
        //1970 Jan 1
        1970, 0, 1, this.hour, this.minute, this.second, this.millisecond);
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
        return toMySqlTimeString({
            hour: this.hour,
            minute: this.minute,
            second: this.second,
            microsecondPart: this.microsecondPart(),
        });
    }
    toJSON() {
        const args = {
            hour: this.hour,
            minute: this.minute,
            second: this.second,
            microsecondPart: this.microsecondPart(),
        };
        const timeString = toMySqlTimeString(args);
        return `${timeString}`;
    }
    /*
        Uses UTC. Ignores Date part.
    */
    static FromJsDate(jsDate) {
        const str = toMySqlTimeString({
            //[0, 23]
            hour: jsDate.getUTCHours(),
            //[0, 59]
            minute: jsDate.getUTCMinutes(),
            //[0, 59]
            second: jsDate.getUTCSeconds(),
            //[0, 999] * 1000 = [0, 999000]
            microsecondPart: jsDate.getUTCMilliseconds() * 1000,
        });
        return new MySqlTime(str);
    }
}
exports.MySqlTime = MySqlTime;
function time() {
    return sd.or(sd.instanceOf(MySqlTime), sd.chain(sd.string(), (name, str) => {
        try {
            const result = new MySqlTime(str);
            return result;
        }
        catch (err) {
            throw new Error(`Could not parse ${name}: ${err.message}`);
        }
    }), sd.chain(sd.string(), sd.dateTime(), (name, jsDate) => {
        try {
            const result = MySqlTime.FromJsDate(jsDate);
            return result;
        }
        catch (err) {
            throw new Error(`Could not convert jsDate ${name}: ${err.message}`);
        }
    }), sd.chain(sd.validDate(), (name, jsDate) => {
        try {
            const result = MySqlTime.FromJsDate(jsDate);
            return result;
        }
        catch (err) {
            throw new Error(`Could not convert jsDate ${name}: ${err.message}`);
        }
    }));
}
exports.time = time;
//# sourceMappingURL=mysql-time.js.map