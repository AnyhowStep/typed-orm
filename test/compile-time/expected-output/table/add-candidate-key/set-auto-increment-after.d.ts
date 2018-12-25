import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const ai: o.Table<{
    readonly usedRef: {};
    readonly alias: "joined1";
    readonly columns: {
        readonly a: o.Column<{
            tableAlias: "joined1";
            name: "a";
            assertDelegate: sd.AssertDelegate<Date> & {
                __accepts: Date;
                __canAccept: string | number | Date;
            };
        }>;
        readonly b: o.Column<{
            tableAlias: "joined1";
            name: "b";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
        readonly y: o.Column<{
            tableAlias: "joined1";
            name: "y";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly c: o.Column<{
            tableAlias: "joined1";
            name: "c";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly d: o.Column<{
            tableAlias: "joined1";
            name: "d";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
    };
    readonly autoIncrement: "b";
    readonly id: "b";
    readonly candidateKeys: ("b"[] | "y"[] | ("c" | "d")[])[];
    readonly generated: "b"[];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: "b"[];
    readonly mutable: ("a" | "y" | "c" | "d")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
