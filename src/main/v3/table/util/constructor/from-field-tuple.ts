import {escapeId} from "sqlstring";
import * as sd from "schema-decorator";
import {Table} from "../../table";
import {Tuple} from "../../../tuple";
import {ColumnMapUtil} from "../../../column-map";
import {FieldArrayUtil} from "../../../field-array";

export type FromFieldTuple<
    NameT extends string,
    FieldsT extends Tuple<sd.AnyField>
> = (
    Table<{
        readonly usedRef : {};
        readonly alias : NameT;
        readonly columns : ColumnMapUtil.FromFieldArray<NameT, FieldsT>;

        readonly autoIncrement : undefined;
        readonly id : undefined;
        readonly primaryKey : undefined;
        readonly candidateKeys : [];

        readonly generated : [];
        readonly isNullable : FieldArrayUtil.NullableNameUnion<FieldsT>[];
        readonly hasExplicitDefaultValue : [];
        readonly mutable : FieldsT[number]["name"][];

        readonly parents : [];
        readonly insertAllowed : true;
        readonly deleteAllowed : true;
    }>
);
export function fromFieldTuple<
    NameT extends string,
    FieldsT extends Tuple<sd.AnyField>
> (
    name : NameT,
    fields : FieldsT
) : (
    FromFieldTuple<NameT, FieldsT>
) {
    const columns = ColumnMapUtil.fromFieldArray(name, fields);

    const isNullable = FieldArrayUtil.nullableNames(fields);

    const mutable : FieldsT[number]["name"][] = fields.map(field => field.name);

    return new Table(
        {
            usedRef : {},
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