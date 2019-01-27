import * as sd from "schema-decorator";
import {ITable} from "../../../table";
import * as exprLib from "../../../expr-library";
import {superKeyAssertDelegate} from "./super-key-assert-delegate";
import {SuperKey} from "./super-key-assert-delegate";
import {ColumnUtil} from "../../../column";
import {Expr} from "../../../expr";

export function eqSuperKey<
    TableT extends ITable
> (
    table : TableT,
    sk : SuperKey<TableT>
) : (
    Expr<{
        usedColumns : ColumnUtil.FromColumnMap<TableT["columns"]|TableT["parents"][number]["columns"]>[],
        assertDelegate : sd.AssertDelegate<boolean>
    }>
) {
    const assertDelegate = superKeyAssertDelegate(table);

    sk = assertDelegate(
        `${table.alias}.sk`,
        sk
    );

    const arr = Object.keys(sk)
        .sort()
        .filter(columnName => (sk as any)[columnName] !== undefined)
        .map(columnName => {
            if (columnName in table.columns) {
                return exprLib.nullSafeEq(
                    table.columns[columnName],
                    (sk as any)[columnName]
                );
            }
            //TODO-DEBATE is it better to check downwards
            //or upwards?
            for (let i=table.parents.length-1; i>=0; --i) {
                const p = table.parents[i];
                if (columnName in p.columns) {
                    return exprLib.nullSafeEq(
                        p.columns[columnName],
                        (sk as any)[columnName]
                    );
                }
            }
            throw new Error(`Column ${columnName} does not exist in table ${table.alias} or its parents`);
        });
    const condition = exprLib.and(...(arr as any));
    return condition;
}