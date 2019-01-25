/// <reference types="node" />
import * as sd from "schema-decorator";
export interface BufferDelegateNullable {
    (minLength: number, maxLength: number): sd.AssertDelegate<Buffer | null>;
    (maxLength: number): sd.AssertDelegate<Buffer | null>;
    (): sd.AssertDelegate<Buffer | null>;
}
export declare function bufferDelegate(dataTypeStr: string, absoluteMax: number): {
    (minLength: number, maxLength: number): sd.AssertDelegate<Buffer>;
    (maxLength: number): sd.AssertDelegate<Buffer>;
    (): sd.AssertDelegate<Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const binary: {
    (minLength: number, maxLength: number): sd.AssertDelegate<Buffer>;
    (maxLength: number): sd.AssertDelegate<Buffer>;
    (): sd.AssertDelegate<Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const varBinary: {
    (minLength: number, maxLength: number): sd.AssertDelegate<Buffer>;
    (maxLength: number): sd.AssertDelegate<Buffer>;
    (): sd.AssertDelegate<Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const tinyBlob: {
    (minLength: number, maxLength: number): sd.AssertDelegate<Buffer>;
    (maxLength: number): sd.AssertDelegate<Buffer>;
    (): sd.AssertDelegate<Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const blob: {
    (minLength: number, maxLength: number): sd.AssertDelegate<Buffer>;
    (maxLength: number): sd.AssertDelegate<Buffer>;
    (): sd.AssertDelegate<Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const mediumBlob: {
    (minLength: number, maxLength: number): sd.AssertDelegate<Buffer>;
    (maxLength: number): sd.AssertDelegate<Buffer>;
    (): sd.AssertDelegate<Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const longBlob: {
    (minLength: number, maxLength: number): sd.AssertDelegate<Buffer>;
    (maxLength: number): sd.AssertDelegate<Buffer>;
    (): sd.AssertDelegate<Buffer>;
    nullable: BufferDelegateNullable;
};
