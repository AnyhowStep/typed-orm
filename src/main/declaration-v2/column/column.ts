import * as sd from "schema-decorator";
import {Querify} from "../querify";

export class Column<
    TableAliasT extends string,
    NameT extends string,
    TypeT
> implements Querify {
    constructor (
        readonly tableAlias : TableAliasT,
        readonly name : NameT,
        readonly assertDelegate : sd.AssertDelegate<TypeT>
    ) {

    }

    querify () {

    }
    /*as<AliasT extends string>(alias : AliasT) : IColumnExpr<
        ColumnToReference<IColumn<TableNameT, NameT, TypeT>>,
        "__expr",
        AliasT,
        TypeT
    >;*/
}
export type AnyColumn = Column<string, string, any>;
