import * as sd from "schema-decorator";
export interface JsonDelegateNullable {
    (minLength: number, maxLength: number): sd.AssertDelegate<string | null>;
    (maxLength: number): sd.AssertDelegate<string | null>;
    (): sd.AssertDelegate<string | null>;
}
export declare function jsonDelegate(dataTypeStr: string, absoluteMax: number, defaultSize: number): {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
    nullable: JsonDelegateNullable;
};
export declare const json: {
    (minLength: number, maxLength: number): sd.AssertDelegate<string>;
    (maxLength: number): sd.AssertDelegate<string>;
    (): sd.AssertDelegate<string>;
    nullable: JsonDelegateNullable;
};
//# sourceMappingURL=json.d.ts.map