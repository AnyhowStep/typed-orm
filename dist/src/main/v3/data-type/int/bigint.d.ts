import * as sd from "schema-decorator";
export declare function bigint(): sd.AssertDelegate<bigint> & {
    __accepts: string | number | bigint;
    __canAccept: string | number | bigint;
};
export declare namespace bigint {
    var nullable: () => sd.AssertDelegate<bigint | null> & {
        __accepts: string | number | bigint | null;
        __canAccept: string | number | bigint | null;
    };
}
export declare function bigintSigned(): sd.AssertDelegate<bigint> & {
    __accepts: bigint;
    __canAccept: string | number | bigint;
};
export declare namespace bigintSigned {
    var nullable: () => sd.AssertDelegate<bigint | null> & {
        __accepts: bigint | null;
        __canAccept: string | number | bigint | null;
    };
}
export declare function bigintUnsigned(): sd.AssertDelegate<bigint> & {
    __accepts: bigint;
    __canAccept: string | number | bigint;
};
export declare namespace bigintUnsigned {
    var nullable: () => sd.AssertDelegate<bigint | null> & {
        __accepts: bigint | null;
        __canAccept: string | number | bigint | null;
    };
}
//# sourceMappingURL=bigint.d.ts.map