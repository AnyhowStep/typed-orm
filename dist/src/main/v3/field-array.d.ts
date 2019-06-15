import * as sd from "type-mapping";
import { FieldUtil } from "./field";
export declare namespace FieldArrayUtil {
    type NullableNameUnion<FieldsT extends sd.AnyField[]> = (FieldUtil.NullableNameUnion<FieldsT[number]>);
    function nullableNames<FieldsT extends sd.AnyField[]>(fields: FieldsT): (NullableNameUnion<FieldsT>[]);
}
