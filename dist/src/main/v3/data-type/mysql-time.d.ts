import * as sd from "schema-decorator";
export declare class MySqlTime {
    private readonly hour;
    private readonly minute;
    private readonly second;
    private readonly millisecond;
    private readonly microsecond;
    constructor(mySqlTimeString: string);
    unixMillisecondTimestamp(timezoneMinuteOffset?: number): number;
    unixMicrosecondTimestamp(timezoneMinuteOffset?: number): number;
    jsDate(timezoneMinuteOffset?: number): Date;
    microsecondPart(): number;
    mySqlString(): string;
    toJSON(): string;
    static FromJsDate(jsDate: Date): MySqlTime;
}
export declare const time: sd.AssertDelegate<MySqlTime> & {
    __accepts: string | Date | MySqlTime;
    __canAccept: string | Date | MySqlTime;
};
//# sourceMappingURL=mysql-time.d.ts.map