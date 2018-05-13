export type Simplify<T> = { [Key in keyof T]: T[Key] };

export type Tuple<T> = T[] & { "0" : T };
export type TupleKeys<TupleT extends Tuple<any>> = Exclude<keyof TupleT, keyof any[]>;
//TODO Find a better way to do this
/*
function gen (max) {
	const result = [];
	for (let i=max; i>=0; --i) {
		result.push(`TupleT extends {"${i}":any} ? ${i+1} :`);
	}
	return result.join("\n    ");
}
gen(50)
*/
export type TupleLength<TupleT extends Tuple<any>> = (
    TupleT extends {"50":any} ? 51 :
    TupleT extends {"49":any} ? 50 :
    TupleT extends {"48":any} ? 49 :
    TupleT extends {"47":any} ? 48 :
    TupleT extends {"46":any} ? 47 :
    TupleT extends {"45":any} ? 46 :
    TupleT extends {"44":any} ? 45 :
    TupleT extends {"43":any} ? 44 :
    TupleT extends {"42":any} ? 43 :
    TupleT extends {"41":any} ? 42 :
    TupleT extends {"40":any} ? 41 :
    TupleT extends {"39":any} ? 40 :
    TupleT extends {"38":any} ? 39 :
    TupleT extends {"37":any} ? 38 :
    TupleT extends {"36":any} ? 37 :
    TupleT extends {"35":any} ? 36 :
    TupleT extends {"34":any} ? 35 :
    TupleT extends {"33":any} ? 34 :
    TupleT extends {"32":any} ? 33 :
    TupleT extends {"31":any} ? 32 :
    TupleT extends {"30":any} ? 31 :
    TupleT extends {"29":any} ? 30 :
    TupleT extends {"28":any} ? 29 :
    TupleT extends {"27":any} ? 28 :
    TupleT extends {"26":any} ? 27 :
    TupleT extends {"25":any} ? 26 :
    TupleT extends {"24":any} ? 25 :
    TupleT extends {"23":any} ? 24 :
    TupleT extends {"22":any} ? 23 :
    TupleT extends {"21":any} ? 22 :
    TupleT extends {"20":any} ? 21 :
    TupleT extends {"19":any} ? 20 :
    TupleT extends {"18":any} ? 19 :
    TupleT extends {"17":any} ? 18 :
    TupleT extends {"16":any} ? 17 :
    TupleT extends {"15":any} ? 16 :
    TupleT extends {"14":any} ? 15 :
    TupleT extends {"13":any} ? 14 :
    TupleT extends {"12":any} ? 13 :
    TupleT extends {"11":any} ? 12 :
    TupleT extends {"10":any} ? 11 :
    TupleT extends {"9":any} ? 10 :
    TupleT extends {"8":any} ? 9 :
    TupleT extends {"7":any} ? 8 :
    TupleT extends {"6":any} ? 7 :
    TupleT extends {"5":any} ? 6 :
    TupleT extends {"4":any} ? 5 :
    TupleT extends {"3":any} ? 4 :
    TupleT extends {"2":any} ? 3 :
    TupleT extends {"1":any} ? 2 :
    TupleT extends {"0":any} ? 1 :
    never
);
/*
function gen (max) {
	const result = [];
	for (let i=max; i>=0; --i) {
		result.push(`TupleT extends {"${i}":any} ? "${i+1}" :`);
	}
	return result.join("\n    ");
}
gen(50)
*/
export type TupleNextKey<TupleT extends Tuple<any>> = (
    TupleT extends {"50":any} ? "51" :
    TupleT extends {"49":any} ? "50" :
    TupleT extends {"48":any} ? "49" :
    TupleT extends {"47":any} ? "48" :
    TupleT extends {"46":any} ? "47" :
    TupleT extends {"45":any} ? "46" :
    TupleT extends {"44":any} ? "45" :
    TupleT extends {"43":any} ? "44" :
    TupleT extends {"42":any} ? "43" :
    TupleT extends {"41":any} ? "42" :
    TupleT extends {"40":any} ? "41" :
    TupleT extends {"39":any} ? "40" :
    TupleT extends {"38":any} ? "39" :
    TupleT extends {"37":any} ? "38" :
    TupleT extends {"36":any} ? "37" :
    TupleT extends {"35":any} ? "36" :
    TupleT extends {"34":any} ? "35" :
    TupleT extends {"33":any} ? "34" :
    TupleT extends {"32":any} ? "33" :
    TupleT extends {"31":any} ? "32" :
    TupleT extends {"30":any} ? "31" :
    TupleT extends {"29":any} ? "30" :
    TupleT extends {"28":any} ? "29" :
    TupleT extends {"27":any} ? "28" :
    TupleT extends {"26":any} ? "27" :
    TupleT extends {"25":any} ? "26" :
    TupleT extends {"24":any} ? "25" :
    TupleT extends {"23":any} ? "24" :
    TupleT extends {"22":any} ? "23" :
    TupleT extends {"21":any} ? "22" :
    TupleT extends {"20":any} ? "21" :
    TupleT extends {"19":any} ? "20" :
    TupleT extends {"18":any} ? "19" :
    TupleT extends {"17":any} ? "18" :
    TupleT extends {"16":any} ? "17" :
    TupleT extends {"15":any} ? "16" :
    TupleT extends {"14":any} ? "15" :
    TupleT extends {"13":any} ? "14" :
    TupleT extends {"12":any} ? "13" :
    TupleT extends {"11":any} ? "12" :
    TupleT extends {"10":any} ? "11" :
    TupleT extends {"9":any} ? "10" :
    TupleT extends {"8":any} ? "9" :
    TupleT extends {"7":any} ? "8" :
    TupleT extends {"6":any} ? "7" :
    TupleT extends {"5":any} ? "6" :
    TupleT extends {"4":any} ? "5" :
    TupleT extends {"3":any} ? "4" :
    TupleT extends {"2":any} ? "3" :
    TupleT extends {"1":any} ? "2" :
    TupleT extends {"0":any} ? "1" :
    never
);
/*
function gen (max) {
	const result = [];
	for (let i=max; i>=0; --i) {
		result.push(`TupleT extends {"${i}":any} ? ${i+2} :`);
	}
	return result.join("\n    ");
}
gen(50)
*/
export type TupleNextLength<TupleT extends Tuple<any>> = (
    TupleT extends {"50":any} ? 52 :
    TupleT extends {"49":any} ? 51 :
    TupleT extends {"48":any} ? 50 :
    TupleT extends {"47":any} ? 49 :
    TupleT extends {"46":any} ? 48 :
    TupleT extends {"45":any} ? 47 :
    TupleT extends {"44":any} ? 46 :
    TupleT extends {"43":any} ? 45 :
    TupleT extends {"42":any} ? 44 :
    TupleT extends {"41":any} ? 43 :
    TupleT extends {"40":any} ? 42 :
    TupleT extends {"39":any} ? 41 :
    TupleT extends {"38":any} ? 40 :
    TupleT extends {"37":any} ? 39 :
    TupleT extends {"36":any} ? 38 :
    TupleT extends {"35":any} ? 37 :
    TupleT extends {"34":any} ? 36 :
    TupleT extends {"33":any} ? 35 :
    TupleT extends {"32":any} ? 34 :
    TupleT extends {"31":any} ? 33 :
    TupleT extends {"30":any} ? 32 :
    TupleT extends {"29":any} ? 31 :
    TupleT extends {"28":any} ? 30 :
    TupleT extends {"27":any} ? 29 :
    TupleT extends {"26":any} ? 28 :
    TupleT extends {"25":any} ? 27 :
    TupleT extends {"24":any} ? 26 :
    TupleT extends {"23":any} ? 25 :
    TupleT extends {"22":any} ? 24 :
    TupleT extends {"21":any} ? 23 :
    TupleT extends {"20":any} ? 22 :
    TupleT extends {"19":any} ? 21 :
    TupleT extends {"18":any} ? 20 :
    TupleT extends {"17":any} ? 19 :
    TupleT extends {"16":any} ? 18 :
    TupleT extends {"15":any} ? 17 :
    TupleT extends {"14":any} ? 16 :
    TupleT extends {"13":any} ? 15 :
    TupleT extends {"12":any} ? 14 :
    TupleT extends {"11":any} ? 13 :
    TupleT extends {"10":any} ? 12 :
    TupleT extends {"9":any} ? 11 :
    TupleT extends {"8":any} ? 10 :
    TupleT extends {"7":any} ? 9 :
    TupleT extends {"6":any} ? 8 :
    TupleT extends {"5":any} ? 7 :
    TupleT extends {"4":any} ? 6 :
    TupleT extends {"3":any} ? 5 :
    TupleT extends {"2":any} ? 4 :
    TupleT extends {"1":any} ? 3 :
    TupleT extends {"0":any} ? 2 :
    never
);
export type TuplePush<TupleT extends Tuple<any>, NextT> = (
    TupleT extends Tuple<infer TypeT> ?
        (
            {
                [index in TupleKeys<TupleT>] : TupleT[index]
            } &
            {
                [index in TupleNextKey<TupleT>] : NextT
            } &
            { length : TupleNextLength<TupleT> } &
            (TypeT|NextT)[] &
            {
                "0" : TupleT["0"]
            }
        ) :
        never//("Invalid TupleT or could not infer TypeT"|void|never)
);
type Col<A, B, C> = {
  a: A,
  b: B,
  c: C,
};
type T = [
  Col<"app", "id", number>
  //Col<"app", "name">,
  //Col<"app", "id2", string>
];
type FindDuplicate = {
  [index in TupleKeys<T>]: (
    Exclude<TupleKeys<T>, index> extends never ?
        (false) :
        (
            T[index] extends Col<infer A, infer B, any> ?
            (
              T[Exclude<TupleKeys<T>, index>] extends Col<infer OtherA, infer OtherB, any>?
              (
                  [A, B] extends [OtherA, OtherB]?
                  true :
                  false
              ) :
              (never)
            ) :
            (never)
        )
  )
};
type HasDuplicate = true extends FindDuplicate[keyof FindDuplicate]?
  true :
  false;
