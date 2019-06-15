import * as sd from "type-mapping";
export interface JsonDelegateNullable {
    (minLength: number, maxLength: number): sd.SafeMapper<string | null>;
    (maxLength: number): sd.SafeMapper<string | null>;
    (): sd.SafeMapper<string | null>;
}
export declare function jsonDelegate(dataTypeStr: string, absoluteMax: number, defaultSize: number): {
    (minLength: number, maxLength: number): sd.SafeMapper<string>;
    (maxLength: number): sd.SafeMapper<string>;
    (): sd.SafeMapper<string>;
    nullable: JsonDelegateNullable;
};
export declare const json: {
    (minLength: number, maxLength: number): sd.Mapper<unknown, string>;
    (maxLength: number): sd.Mapper<unknown, string>;
    (): sd.Mapper<unknown, string>;
    nullable: JsonDelegateNullable;
};
