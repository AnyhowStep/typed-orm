import * as sd from "schema-decorator";
import {Tuple} from "./tuple";
import {Column, AnyColumn} from "./column";
import {RawColumnUtil, AnyRawColumn} from "./raw-column";
import { RawColumnCollection } from "./raw-column-collection";

export type AnyFieldTuple = Tuple<sd.Field<any, any>|AnyColumn>;

export type FieldToObject<
    TupleT extends AnyFieldTuple,
    K extends string
> = (
    K extends keyof TupleT ?
        (
            TupleT[K] extends sd.Field<infer NameT, infer TypeT> ?
            Extract<
                {
                    [name in NameT] : sd.Field<NameT, TypeT>
                },
                RawColumnCollection
            > :
            TupleT[K] extends Column<any, infer NameT, infer TypeT> ?
            Extract<
                {
                    [name in NameT] : Column<any, NameT, TypeT>
                },
                RawColumnCollection
            > :
            never
        ) :
        {}
);
/*
function gen (max) {
	const base = [];
	for (let i=0; i<=max; ++i) {
		base.push(`FieldToObject<TupleT, "${i}">`);
	}
	return base.join(" &\n    ");
}

gen(30)
*/
export type FieldsToObject<TupleT extends AnyFieldTuple> = (
    FieldToObject<TupleT, "0"> &
    FieldToObject<TupleT, "1"> &
    FieldToObject<TupleT, "2"> &
    FieldToObject<TupleT, "3"> &
    FieldToObject<TupleT, "4"> &
    FieldToObject<TupleT, "5"> &
    FieldToObject<TupleT, "6"> &
    FieldToObject<TupleT, "7"> &
    FieldToObject<TupleT, "8"> &
    FieldToObject<TupleT, "9"> &
    FieldToObject<TupleT, "10"> &
    FieldToObject<TupleT, "11"> &
    FieldToObject<TupleT, "12"> &
    FieldToObject<TupleT, "13"> &
    FieldToObject<TupleT, "14"> &
    FieldToObject<TupleT, "15"> &
    FieldToObject<TupleT, "16"> &
    FieldToObject<TupleT, "17"> &
    FieldToObject<TupleT, "18"> &
    FieldToObject<TupleT, "19"> &
    FieldToObject<TupleT, "20"> &
    FieldToObject<TupleT, "21"> &
    FieldToObject<TupleT, "22"> &
    FieldToObject<TupleT, "23"> &
    FieldToObject<TupleT, "24"> &
    FieldToObject<TupleT, "25"> &
    FieldToObject<TupleT, "26"> &
    FieldToObject<TupleT, "27"> &
    FieldToObject<TupleT, "28"> &
    FieldToObject<TupleT, "29"> &
    FieldToObject<TupleT, "30">
);
export function fieldsToObject<
    TupleT extends AnyFieldTuple
> (tuple : TupleT) : (
    FieldsToObject<TupleT>
) {
    const result = {} as any;
    for (let f of tuple) {
        result[f.name] = f;
    }
    return result;
}

export type FieldsToType<TupleT extends AnyFieldTuple> = (
    {
        [key in Extract<keyof FieldsToObject<TupleT>, string>] : (
            FieldsToObject<TupleT>[key] extends AnyRawColumn ?
                RawColumnUtil.TypeOf<FieldsToObject<TupleT>[key]> :
                never
        )
    }
);