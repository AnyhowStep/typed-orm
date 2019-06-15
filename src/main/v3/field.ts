import * as sd from "type-mapping";

export namespace FieldUtil {
    export type NullableNameUnion<F extends sd.AnyField> = (
        F extends sd.AnyField ?
        (
            null extends ReturnType<F> ?
            F["__name"] :
            never
        ) :
        never
    );
}