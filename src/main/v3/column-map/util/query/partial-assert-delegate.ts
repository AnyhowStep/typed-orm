import * as sd from "schema-decorator";
import {ColumnMap} from "../../column-map";
import {TypeMapUtil} from "../../../type-map";

export type PartialAssertDelegate<MapT extends ColumnMap> = (
    MapT extends ColumnMap ?
    sd.AssertDelegate<Partial<TypeMapUtil.FromColumnMap<MapT>>> :
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
        fields.push(sd.field(
            column.name,
            sd.optional(column.assertDelegate)
        ));
    }
    return sd.schema(...fields) as any;
}