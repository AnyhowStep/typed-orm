import * as sd from "schema-decorator";
import {ITable} from "../table";
import {ColumnMap, ColumnMapUtil} from "../column-map";
import {TypeMapUtil} from "../type-map";
import {Key} from "../key";

export type CandidateKeyImpl<MapT extends ColumnMap, K extends Key> = (
    K extends Key ?
    TypeMapUtil.FromColumnMap<
        Pick<MapT, K[number]>
    > :
    never
);
export type CandidateKey<TableT extends ITable> = (
    CandidateKeyImpl<
        TableT["columns"],
        TableT["candidateKeys"][number]
    >
);
export namespace CandidateKeyUtil {
    export type AssertDelegate<TableT extends ITable> = (
        sd.AssertDelegate<CandidateKey<TableT>>
    );
    export function assertDelegate<TableT extends ITable> (
        table : TableT
    ) : (
        AssertDelegate<TableT>
    ) {
        return sd.or(
            ...table.candidateKeys.map((candidateKey) => {
                return ColumnMapUtil.assertDelegate(
                    ColumnMapUtil.pick(table.columns, candidateKey)
                );
            })
        ) as any;
    }
}