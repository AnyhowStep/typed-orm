import * as sd from "schema-decorator";
import {Table, ITable} from "../../table";
import * as exprLib from "../../../expr-library";
import {superKeyAssertDelegate} from "./super-key-assert-delegate";
import {SuperKey} from "./super-key-assert-delegate";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnUtil} from "../../../column";
import {Expr} from "../../../expr";

export function eqSuperKey<
    TableT extends ITable
> (
    table : TableT,
    sk : SuperKey<TableT>
) : (
    Expr<{
        usedRef : ColumnRefUtil.FromColumnArray<
            ColumnUtil.FromColumnMap<TableT["columns"]>[]
        >,
        assertDelegate : sd.AssertDelegate<boolean>
    }>
) {
    const assertDelegate = (table instanceof Table) ?
        table.superKeyAssertDelegate() :
        superKeyAssertDelegate(table);

    sk = assertDelegate(
        `${table.alias}.sk`,
        sk
    );

    const arr = Object.keys(sk).sort().map(
        columnName => exprLib.nullSafeEq(
            table.columns[columnName],
            (sk as any)[columnName]
        )
    );
    const condition = exprLib.and(...(arr as any));
    return condition;
}