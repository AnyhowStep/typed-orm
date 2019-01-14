import * as sd from "schema-decorator";
export declare function double(): sd.AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
export declare namespace double {
    var nullable: () => sd.AssertDelegate<number | null> & {
        __accepts: number | null;
        __canAccept: string | number | null;
    };
}
//# sourceMappingURL=double.d.ts.map