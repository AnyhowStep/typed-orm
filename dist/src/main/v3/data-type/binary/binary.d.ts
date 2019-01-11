/// <reference types="node" />
import * as sd from "schema-decorator";
export declare function bufferDelegate(dataTypeStr: string, absoluteMax: number): {
    (minLength: number, maxLength: number): sd.AssertDelegate<Buffer>;
    (maxLength: number): sd.AssertDelegate<Buffer>;
    (): sd.AssertDelegate<Buffer>;
};
export declare const binary: {
    (minLength: number, maxLength: number): sd.AssertDelegate<Buffer>;
    (maxLength: number): sd.AssertDelegate<Buffer>;
    (): sd.AssertDelegate<Buffer>;
};
export declare const varBinary: {
    (minLength: number, maxLength: number): sd.AssertDelegate<Buffer>;
    (maxLength: number): sd.AssertDelegate<Buffer>;
    (): sd.AssertDelegate<Buffer>;
};
export declare const tinyBlob: {
    (minLength: number, maxLength: number): sd.AssertDelegate<Buffer>;
    (maxLength: number): sd.AssertDelegate<Buffer>;
    (): sd.AssertDelegate<Buffer>;
};
export declare const blob: {
    (minLength: number, maxLength: number): sd.AssertDelegate<Buffer>;
    (maxLength: number): sd.AssertDelegate<Buffer>;
    (): sd.AssertDelegate<Buffer>;
};
export declare const mediumBlob: {
    (minLength: number, maxLength: number): sd.AssertDelegate<Buffer>;
    (maxLength: number): sd.AssertDelegate<Buffer>;
    (): sd.AssertDelegate<Buffer>;
};
export declare const longBlob: {
    (minLength: number, maxLength: number): sd.AssertDelegate<Buffer>;
    (maxLength: number): sd.AssertDelegate<Buffer>;
    (): sd.AssertDelegate<Buffer>;
};
//# sourceMappingURL=binary.d.ts.map