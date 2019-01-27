import {escapeId} from "sqlstring";
import {Table} from "../../table";
import {ColumnMapUtil} from "../../../column-map";
import {AssertMap, AssertMapUtil} from "../../../assert-map";

export type FromAssertMap<
    NameT extends string,
    AssertMapT extends AssertMap
> = (
    Table<{
        readonly usedColumns : never[];
        readonly alias : NameT;
        readonly columns : ColumnMapUtil.FromAssertMap<NameT, AssertMapT>;

        readonly autoIncrement : undefined;
        readonly id : undefined;
        readonly primaryKey : undefined;
        readonly candidateKeys : [];

        readonly generated : [];
        readonly isNullable : AssertMapUtil.NullableNameUnion<AssertMapT>[];
        readonly hasExplicitDefaultValue : [];
        readonly mutable : Extract<keyof AssertMapT, string>[];

        readonly parents : [];
        readonly insertAllowed : true;
        readonly deleteAllowed : true;
    }>
);
export function fromAssertMap<
    NameT extends string,
    AssertMapT extends AssertMap
> (
    name : NameT,
    assertMap : AssertMapT
) : (
    FromAssertMap<NameT, AssertMapT>
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
            usedColumns : [],
            alias : name,
            columns,

            autoIncrement : undefined,
            id : undefined,
            primaryKey : undefined,
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