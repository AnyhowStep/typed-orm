import * as sd from "schema-decorator";
export declare class MySqlDateTime {
    private readonly year;
    private readonly month;
    private readonly dayOfMonth;
    private readonly hour;
    private readonly minute;
    private readonly second;
    private readonly millisecond;
    private readonly microsecond;
    constructor(mySqlDateTimeString: string);
    unixMillisecondTimestamp(timezoneMinuteOffset?: number): number;
    unixMicrosecondTimestamp(timezoneMinuteOffset?: number): number;
    jsDate(timezoneMinuteOffset?: number): Date;
    microsecondPart(): number;
    mySqlString(): string;
    static FromJsDate(jsDate: Date): MySqlDateTime;
}
export declare function dateTime(): sd.AssertDelegate<MySqlDateTime> & {
    __accepts: string | Date | MySqlDateTime;
    __canAccept: string | number | Date | MySqlDateTime;
};
//# sourceMappingURL=mysql-date-time.d.ts.map