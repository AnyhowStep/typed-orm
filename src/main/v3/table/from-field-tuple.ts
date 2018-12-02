import * as sd from "schema-decorator";
import {Table} from "./table";
import {Tuple} from "../tuple";
import {ColumnMapUtil} from "../column-map";
import {FieldArrayUtil} from "../field-array";

export function tableFromFieldTuple<
    NameT extends string,
    FieldsT extends Tuple<sd.AnyField>
> (
    name : NameT,
    fields : FieldsT
) : (
    Table<{
        readonly alias : NameT;
        readonly name  : NameT;
        readonly columns : ColumnMapUtil.FromFieldArray<NameT, FieldsT>;

        readonly autoIncrement : undefined;
        readonly generated : [];
        readonly isNullable : FieldArrayUtil.NullableNameUnion<FieldsT>[];
        readonly hasExplicitDefaultValue : [];
        readonly mutable : FieldsT[number]["name"][];
        readonly id : undefined;
        readonly candidateKeys : [];
        readonly parents : [];
        readonly insertAllowed : true;
        readonly deleteAllowed : true;
    }>
) {
    const columns = ColumnMapUtil.fromFieldArray(name, fields);

    const isNullable = FieldArrayUtil.nullableNames(fields);

    const mutable : FieldsT[number]["name"][] = fields.map(field => field.name);

    return new Table(
        {
            alias : name,
            name  : name,
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
        undefined
    );
}