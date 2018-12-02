import * as sd from "schema-decorator";

export namespace FieldUtil {
    export type NullableNameUnion<F extends sd.AnyField> = (
        F extends sd.AnyField ?
        (
            null extends ReturnType<F["assertDelegate"]> ?
            F["name"] :
            never
        ) :
        never
    );
}