import * as sd from "schema-decorator";
export declare class MySqlDate {
    private readonly year;
    private readonly month;
    private readonly dayOfMonth;
    constructor(mySqlDateString: string);
    unixMillisecondTimestamp(timezoneMinuteOffset?: number): number;
    unixMicrosecondTimestamp(timezoneMinuteOffset?: number): number;
    jsDate(timezoneMinuteOffset?: number): Date;
    mySqlString(): string;
    toJSON(): string;
    static FromJsDate(jsDate: Date): MySqlDate;
}
export declare function date(): sd.AssertDelegate<MySqlDate> & {
    __accepts: string | Date | MySqlDate;
    __canAccept: string | Date | MySqlDate;
};
//# sourceMappingURL=mysql-date.d.ts.map