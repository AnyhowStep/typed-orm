import * as d from "../declaration";
import * as sd from "schema-decorator";
export declare class ColumnExpr<UsedReferencesT extends d.PartialColumnReferences, TableNameT extends string, NameT extends string, TypeT> implements d.IColumnExpr<UsedReferencesT, TableNameT, NameT, TypeT> {
    readonly usedReferences: UsedReferencesT;
    readonly table: TableNameT;
    readonly name: NameT;
    readonly assertDelegate: sd.AssertDelegate<TypeT>;
    readonly originalQuery: string;
    readonly query: string;
    constructor(usedReferences: UsedReferencesT, table: TableNameT, name: NameT, assert: sd.AssertFunc<TypeT>, originalQuery: string);
    querify(sb: d.IStringBuilder): void;
}
export declare class Expr<UsedReferencesT extends d.PartialColumnReferences, TypeT> implements d.IExpr<UsedReferencesT, TypeT> {
    readonly usedReferences: UsedReferencesT;
    readonly assertDelegate: sd.AssertDelegate<TypeT>;
    readonly query: string;
    constructor(usedReferences: UsedReferencesT, assert: sd.AssertFunc<TypeT>, originalQuery: string);
    as<AliasT extends string>(alias: AliasT): d.IColumnExpr<UsedReferencesT, "__expr", AliasT, TypeT>;
    querify(sb: d.IStringBuilder): void;
}
