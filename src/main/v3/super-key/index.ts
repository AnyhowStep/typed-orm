import * as sd from "type-mapping";
import {ITable} from "../table";
import {ColumnMap, ColumnMapUtil} from "../column-map";
import {TypeMapUtil} from "../type-map";
import {Key} from "../key";
import {Omit} from "../type";
import {CandidateKeyImpl} from "../candidate-key";

export type SuperKeyImpl<MapT extends ColumnMap, K extends Key> = (
    K extends Key ?
    CandidateKeyImpl<MapT, K> &
    Partial<
        TypeMapUtil.FromColumnMap<
            Omit<MapT, K[number]>
        >
    > :
    never
);
export type SuperKey<TableT extends ITable> = (
    SuperKeyImpl<
        TableT["columns"],
        TableT["candidateKeys"][number]
    >
);
export namespace SuperKeyUtil {
    export type AssertDelegate<TableT extends ITable> = (
        sd.SafeMapper<SuperKey<TableT>>
    );
    export function assertDelegate<TableT extends ITable> (
        table : TableT
    ) : (
        AssertDelegate<TableT>
    ) {
        return sd.unsafeOr(
            ...table.candidateKeys.map((candidateKey) => {
                return sd.deepMerge(
                    ColumnMapUtil.assertDelegate(
                        ColumnMapUtil.pick(table.columns, candidateKey)
                    ),
                    ColumnMapUtil.partialAssertDelegate(
                        ColumnMapUtil.omit(table.columns, candidateKey)
                    )
                );
            })
        ) as any;
    }
}