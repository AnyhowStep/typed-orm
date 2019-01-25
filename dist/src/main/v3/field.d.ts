import * as sd from "schema-decorator";
export declare namespace FieldUtil {
    type NullableNameUnion<F extends sd.AnyField> = (F extends sd.AnyField ? (null extends ReturnType<F["assertDelegate"]> ? F["name"] : never) : never);
}
