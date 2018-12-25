/// <reference types="node" />
import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const i: o.Table<{
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
            assertDelegate: sd.AssertDelegate<Buffer> & {
                __accepts: Buffer;
                __canAccept: Buffer;
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
    readonly autoIncrement: undefined;
    readonly id: "b";
    readonly primaryKey: "b"[];
    readonly candidateKeys: ("b"[] | "y"[] | ("c" | "d")[])[];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("a" | "b" | "y" | "c" | "d")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;