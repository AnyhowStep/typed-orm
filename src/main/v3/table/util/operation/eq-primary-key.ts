import * as sd from "schema-decorator";
import {Table, ITable} from "../../table";
import * as exprLib from "../../../expr-library";
import {ColumnUtil} from "../../../column";
import {Expr} from "../../../expr";
import {Key} from "../../../key";
import {PrimaryKey, PrimaryKeyUtil} from "../../../primary-key";

export function eqPrimaryKey<
    TableT extends ITable & { primaryKey : Key }
> (
    table : TableT,
    ck : PrimaryKey<TableT>
) : (
    Expr<{
        usedColumns : ColumnUtil.FromColumnMap<TableT["columns"]>[],
        assertDelegate : sd.AssertDelegate<boolean>
    }>
) {
    const assertDelegate = (table instanceof Table) ?
        (table as any).primaryKeyAssertDelegate() :
        PrimaryKeyUtil.assertDelegate(table);

    ck = assertDelegate(
        `${table.alias}.ck`,
        ck
    );

    const arr = Object.keys(ck).sort().map(
        columnName => exprLib.nullSafeEq(
            table.columns[columnName],
            (ck as any)[columnName]
        )
    );
    const condition = exprLib.and(...(arr as any));
    return condition;
}