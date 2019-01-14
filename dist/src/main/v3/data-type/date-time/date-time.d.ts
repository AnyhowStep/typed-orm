import * as sd from "schema-decorator";
export declare type DateTime = Date;
export declare function dateTime(fractionalSecondPrecision?: 0 | 1 | 2 | 3): sd.AssertDelegate<DateTime>;
export declare namespace dateTime {
    var nullable: (fractionalSecondPrecision?: 0 | 2 | 1 | 3) => sd.AssertDelegate<Date | null> & {
        __accepts: Date | null;
        __canAccept: Date | null;
    };
}
//# sourceMappingURL=date-time.d.ts.map