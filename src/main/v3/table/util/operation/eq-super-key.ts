import * as sd from "schema-decorator";
import {Table, ITable} from "../../table";
import * as exprLib from "../../../expr-library";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnUtil} from "../../../column";
import {Expr} from "../../../expr";
import {SuperKey, SuperKeyUtil} from "../../../super-key";

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
        SuperKeyUtil.assertDelegate(table);

    sk = assertDelegate(
        `${table.alias}.sk`,
        sk
    ) as SuperKey<TableT>;

    const arr = Object.keys(sk)
        .sort()
        .filter(columnName => (sk as any)[columnName] !== undefined)
        .map(
            columnName => exprLib.nullSafeEq(
                table.columns[columnName],
                (sk as any)[columnName]
            )
        );
    const condition = exprLib.and(...(arr as any));
    return condition;
}