import * as sd from "schema-decorator";

const mySqlDateTimeRegex = /^(\d{2}):(\d{2}):(\d{2})(\.(\d{1,6}))?$/;
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
/*
    A wrapper for MySQL's Time, which is notorious for not having timezones
    implemented.

    The format is,

    hh:mm:ss.uuuuuu

    Up to microsecond precision, or 6 fractional seconds precision.
*/
export class MySqlTime {
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

    constructor (mySqlTimeString : string) {
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

        const millisecond = Math.floor(microsecondPart/1000);
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
    unixMillisecondTimestamp (timezoneMinuteOffset : number=0) {
        const timezoneMillisecondOffset = timezoneMinuteOffset*60*1000;
        const utc =  Date.UTC(
            //1970 Jan 1
            1970,
            0,
            1,
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
        return toMySqlTimeString({
            hour : this.hour,
            minute : this.minute,
            second : this.second,
            microsecondPart : this.microsecondPart(),
        });
    }
    toJSON () {
        const args = {
            hour : this.hour,
            minute : this.minute,
            second : this.second,
            microsecondPart : this.microsecondPart(),
        };
        const timeString = toMySqlTimeString(args);
        return `${timeString}`;
    }

    /*
        Uses UTC. Ignores Date part.
    */
    static FromJsDate (jsDate : Date) {
        const str = toMySqlTimeString({
            //[0, 23]
            hour : jsDate.getUTCHours(),
            //[0, 59]
            minute : jsDate.getUTCMinutes(),
            //[0, 59]
            second : jsDate.getUTCSeconds(),
            //[0, 999] * 1000 = [0, 999000]
            microsecondPart : jsDate.getUTCMilliseconds() * 1000,
        });
        return new MySqlTime(str);
    }
}

export const time = sd.or(
    sd.instanceOf(MySqlTime),
    sd.chain(
        sd.string(),
        (name : string, str : string) => {
            try {
                const result = new MySqlTime(str);
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
                const result = MySqlTime.FromJsDate(jsDate);
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
                const result = MySqlTime.FromJsDate(jsDate);
                return result;
            } catch (err) {
                throw new Error(`Could not convert jsDate ${name}: ${err.message}`);
            }
        }
    )
);