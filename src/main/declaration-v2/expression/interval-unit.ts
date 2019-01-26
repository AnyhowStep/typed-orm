//https://dev.mysql.com/doc/refman/5.5/en/date-and-time-functions.html#function_date-add
export enum IntervalUnit {
    //These units can be represented with numbers
    MICROSECOND = "MICROSECOND",
    SECOND = "SECOND",
    MINUTE = "MINUTE",
    HOUR = "HOUR",
    DAY = "DAY",
    WEEK = "WEEK",
    MONTH = "MONTH",
    QUARTER = "QUARTER",
    YEAR = "YEAR",
    //These units require strings to represent
    SECOND_MICROSECOND = "SECOND_MICROSECOND",
    MINUTE_MICROSECOND = "MINUTE_MICROSECOND",
    MINUTE_SECOND = "MINUTE_SECOND",
    HOUR_MICROSECOND = "HOUR_MICROSECOND",
    HOUR_SECOND = "HOUR_SECOND",
    HOUR_MINUTE = "HOUR_MINUTE",
    DAY_MICROSECOND = "DAY_MICROSECOND",
    DAY_SECOND = "DAY_SECOND",
    DAY_MINUTE = "DAY_MINUTE",
    DAY_HOUR = "DAY_HOUR",
    YEAR_MONTH = "YEAR_MONTH",
}

export enum NumericIntervalUnit {
    //These units can be represented with numbers
    MICROSECOND = "MICROSECOND",
    SECOND = "SECOND",
    MINUTE = "MINUTE",
    HOUR = "HOUR",
    DAY = "DAY",
    WEEK = "WEEK",
    MONTH = "MONTH",
    QUARTER = "QUARTER",
    YEAR = "YEAR",
}