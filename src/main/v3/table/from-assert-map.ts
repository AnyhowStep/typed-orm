import {Table} from "./table";
import {ColumnMapUtil} from "../column-map";
import {AssertMap, AssertMapUtil} from "../assert-map";
import {escapeId} from "mysql";

export function tableFromAssertMap<
    NameT extends string,
    AssertMapT extends AssertMap
> (
    name : NameT,
    assertMap : AssertMapT
) : (
    Table<{
        readonly usedRef : {};
        readonly alias : NameT;
        readonly columns : ColumnMapUtil.FromAssertMap<NameT, AssertMapT>;

        readonly autoIncrement : undefined;
        readonly generated : [];
        readonly isNullable : AssertMapUtil.NullableNameUnion<AssertMapT>[];
        readonly hasExplicitDefaultValue : [];
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
    const isNullable = AssertMapUtil.nullableNames(assertMap);

    const mutable : Extract<keyof AssertMapT, string>[] = columnNames;

    return new Table(
        {
            usedRef : {},
            alias : name,
            columns,

            autoIncrement : undefined,
            id : undefined,
            candidateKeys : [] as [],

            generated : [] as [],
            isNullable,
            hasExplicitDefaultValue : [] as [],
            mutable,

            parents : [] as [],
            insertAllowed : true,
            deleteAllowed : true,
        },
        {
            unaliasedQuery : escapeId(name),
        }
    );
}