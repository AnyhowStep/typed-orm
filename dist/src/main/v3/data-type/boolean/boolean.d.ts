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
export declare function boolean(): sd.AssertDelegate<boolean> & {
    __accepts: boolean | 0 | 1 | "0" | "1";
    __canAccept: boolean | 0 | 1 | "0" | "1";
};
declare function getTrue(): sd.AssertDelegate<boolean> & {
    __accepts: true | 1 | "1";
    __canAccept: true | 1 | "1";
};
declare function getFalse(): sd.AssertDelegate<boolean> & {
    __accepts: false | 0 | "0";
    __canAccept: false | 0 | "0";
};
export { getTrue as true, getFalse as false, };
//# sourceMappingURL=boolean.d.ts.map