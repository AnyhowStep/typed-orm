import * as sd from "schema-decorator";
import {ColumnMap} from "../../column-map";
import {TypeMapUtil} from "../../../type-map";

export type AssertDelegate<MapT extends ColumnMap> = (
    MapT extends ColumnMap ?
    sd.AssertDelegate<TypeMapUtil.FromColumnMap<MapT>> :
    never
);
export function assertDelegate<MapT extends ColumnMap> (
    map : MapT
) : AssertDelegate<MapT> {
    const fields : sd.Field<any, any>[] = [];
    for (let columnName in map) {
        /*
            It's possible that this is not an IColumnUtil.
            But, in general, if we pass in candidateKey and columnMap
            without any outside hack-ery, this should be correct.
        */
        const column = map[columnName];
        fields.push(sd.field(
            column.name,
            column.assertDelegate
        ));
    }
    return sd.schema(...fields) as any;
}