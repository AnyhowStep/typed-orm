import * as d from "../declaration";
import * as sd from "schema-decorator";
export declare class Column<TableNameT extends string, NameT extends string, TypeT> implements d.IColumn<TableNameT, NameT, TypeT> {
    readonly table: TableNameT;
    readonly name: NameT;
    readonly assertDelegate: sd.AssertDelegate<TypeT>;
    readonly fullName: string;
    readonly subTableName: string | undefined;
    readonly isSelectReference: boolean;
    constructor(table: TableNameT, name: NameT, assert: sd.AssertFunc<TypeT>, subTableName?: string, isSelectReference?: boolean);
    as<AliasT extends string>(alias: AliasT): d.IColumnExpr<d.ColumnToReference<d.IColumn<TableNameT, NameT, TypeT>>, "__expr", AliasT, TypeT>;
    querify(sb: d.IStringBuilder): void;
}
