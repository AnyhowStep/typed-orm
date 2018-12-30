import * as sd from "schema-decorator";
import {Table, ITable} from "../../table";
import * as exprLib from "../../../expr-library";
import {primaryKeyAssertDelegate} from "./primary-key-assert-delegate";
import {PrimaryKey} from "./primary-key-assert-delegate";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnUtil} from "../../../column";
import {Expr} from "../../../expr";
import {CandidateKey} from "../../../candidate-key";

export function eqPrimaryKey<
    TableT extends ITable & { primaryKey : CandidateKey }
> (
    table : TableT,
    ck : PrimaryKey<TableT>
) : (
    Expr<{
        usedRef : ColumnRefUtil.FromColumnArray<
            ColumnUtil.FromColumnMap<TableT["columns"]>[]
        >,
        assertDelegate : sd.AssertDelegate<boolean>
    }>
) {
    const assertDelegate = (table instanceof Table) ?
        (table as any).primaryKeyAssertDelegate() :
        primaryKeyAssertDelegate(table);

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