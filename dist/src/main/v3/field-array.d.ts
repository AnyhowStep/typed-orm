import * as sd from "schema-decorator";
export declare namespace FieldArrayUtil {
    type NullableNameUnion<FieldsT extends sd.AnyField[]> = ({
        [index in keyof FieldsT]: (FieldsT[index] extends sd.AnyField ? (null extends ReturnType<FieldsT[index]["assertDelegate"]> ? FieldsT[index]["name"] : never) : never);
    }[number]);
    function nullableNames<FieldsT extends sd.AnyField[]>(fields: FieldsT): (NullableNameUnion<FieldsT>[]);
}
//# sourceMappingURL=field-array.d.ts.map