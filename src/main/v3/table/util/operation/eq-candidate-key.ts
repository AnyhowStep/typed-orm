import * as sd from "type-mapping";
import {Table, ITable} from "../../table";
import * as exprLib from "../../../expr-library";
import {CandidateKey, CandidateKeyUtil} from "../../../candidate-key";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnUtil} from "../../../column";
import {Expr} from "../../../expr";

export function eqCandidateKey<
    TableT extends ITable
> (
    table : TableT,
    ck : CandidateKey<TableT>
) : (
    Expr<{
        usedRef : ColumnRefUtil.FromColumnArray<
            ColumnUtil.FromColumnMap<TableT["columns"]>[]
        >,
        assertDelegate : sd.SafeMapper<boolean>
    }>
) {
    const assertDelegate = (table instanceof Table) ?
        table.candidateKeyAssertDelegate() :
        CandidateKeyUtil.assertDelegate(table);

    ck = assertDelegate(
        `${table.alias}.ck`,
        ck
    ) as CandidateKey<TableT>;

    const arr = Object.keys(ck).sort().map(
        columnName => exprLib.nullSafeEq(
            table.columns[columnName],
            (ck as any)[columnName]
        )
    );
    const condition = exprLib.and(...(arr as any));
    return condition;
}