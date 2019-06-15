import * as sd from "type-mapping";
export interface BufferDelegateNullable {
    (minLength: number, maxLength: number): sd.SafeMapper<Buffer | null>;
    (maxLength: number): sd.SafeMapper<Buffer | null>;
    (): sd.SafeMapper<Buffer | null>;
}
export declare function bufferDelegate(dataTypeStr: string, absoluteMax: number): {
    (minLength: number, maxLength: number): sd.SafeMapper<Buffer>;
    (maxLength: number): sd.SafeMapper<Buffer>;
    (): sd.SafeMapper<Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const binary: {
    (minLength: number, maxLength: number): sd.Mapper<unknown, Buffer>;
    (maxLength: number): sd.Mapper<unknown, Buffer>;
    (): sd.Mapper<unknown, Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const varBinary: {
    (minLength: number, maxLength: number): sd.Mapper<unknown, Buffer>;
    (maxLength: number): sd.Mapper<unknown, Buffer>;
    (): sd.Mapper<unknown, Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const tinyBlob: {
    (minLength: number, maxLength: number): sd.Mapper<unknown, Buffer>;
    (maxLength: number): sd.Mapper<unknown, Buffer>;
    (): sd.Mapper<unknown, Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const blob: {
    (minLength: number, maxLength: number): sd.Mapper<unknown, Buffer>;
    (maxLength: number): sd.Mapper<unknown, Buffer>;
    (): sd.Mapper<unknown, Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const mediumBlob: {
    (minLength: number, maxLength: number): sd.Mapper<unknown, Buffer>;
    (maxLength: number): sd.Mapper<unknown, Buffer>;
    (): sd.Mapper<unknown, Buffer>;
    nullable: BufferDelegateNullable;
};
export declare const longBlob: {
    (minLength: number, maxLength: number): sd.Mapper<unknown, Buffer>;
    (maxLength: number): sd.Mapper<unknown, Buffer>;
    (): sd.Mapper<unknown, Buffer>;
    nullable: BufferDelegateNullable;
};
