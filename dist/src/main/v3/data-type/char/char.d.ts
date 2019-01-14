import * as sd from "schema-decorator";
export interface StrDelegateNullable {
    (minLength: number, maxLength: number): sd.AssertDelegate<string | null>;
    (maxLength: number): sd.AssertDelegate<string | null>;
    (): sd.AssertDelegate<string | null>;
}
export declare function strDelegate(dataTypeStr: string, absoluteMax: number): {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
    nullable: StrDelegateNullable;
};
export declare const char: {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
    nullable: StrDelegateNullable;
};
export declare const varChar: {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
    nullable: StrDelegateNullable;
};
export declare const tinyText: {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
    nullable: StrDelegateNullable;
};
export declare const text: {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
    nullable: StrDelegateNullable;
};
export declare const mediumText: {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
    nullable: StrDelegateNullable;
};
export declare const longText: {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
    nullable: StrDelegateNullable;
};
//# sourceMappingURL=char.d.ts.map