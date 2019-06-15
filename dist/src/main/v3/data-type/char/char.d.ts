import * as sd from "type-mapping";
export interface StrDelegateNullable {
    (minLength: number, maxLength: number): sd.SafeMapper<string | null>;
    (maxLength: number): sd.SafeMapper<string | null>;
    (): sd.SafeMapper<string | null>;
}
export declare function strDelegate(dataTypeStr: string, absoluteMax: number): {
    (minLength: number, maxLength: number): sd.SafeMapper<string>;
    (maxLength: number): sd.SafeMapper<string>;
    (): sd.SafeMapper<string>;
    nullable: StrDelegateNullable;
};
export declare const char: {
    (minLength: number, maxLength: number): sd.Mapper<unknown, string>;
    (maxLength: number): sd.Mapper<unknown, string>;
    (): sd.Mapper<unknown, string>;
    nullable: StrDelegateNullable;
};
export declare const varChar: {
    (minLength: number, maxLength: number): sd.Mapper<unknown, string>;
    (maxLength: number): sd.Mapper<unknown, string>;
    (): sd.Mapper<unknown, string>;
    nullable: StrDelegateNullable;
};
export declare const tinyText: {
    (minLength: number, maxLength: number): sd.Mapper<unknown, string>;
    (maxLength: number): sd.Mapper<unknown, string>;
    (): sd.Mapper<unknown, string>;
    nullable: StrDelegateNullable;
};
export declare const text: {
    (minLength: number, maxLength: number): sd.Mapper<unknown, string>;
    (maxLength: number): sd.Mapper<unknown, string>;
    (): sd.Mapper<unknown, string>;
    nullable: StrDelegateNullable;
};
export declare const mediumText: {
    (minLength: number, maxLength: number): sd.Mapper<unknown, string>;
    (maxLength: number): sd.Mapper<unknown, string>;
    (): sd.Mapper<unknown, string>;
    nullable: StrDelegateNullable;
};
export declare const longText: {
    (minLength: number, maxLength: number): sd.Mapper<unknown, string>;
    (maxLength: number): sd.Mapper<unknown, string>;
    (): sd.Mapper<unknown, string>;
    nullable: StrDelegateNullable;
};
