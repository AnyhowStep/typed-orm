import * as sd from "schema-decorator";
declare function unsafeInt(): sd.AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
declare namespace unsafeInt {
    var nullable: () => sd.AssertDelegate<number | null> & {
        __accepts: number | null;
        __canAccept: string | number | null;
    };
}
declare function tinyIntSigned(): sd.AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
declare namespace tinyIntSigned {
    var nullable: () => sd.AssertDelegate<number | null> & {
        __accepts: number | null;
        __canAccept: string | number | null;
    };
}
declare function smallIntSigned(): sd.AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
declare namespace smallIntSigned {
    var nullable: () => sd.AssertDelegate<number | null> & {
        __accepts: number | null;
        __canAccept: string | number | null;
    };
}
declare function mediumIntSigned(): sd.AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
declare namespace mediumIntSigned {
    var nullable: () => sd.AssertDelegate<number | null> & {
        __accepts: number | null;
        __canAccept: string | number | null;
    };
}
declare function intSigned(): sd.AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
declare namespace intSigned {
    var nullable: () => sd.AssertDelegate<number | null> & {
        __accepts: number | null;
        __canAccept: string | number | null;
    };
}
declare function tinyIntUnsigned(): sd.AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
declare namespace tinyIntUnsigned {
    var nullable: () => sd.AssertDelegate<number | null> & {
        __accepts: number | null;
        __canAccept: string | number | null;
    };
}
declare function smallIntUnsigned(): sd.AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
declare namespace smallIntUnsigned {
    var nullable: () => sd.AssertDelegate<number | null> & {
        __accepts: number | null;
        __canAccept: string | number | null;
    };
}
declare function mediumIntUnsigned(): sd.AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
declare namespace mediumIntUnsigned {
    var nullable: () => sd.AssertDelegate<number | null> & {
        __accepts: number | null;
        __canAccept: string | number | null;
    };
}
declare function intUnsigned(): sd.AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
declare namespace intUnsigned {
    var nullable: () => sd.AssertDelegate<number | null> & {
        __accepts: number | null;
        __canAccept: string | number | null;
    };
}
export { unsafeInt, tinyIntSigned, smallIntSigned, mediumIntSigned, intSigned, tinyIntUnsigned, smallIntUnsigned, mediumIntUnsigned, intUnsigned, };
