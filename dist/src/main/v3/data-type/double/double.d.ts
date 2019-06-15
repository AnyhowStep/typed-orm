import * as sd from "schema-decorator";
declare function double(): sd.AssertDelegate<number> & {
    __accepts: number;
    __canAccept: string | number;
};
declare namespace double {
    var nullable: () => sd.AssertDelegate<number | null> & {
        __accepts: number | null;
        __canAccept: string | number | null;
    };
}
export { double };
