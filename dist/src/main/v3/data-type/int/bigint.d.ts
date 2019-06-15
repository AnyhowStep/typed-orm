import * as sd from "schema-decorator";
declare function bigint(): sd.AssertDelegate<bigint> & {
    __accepts: string | number | bigint;
    __canAccept: string | number | bigint;
};
declare namespace bigint {
    var nullable: () => sd.AssertDelegate<bigint | null> & {
        __accepts: string | number | bigint | null;
        __canAccept: string | number | bigint | null;
    };
}
declare function bigintSigned(): sd.AssertDelegate<bigint> & {
    __accepts: bigint;
    __canAccept: string | number | bigint;
};
declare namespace bigintSigned {
    var nullable: () => sd.AssertDelegate<bigint | null> & {
        __accepts: bigint | null;
        __canAccept: string | number | bigint | null;
    };
}
declare function bigintUnsigned(): sd.AssertDelegate<bigint> & {
    __accepts: bigint;
    __canAccept: string | number | bigint;
};
declare namespace bigintUnsigned {
    var nullable: () => sd.AssertDelegate<bigint | null> & {
        __accepts: bigint | null;
        __canAccept: string | number | bigint | null;
    };
}
export { bigint, bigintSigned, bigintUnsigned };
