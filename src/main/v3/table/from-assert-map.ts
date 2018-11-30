import {Table} from "./table";
import {ColumnMapUtil} from "../column-map";
import {AssertMap, AssertMapUtil} from "../assert-map";

export function tableFromAssertMap<
    NameT extends string,
    AssertMapT extends AssertMap
> (
    name : NameT,
    assertMap : AssertMapT
) : (
    Table<{
        readonly alias : NameT;
        readonly name  : NameT;
        readonly columns : ColumnMapUtil.FromAssertMap<NameT, AssertMapT>;

        readonly autoIncrement : undefined;
        readonly generated : [];
        readonly hasDefaultValue : AssertMapUtil.NullableNameUnion<AssertMapT>[];
        readonly mutable : Extract<keyof AssertMapT, string>[];
        readonly id : undefined;
        readonly candidateKeys : [];
        readonly parents : [];
        readonly insertAllowed : true;
        readonly deleteAllowed : true;
    }>
) {
    /*
        In general, this should be fine.
        Could be wrong if user does some weird hack-ery.
    */
    const columnNames = Object.keys(assertMap) as Extract<keyof AssertMapT, string>[];
    const columns = ColumnMapUtil.fromAssertMap(name, assertMap);
    const hasDefaultValue = AssertMapUtil.nullableNames(assertMap);

    const mutable : Extract<keyof AssertMapT, string>[] = columnNames;

    return new Table(
        {
            alias : name,
            name  : name,
            columns,

            autoIncrement : undefined,
            id : undefined,
            candidateKeys : [] as [],

            generated : [] as [],
            hasDefaultValue,
            mutable,

            parents : [] as [],
            insertAllowed : true,
            deleteAllowed : true,
        },
        undefined
    );
}