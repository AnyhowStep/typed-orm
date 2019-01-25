import * as sd from "schema-decorator";
export declare function float(): sd.AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
export declare namespace float {
    var nullable: () => sd.AssertDelegate<number | null> & {
        __accepts: number | null;
        __canAccept: string | number | null;
    };
}
