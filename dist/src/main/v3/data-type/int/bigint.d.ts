import * as sd from "schema-decorator";
export declare function bigint(): sd.AssertDelegate<bigint> & {
    __accepts: string | number | bigint;
    __canAccept: string | number | bigint;
};
export declare function bigintSigned(): sd.AssertDelegate<bigint> & {
    __accepts: bigint;
    __canAccept: string | number | bigint;
};
export declare function bigintUnsigned(): sd.AssertDelegate<bigint> & {
    __accepts: bigint;
    __canAccept: string | number | bigint;
};
//# sourceMappingURL=bigint.d.ts.map