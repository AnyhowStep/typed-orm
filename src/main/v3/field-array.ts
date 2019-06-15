import * as sd from "type-mapping";
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
            .filter(field => sd.canOutputNull(field))
            .map(field => field.__name) as any;
    }
}