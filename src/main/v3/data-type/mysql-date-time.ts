import * as sd from "schema-decorator";

const mySqlDateTimeRegex = /^(\d{4})-(\d{2})-(\d{2})( (\d{2}):(\d{2}):(\d{2})(\.(\d{1,6}))?)?$/;
//Month is zero-based
//Day is one-based
function isValidDate (year : number, month : number, day : number) {
    var d = new Date(year, month, day);
    if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) {
        return true;
    }
    return false;
}
function zeroPad (
    {
        value,
        length,
    } :
    {
        value : number,
        length : number,
    }
) {
    const str = value.toString();
    if (str.length >= length) {
        return str;
    } else {
        return "0".repeat(length - str.length) + str;
    }
}
function toMySqlDateString (args : {
    readonly year : number,
    //[1, 12]
    readonly month : number,
    //[1, 31]
    readonly dayOfMonth : number,
}) {
    const year = zeroPad({
        value : args.year,
        length : 4,
    });
    const month = zeroPad({
        value : args.month,
        length : 2,
    });
    const dayOfMonth = zeroPad({
        value : args.dayOfMonth,
        length : 2,
    });
    return `${year}-${month}-${dayOfMonth}`;
}
function toMySqlTimeString (args : {
    //[0, 23]
    readonly hour : number,
    //[0, 59]
    readonly minute : number,
    //[0, 59]
    readonly second : number,
    //[0, 999999]
    readonly microsecondPart : number,
}) {
    const hour = zeroPad({
        value : args.hour,
        length : 2,
    });
    const minute = zeroPad({
        value : args.minute,
        length : 2,
    });
    const second = zeroPad({
        value : args.second,
        length : 2,
    });
    const microsecondPart = zeroPad({
        value : args.microsecondPart,
        length : 6,
    });
    return `${hour}:${minute}:${second}.${microsecondPart}`;
}
function toMySqlDateTimeString (args : {
    readonly year : number,
    //[1, 12]
    readonly month : number,
    //[1, 31]
    readonly dayOfMonth : number,
    //[0, 23]
    readonly hour : number,
    //[0, 59]
    readonly minute : number,
    //[0, 59]
    readonly second : number,
    //[0, 999999]
    readonly microsecondPart : number,
}) {
    const dateString = toMySqlDateString(args);
    const timeString = toMySqlTimeString(args);
    return `${dateString} ${timeString}`;
}
/*
    A wrapper for MySQL's DateTime, which is notorious for not having timezones
    implemented.

    The format is,

    YYYY-MM-DD hh:mm:ss.uuuuuu

    Up to microsecond precision, or 6 fractional seconds precision.
*/
export class MySqlDateTime {
    private readonly year : number;
    //[1, 12]
    private readonly month : number;
    //[1, 31]
    private readonly dayOfMonth : number;

    //[0, 23]
    private readonly hour : number;
    //[0, 59]
    private readonly minute : number;
    //[0, 59]
    private readonly second : number;

    //[0, 999]
    private readonly millisecond : number;
    //[0, 999]
    private readonly microsecond : number;

    constructor (mySqlDateTimeString : string) {
        const match = mySqlDateTimeRegex.exec(mySqlDateTimeString);
        if (match == undefined) {
            throw new Error(`Invalid MySQL DATETIME string`);
        }
        this.year = parseInt(match[1]);
        //1-based
        this.month = parseInt(match[2]);
        //1-based
        this.dayOfMonth = parseInt(match[3]);

        if (!isValidDate(this.year, this.month-1, this.dayOfMonth)) {
            throw new Error(`Invalid MySQL DATETIME string; month or day does not exist for given year`);
        }

        this.hour = (match[5] == undefined) ?
            0 :
            parseInt(match[5]);
        if (this.hour > 23) {
            throw new Error(`Hour must be [0, 23]`);
        }
        this.minute = (match[6] == undefined) ?
            0 :
            parseInt(match[6]);
        if (this.minute > 59) {
            throw new Error(`Minute must be [0, 59]`);
        }
        this.second = (match[7] == undefined) ?
            0 :
            parseInt(match[7]);
        if (this.second > 59) {
            throw new Error(`Second must be [0, 59]`);
        }

        const microsecondPart = (match[9] == undefined) ?
            0 :
            parseInt(match[9]);
        if (microsecondPart > 999999) {
            throw new Error(`Microsecond must be [0, 999999]`);
        }

        const millisecond = Math.floor(microsecondPart/1000);
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

        -----

        This is only an approximation of timezone offsets!
        Use a *real* timezone library if you need offsets
        for whatever reason.
    */
    unixMillisecondTimestamp (timezoneMinuteOffset : number=0) {
        const timezoneMillisecondOffset = timezoneMinuteOffset*60*1000;
        const utc =  Date.UTC(
            this.year,
            this.month-1,
            this.dayOfMonth,
            this.hour,
            this.minute,
            this.second,
            this.millisecond
        );
        return utc - timezoneMillisecondOffset;
    }
    unixMicrosecondTimestamp (timezoneMinuteOffset : number=0) {
        const millisecondTimestamp = this.unixMillisecondTimestamp(
            timezoneMinuteOffset
        );
        const microsecondTimestamp = millisecondTimestamp * 1000;
        return microsecondTimestamp + this.microsecond;
    }
    jsDate (timezoneMinuteOffset : number=0) {
        return new Date(this.unixMillisecondTimestamp(timezoneMinuteOffset));
    }
    //[0, 999999]
    microsecondPart () {
        return (this.millisecond * 1000) + this.microsecond;
    }
    mySqlString () {
        return toMySqlDateTimeString({
            year : this.year,
            month : this.month,
            dayOfMonth : this.dayOfMonth,
            hour : this.hour,
            minute : this.minute,
            second : this.second,
            microsecondPart : this.microsecondPart(),
        });
    }
    toJSON () {
        const args = {
            year : this.year,
            month : this.month,
            dayOfMonth : this.dayOfMonth,
            hour : this.hour,
            minute : this.minute,
            second : this.second,
            microsecondPart : this.microsecondPart(),
        };
        const dateString = toMySqlDateString(args);
        const timeString = toMySqlTimeString(args);
        //Like Date.toJSON() but has 6 fractional second parts
        //instead of 3
        return `${dateString}T${timeString}Z`;
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
    static FromJsDate (jsDate : Date) {
        const str = toMySqlDateTimeString({
            year : jsDate.getUTCFullYear(),
            //[0, 11] + 1 = [1, 12]
            month : jsDate.getUTCMonth() + 1,
            //[1, 31]
            dayOfMonth : jsDate.getUTCDate(),
            //[0, 23]
            hour : jsDate.getUTCHours(),
            //[0, 59]
            minute : jsDate.getUTCMinutes(),
            //[0, 59]
            second : jsDate.getUTCSeconds(),
            //[0, 999] * 1000 = [0, 999000]
            microsecondPart : jsDate.getUTCMilliseconds() * 1000,
        });
        return new MySqlDateTime(str);
    }
}

export function dateTime () {
    return sd.or(
        sd.instanceOf(MySqlDateTime),
        sd.chain(
            sd.string(),
            (name : string, str : string) => {
                try {
                    const result = new MySqlDateTime(str);
                    return result;
                } catch (err) {
                    throw new Error(`Could not parse ${name}: ${err.message}`);
                }
            }
        ),
        sd.chain(
            sd.string(),
            sd.dateTime(),
            (name : string, jsDate : Date) => {
                try {
                    const result = MySqlDateTime.FromJsDate(jsDate);
                    return result;
                } catch (err) {
                    throw new Error(`Could not convert jsDate ${name}: ${err.message}`);
                }
            }
        ),
        sd.chain(
            sd.validDate(),
            (name : string, jsDate : Date) => {
                try {
                    const result = MySqlDateTime.FromJsDate(jsDate);
                    return result;
                } catch (err) {
                    throw new Error(`Could not convert jsDate ${name}: ${err.message}`);
                }
            }
        )
    );
}