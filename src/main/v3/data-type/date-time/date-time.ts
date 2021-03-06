import * as sd from "type-mapping";
import * as DateTimeUtil from "./util";

//Just a type alias since we don't support DATETIME(4/5/6)
export type DateTime = Date;

function buildDateTimeDelegate (
    fractionalSecondPrecision : 0|1|2|3/*|4|5|6*/
) {
    return sd.or(
        sd.instanceOfDate(),
        sd.pipe(
            sd.string(),
            (name : string, str : string) => {
                try {
                    return DateTimeUtil.fromSqlUtc(str, fractionalSecondPrecision);
                } catch (err) {
                    throw new Error(`${name}: Invalid MySQL DATETIME(${fractionalSecondPrecision}); ${err.message}`);
                }
            }
        )
    );
}
const dateTimeDelegateArr = [
    buildDateTimeDelegate(0),
    buildDateTimeDelegate(1),
    buildDateTimeDelegate(2),
    buildDateTimeDelegate(3),
];
function dateTime (
    fractionalSecondPrecision : 0|1|2|3/*|4|5|6*/ = 0
) : sd.SafeMapper<DateTime> /*IDataType<DateTime>*/ {
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
dateTime.nullable = (
    fractionalSecondPrecision : 0|1|2|3/*|4|5|6*/ = 0
) => sd.orNull(dateTime(fractionalSecondPrecision));
export {dateTime}