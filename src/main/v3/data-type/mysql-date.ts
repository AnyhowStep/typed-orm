import * as sd from "schema-decorator";

const mySqlDateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
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
/*
    A wrapper for MySQL's Date, which is notorious for not having timezones
    implemented.

    The format is,

    YYYY-MM-DD
*/
export class MySqlDate {
    private readonly year : number;
    //[1, 12]
    private readonly month : number;
    //[1, 31]
    private readonly dayOfMonth : number;

    constructor (mySqlDateString : string) {
        const match = mySqlDateRegex.exec(mySqlDateString);
        if (match == undefined) {
            throw new Error(`Invalid MySQL DATE string`);
        }
        this.year = parseInt(match[1]);
        //1-based
        this.month = parseInt(match[2]);
        //1-based
        this.dayOfMonth = parseInt(match[3]);

        if (!isValidDate(this.year, this.month-1, this.dayOfMonth)) {
            throw new Error(`Invalid MySQL DATE string; month or day does not exist for given year`);
        }
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
            this.dayOfMonth
        );
        return utc - timezoneMillisecondOffset;
    }
    unixMicrosecondTimestamp (timezoneMinuteOffset : number=0) {
        const millisecondTimestamp = this.unixMillisecondTimestamp(
            timezoneMinuteOffset
        );
        const microsecondTimestamp = millisecondTimestamp * 1000;
        return microsecondTimestamp;
    }
    jsDate (timezoneMinuteOffset : number=0) {
        return new Date(this.unixMillisecondTimestamp(timezoneMinuteOffset));
    }
    mySqlString () {
        return toMySqlDateString({
            year : this.year,
            month : this.month,
            dayOfMonth : this.dayOfMonth,
        });
    }
    toJSON () {
        const args = {
            year : this.year,
            month : this.month,
            dayOfMonth : this.dayOfMonth,
        };
        const dateString = toMySqlDateString(args);
        return `${dateString}`;
    }

    /*
        Uses UTC. Truncates time part of JS Date.
    */
    static FromJsDate (jsDate : Date) {
        const str = toMySqlDateString({
            year : jsDate.getUTCFullYear(),
            //[0, 11] + 1 = [1, 12]
            month : jsDate.getUTCMonth() + 1,
            //[1, 31]
            dayOfMonth : jsDate.getUTCDate(),
        });
        return new MySqlDate(str);
    }
}

export function date () {
    return sd.or(
        sd.instanceOf(MySqlDate),
        sd.chain(
            sd.string(),
            (name : string, str : string) => {
                try {
                    const result = new MySqlDate(str);
                    return result;
                } catch (err) {
                    throw new Error(`Could not parse ${name}: ${err.message}`);
                }
            }
        ),
        sd.chain(
            sd.validDate(),
            (name : string, jsDate : Date) => {
                try {
                    const result = MySqlDate.FromJsDate(jsDate);
                    return result;
                } catch (err) {
                    throw new Error(`Could not convert jsDate ${name}: ${err.message}`);
                }
            }
        )
    );
}