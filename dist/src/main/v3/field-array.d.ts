import * as sd from "schema-decorator";
import { FieldUtil } from "./field";
export declare namespace FieldArrayUtil {
    type NullableNameUnion<FieldsT extends sd.AnyField[]> = (FieldUtil.NullableNameUnion<FieldsT[number]>);
    function nullableNames<FieldsT extends sd.AnyField[]>(fields: FieldsT): (NullableNameUnion<FieldsT>[]);
}
