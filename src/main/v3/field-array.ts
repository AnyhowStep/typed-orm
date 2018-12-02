import * as sd from "schema-decorator";
import {FieldUtil} from "./field";

export namespace FieldArrayUtil {
    export type NullableNameUnion<
        FieldsT extends sd.AnyField[]
    > = (
        FieldUtil.NullableNameUnion<FieldsT[number]>
    );
    export function nullableNames<FieldsT extends sd.AnyField[]> (
        fields : FieldsT
    ) : (
        NullableNameUnion<FieldsT>[]
    ) {
        return fields
            .filter(field => sd.isNullable(field.assertDelegate))
            .map(field => field.name);
    }
}