import * as sd from "schema-decorator";
import {CandidateKey, CandidateKeyUtil} from "./candidate-key";
import {ColumnMap} from "./column-map";

export namespace SuperKeyUtil {
    export type ToTypeMap<
        CandidateKeyT extends CandidateKey,
        ColumnMapT extends ColumnMap
    > = (
        CandidateKeyUtil.ToTypeMap<CandidateKeyT, ColumnMapT> &
        {
            [columnName in Exclude<
                keyof ColumnMapT,
                CandidateKeyT[number]
            >]? : (
                ReturnType<ColumnMapT[columnName]["assertDelegate"]>
            )
        }
    );
    export type ToAssertDelegate<
        CandidateKeyT extends CandidateKey,
        ColumnMapT extends ColumnMap
    > = (
        sd.AssertDelegate<ToTypeMap<CandidateKeyT, ColumnMapT>>
    );
    export function toAssertDelegate<
        CandidateKeyT extends CandidateKey,
        ColumnMapT extends ColumnMap
    > (
        candidateKey : CandidateKeyT,
        columnMap : ColumnMapT
    ) : (
        ToAssertDelegate<CandidateKeyT, ColumnMapT>
    ) {
        const fields : sd.Field<any, any>[] = [];
        for (let columnName in columnMap) {
            /*
                It's possible that this is not an IColumn.
                But, in general, if we pass in candidateKey and columnMap
                without any outside hack-ery, this should be correct.
            */
            const column = columnMap[columnName];
            if (candidateKey.indexOf(column.name) >= 0) {
                fields.push(sd.field(
                    column.name,
                    column.assertDelegate
                ));
            } else {
                fields.push(sd.field(
                    column.name,
                    sd.optional(column.assertDelegate)
                ));
            }
        }
        return sd.schema(...fields) as any;
    }
}