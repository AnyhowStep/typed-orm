import * as sd from "schema-decorator";
export declare type Decimal = string;
export declare function decimal(): sd.AssertDelegate<string> & {
    __accepts: string | number;
    __canAccept: string | number;
};
export declare namespace decimal {
    var nullable: () => sd.AssertDelegate<string | null> & {
        __accepts: string | number | null;
        __canAccept: string | number | null;
    };
}
