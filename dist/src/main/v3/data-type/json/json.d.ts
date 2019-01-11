import * as sd from "schema-decorator";
export declare function jsonDelegate(dataTypeStr: string, absoluteMax: number, defaultSize: number): {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
};
export declare const json: {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
};
//# sourceMappingURL=json.d.ts.map