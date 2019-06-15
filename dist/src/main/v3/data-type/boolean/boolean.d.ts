import * as sd from "schema-decorator";
export declare const assertBoolean: sd.AssertDelegate<boolean> & {
    __accepts: boolean | 0 | 1 | "0" | "1";
    __canAccept: boolean | 0 | 1 | "0" | "1";
};
export declare const assertTrue: sd.AssertDelegate<boolean> & {
    __accepts: true | 1 | "1";
    __canAccept: true | 1 | "1";
};
export declare const assertFalse: sd.AssertDelegate<boolean> & {
    __accepts: false | 0 | "0";
    __canAccept: false | 0 | "0";
};
declare function boolean(): sd.AssertDelegate<boolean> & {
    __accepts: boolean | 0 | 1 | "0" | "1";
    __canAccept: boolean | 0 | 1 | "0" | "1";
};
declare namespace boolean {
    var nullable: () => sd.AssertDelegate<boolean | null> & {
        __accepts: boolean | 0 | 1 | "0" | "1" | null;
        __canAccept: boolean | 0 | 1 | "0" | "1" | null;
    };
}
declare function getTrue(): sd.AssertDelegate<boolean> & {
    __accepts: true | 1 | "1";
    __canAccept: true | 1 | "1";
};
declare namespace getTrue {
    var nullable: () => sd.AssertDelegate<boolean | null> & {
        __accepts: true | 1 | "1" | null;
        __canAccept: true | 1 | "1" | null;
    };
}
declare function getFalse(): sd.AssertDelegate<boolean> & {
    __accepts: false | 0 | "0";
    __canAccept: false | 0 | "0";
};
declare namespace getFalse {
    var nullable: () => sd.AssertDelegate<boolean | null> & {
        __accepts: false | 0 | "0" | null;
        __canAccept: false | 0 | "0" | null;
    };
}
export { boolean, getTrue as true, getFalse as false, };
