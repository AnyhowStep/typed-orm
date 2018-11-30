import * as sd from "schema-decorator";
import {CandidateKey} from "./candidate-key";
import {ColumnMap} from "../column-map";

export namespace CandidateKeyUtil {
    //TODO Find better name
    export type ToTypeMap<
        CandidateKeyT extends CandidateKey,
        ColumnMapT extends ColumnMap
    > = (
        {
            readonly [columnName in Extract<
                keyof ColumnMapT,
                CandidateKeyT[number]
            >] : (
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
            }
        }
        return sd.schema(...fields) as any;
    }
    export function isEqual (a : CandidateKey, b : CandidateKey) : boolean {
        return (
            a.every(aKey => b.indexOf(aKey) >= 0) &&
            b.every(bKey => a.indexOf(bKey) >= 0)
        );
    }
}