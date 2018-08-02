import * as sd from "schema-decorator";
import { Tuple } from "./tuple";
import { Column, AnyColumn } from "./column";
import { RawColumnUtil, AnyRawColumn } from "./raw-column";
export declare type AnyFieldTuple = Tuple<sd.Field<any, any> | AnyColumn>;
export declare type FieldToObject<TupleT extends AnyFieldTuple, K extends string> = (K extends keyof TupleT ? (TupleT[K] extends sd.Field<infer NameT, infer TypeT> ? {
    [name in NameT]: sd.Field<NameT, TypeT>;
} : TupleT[K] extends Column<any, infer NameT, infer TypeT> ? {
    [name in NameT]: Column<any, NameT, TypeT>;
} : never) : {});
export declare type FieldsToObject<TupleT extends AnyFieldTuple> = (FieldToObject<TupleT, "0"> & FieldToObject<TupleT, "1"> & FieldToObject<TupleT, "2"> & FieldToObject<TupleT, "3"> & FieldToObject<TupleT, "4"> & FieldToObject<TupleT, "5"> & FieldToObject<TupleT, "6"> & FieldToObject<TupleT, "7"> & FieldToObject<TupleT, "8"> & FieldToObject<TupleT, "9"> & FieldToObject<TupleT, "10"> & FieldToObject<TupleT, "11"> & FieldToObject<TupleT, "12"> & FieldToObject<TupleT, "13"> & FieldToObject<TupleT, "14"> & FieldToObject<TupleT, "15"> & FieldToObject<TupleT, "16"> & FieldToObject<TupleT, "17"> & FieldToObject<TupleT, "18"> & FieldToObject<TupleT, "19"> & FieldToObject<TupleT, "20"> & FieldToObject<TupleT, "21"> & FieldToObject<TupleT, "22"> & FieldToObject<TupleT, "23"> & FieldToObject<TupleT, "24"> & FieldToObject<TupleT, "25"> & FieldToObject<TupleT, "26"> & FieldToObject<TupleT, "27"> & FieldToObject<TupleT, "28"> & FieldToObject<TupleT, "29"> & FieldToObject<TupleT, "30">);
export declare function fieldsToObject<TupleT extends AnyFieldTuple>(tuple: TupleT): (FieldsToObject<TupleT>);
export declare type FieldsToType<TupleT extends AnyFieldTuple> = ({
    [key in Extract<keyof FieldsToObject<TupleT>, string>]: (FieldsToObject<TupleT>[key] extends AnyRawColumn ? RawColumnUtil.TypeOf<FieldsToObject<TupleT>[key]> : never);
});
//# sourceMappingURL=field-util.d.ts.map