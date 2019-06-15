import * as sd from "type-mapping";
export declare type DateTime = Date;
declare function dateTime(fractionalSecondPrecision?: 0 | 1 | 2 | 3): sd.SafeMapper<DateTime>;
declare namespace dateTime {
    var nullable: (fractionalSecondPrecision?: 0 | 2 | 1 | 3) => sd.Mapper<unknown, Date | null> & sd.ExpectedInput<Date | null> & sd.MappableInput<Date | null>;
}
export { dateTime };
