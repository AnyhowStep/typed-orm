import * as sd from "schema-decorator";
export declare type DateTime = Date;
declare function dateTime(fractionalSecondPrecision?: 0 | 1 | 2 | 3): sd.AssertDelegate<DateTime>;
declare namespace dateTime {
    var nullable: (fractionalSecondPrecision?: 0 | 2 | 1 | 3) => sd.AssertDelegate<Date | null> & {
        __accepts: Date | null;
        __canAccept: Date | null;
    };
}
export { dateTime };
