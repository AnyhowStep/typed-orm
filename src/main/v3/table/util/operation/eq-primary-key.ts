import * as sd from "type-mapping";
import {Table, ITable} from "../../table";
import * as exprLib from "../../../expr-library";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnUtil} from "../../../column";
import {Expr} from "../../../expr";
import {Key} from "../../../key";
import {PrimaryKey, PrimaryKeyUtil} from "../../../primary-key";

export function eqPrimaryKey<
    TableT extends ITable & { primaryKey : Key }
> (
    table : TableT,
    pk : PrimaryKey<TableT>
) : (
    Expr<{
        usedRef : ColumnRefUtil.FromColumnArray<
            ColumnUtil.FromColumnMap<TableT["columns"]>[]
        >,
        assertDelegate : sd.SafeMapper<boolean>
    }>
) {
    const assertDelegate = (table instanceof Table) ?
        (table as any).primaryKeyAssertDelegate() :
        PrimaryKeyUtil.assertDelegate(table);

    pk = assertDelegate(
        `${table.alias}.pk`,
        pk
    );

    const arr = Object.keys(pk).sort().map(
        columnName => exprLib.nullSafeEq(
            table.columns[columnName],
            (pk as any)[columnName]
        )
    );
    const condition = exprLib.and(...(arr as any));
    return condition;
}