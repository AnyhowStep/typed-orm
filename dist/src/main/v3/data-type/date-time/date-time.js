"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const DateTimeUtil = require("./util");
function buildDateTimeDelegate(fractionalSecondPrecision /*|4|5|6*/) {
    return sd.or(sd.instanceOfDate(), sd.pipe(sd.string(), (name, str) => {
        try {
            return DateTimeUtil.fromSqlUtc(str, fractionalSecondPrecision);
        }
        catch (err) {
            throw new Error(`${name}: Invalid MySQL DATETIME(${fractionalSecondPrecision}); ${err.message}`);
        }
    }));
}
const dateTimeDelegateArr = [
    buildDateTimeDelegate(0),
    buildDateTimeDelegate(1),
    buildDateTimeDelegate(2),
    buildDateTimeDelegate(3),
];
function dateTime(fractionalSecondPrecision = 0) {
    return dateTimeDelegateArr[fractionalSecondPrecision];
    /*return buildDataType(
        sd.or(
            sd.instanceOfDate(),
            sd.pipe(
                sd.string(),
                (name : string, str : string) => {
                    try {
                        return DateTimeUtil.fromSqlUtc(str, fractionalSecondPrecision);
                    } catch (err) {
                        throw new Error(`${name}: Invalid MySQL DATETIME(${fractionalSecondPrecision}); ${err.message}`);
                    }
                },
                assert
            )
        ),
        {
            toSql : (value) => {
                return DateTimeUtil.toSqlUtc(value, fractionalSecondPrecision)
            },
            dataType : DataType.datetime,
            characterMaximumLength : null,
            numericPrecision : null,
            numericScale : null,
            dateTimePrecision : fractionalSecondPrecision,
            collationName : null,
            columnType : "datetime",
        }
    );*/
}
exports.dateTime = dateTime;
dateTime.nullable = (fractionalSecondPrecision = 0) => sd.orNull(dateTime(fractionalSecondPrecision));
//# sourceMappingURL=date-time.js.map