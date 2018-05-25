import * as sd from "schema-decorator";
import { Querify } from "../querify";
import { StringBuilder } from "../StringBuilder";
export declare class Column<TableAliasT extends string, NameT extends string, TypeT> implements Querify {
    readonly tableAlias: TableAliasT;
    readonly name: NameT;
    readonly assertDelegate: sd.AssertDelegate<TypeT>;
    readonly fullName: string;
    readonly subTableName: string | undefined;
    readonly isSelectReference: boolean;
    constructor(tableAlias: TableAliasT, name: NameT, assertDelegate: sd.AssertDelegate<TypeT>, subTableName?: string, isSelectReference?: boolean);
    querify(sb: StringBuilder): void;
}
export declare type AnyColumn = Column<string, string, any>;
