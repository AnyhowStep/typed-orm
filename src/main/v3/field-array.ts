import * as sd from "schema-decorator";

export namespace FieldArrayUtil {
    export type NullableNameUnion<
        FieldsT extends sd.AnyField[]
    > = (
        {
            [index in keyof FieldsT] : (
                FieldsT[index] extends sd.AnyField ?
                (
                    null extends ReturnType<FieldsT[index]["assertDelegate"]> ?
                    FieldsT[index]["name"] :
                    never
                ) :
                never
            )
        }[number]
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