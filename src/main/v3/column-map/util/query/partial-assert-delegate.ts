import * as sd from "type-mapping";
import {ColumnMap} from "../../column-map";
import {TypeMapUtil} from "../../../type-map";

export type PartialAssertDelegate<MapT extends ColumnMap> = (
    MapT extends ColumnMap ?
    sd.SafeMapper<Partial<TypeMapUtil.FromColumnMap<MapT>>> :
    never
);
export function partialAssertDelegate<MapT extends ColumnMap> (
    map : MapT
) : PartialAssertDelegate<MapT> {
    const fields : sd.Field<any, any>[] = [];
    for (let columnName in map) {
        /*
            It's possible that this is not an IColumnUtil.
            But, in general, if we pass in candidateKey and columnMap
            without any outside hack-ery, this should be correct.
        */
        const column = map[columnName];
        fields.push(sd.withName(
            sd.optional(column.assertDelegate),
            column.name
        ) as any);
    }
    return sd.objectFromArray(...fields) as any;
}