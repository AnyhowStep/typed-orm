import * as sd from "schema-decorator";
export declare function strDelegate(dataTypeStr: string, absoluteMax: number): {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
};
export declare const char: {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
};
export declare const varChar: {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
};
export declare const tinyText: {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
};
export declare const text: {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
};
export declare const mediumText: {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
};
export declare const longText: {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
};
//# sourceMappingURL=char.d.ts.map