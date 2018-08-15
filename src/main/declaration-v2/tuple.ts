//export type Simplify<T> = { [Key in keyof T]: T[Key] };
import {Add, Subtract, StringToNumber, NumberToString} from "./math";

/*
str = [];
for (let i=0; i<=30; ++i) {
	str.push(`"${i}"`);
}
str.join("|")
*/
export type Tuple<T> = T[] & { "0" : T };
export type TupleKeys<TupleT extends Tuple<any>> = Extract<
    keyof TupleT,
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21"|"22"|"23"|"24"|"25"|"26"|"27"|"28"|"29"|"30"
>;
export type TupleKeysUpTo<index extends string> = (
    index extends "1" ?
    "0" :
    index extends "2" ?
    "0"|"1" :
    index extends "3" ?
    "0"|"1"|"2" :
    index extends "4" ?
    "0"|"1"|"2"|"3" :
    index extends "5" ?
    "0"|"1"|"2"|"3"|"4" :
    index extends "6" ?
    "0"|"1"|"2"|"3"|"4"|"5" :
    index extends "7" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6" :
    index extends "8" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7" :
    index extends "9" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8" :
    index extends "10" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9" :
    index extends "11" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10" :
    index extends "12" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11" :
    index extends "13" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12" :
    index extends "14" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13" :
    index extends "15" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14" :
    index extends "16" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15" :
    index extends "17" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16" :
    index extends "18" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17" :
    index extends "19" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18" :
    index extends "20" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19" :
    index extends "21" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20" :
    index extends "22" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21" :
    index extends "23" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21"|"22" :
    index extends "24" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21"|"22"|"23" :
    index extends "25" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21"|"22"|"23"|"24" :
    index extends "26" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21"|"22"|"23"|"24"|"25" :
    index extends "27" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21"|"22"|"23"|"24"|"25"|"26" :
    index extends "28" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21"|"22"|"23"|"24"|"25"|"26"|"27" :
    index extends "29" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21"|"22"|"23"|"24"|"25"|"26"|"27"|"28" :
    index extends "30" ?
    "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21"|"22"|"23"|"24"|"25"|"26"|"27"|"28"|"29" :
    never
);
/*
export type TupleKeys<TupleT extends Tuple<any>> = Exclude<
    keyof TupleT,
    keyof any[]
>;*/
/*export type TupleKeys<TupleT extends Tuple<any>> = Exclude<
    Extract<
        keyof TupleT,
        string
    >,
    keyof any[]
    //0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30
    //"0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18"|"19"|"20"|"21"|"22"|"23"|"24"|"25"|"26"|"27"|"28"|"29"|"30"
>;*/
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
    /*TupleT extends {"50":any} ? 51 :
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
    TupleT extends {"21":any} ? 22 :*/
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
    TupleT extends {"0":any} ? (
        TupleT extends { length : 1 } ?
            1 :
            number
    ) :
    never
);

export type TupleWiden<TupleT extends Tuple<any>, WidenT> = (
    TupleT & (WidenT[])
    /*TupleT extends Tuple<infer TypeT> ?
        (
            TypeT extends WidenT ?
                (
                    {
                        [index in TupleKeys<TupleT>] : TupleT[index]
                    } &
                    {
                        "0" : TupleT[0],
                    } &
                    {
                        length : TupleLength<TupleT>
                    } &
                    WidenT[]
                ) :
                never
        ) :
        never*/
)


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
    /*TupleT extends {"50":any} ? "51" :
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
    TupleT extends {"20":any} ? "21" :*/
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
    /*TupleT extends {"50":any} ? 52 :
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
    TupleT extends {"21":any} ? 23 :*/
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
    {
        [index in TupleKeys<TupleT>] : TupleT[index]
    } &
    {
        [index in TupleNextKey<TupleT>] : NextT
    } &
    {
        "0" : TupleT[0],
    } &
    {
        length : TupleNextLength<TupleT>
    } &
    (
        NextT extends TupleT[TupleKeys<TupleT>] ?
            (TupleT[TupleKeys<TupleT>])[] :
            (TupleT[TupleKeys<TupleT>]|NextT)[]
    )
);
export type TupleWPush<WidenT, TupleT extends Tuple<WidenT>, NextT extends WidenT> = (
    {
        [index in TupleKeys<TupleT>] : (
            Extract<TupleT[index], WidenT>
        )
    } &
    {
        [index in TupleNextKey<TupleT>] : (
            Extract<NextT, WidenT>
        )
    } &
    {
        "0" : (
            Extract<TupleT[0], WidenT>
        ),
    } &
    {
        length : TupleNextLength<TupleT>
    } &
    (
        WidenT[]
    )
);

export function tuplePush<TupleT extends Tuple<any>, NextT> (
    tuple : TupleT,
    next : NextT
) : (
    TuplePush<TupleT, NextT>
) {
    return tuple.concat(next) as any;
}

export function tupleWPush<WidenT> () : (
    <
        TupleT extends Tuple<WidenT>,
        NextT extends WidenT
    >(
        tuple : TupleT,
        next : NextT
    ) => (
        TupleWPush<WidenT, TupleT, NextT>
    )
) {
    return tuplePush as any;
}

/*
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
*/


export type TupleConcat<
    T extends Tuple<any>,
    U extends Tuple<any>
> = (
    {
        [index in TupleKeys<T>]: T[index]
    } &
    {
        [newIndex in NumberToString<Add<
            StringToNumber<Extract<TupleKeys<U>, string>>,
            T["length"]
        >>]: U[Subtract<StringToNumber<newIndex>, T["length"]>]
    } &
    {
        "0" : T[0],
        length: Add<T["length"], U["length"]>;
    } &
    (T[TupleKeys<T>]|U[TupleKeys<U>])[]
);
export type TupleWConcat<
    WidenT,
    T extends Tuple<WidenT>,
    U extends Tuple<WidenT>
> = (
    U["length"] extends 0 ?
    T :
    {
        [index in TupleKeys<T>]: (
            Extract<T[index], WidenT>
        )
    } &
    {
        [newIndex in NumberToString<Add<
            StringToNumber<Extract<TupleKeys<U>, string>>,
            T["length"]
        >>]: (
            Extract<U[Subtract<StringToNumber<newIndex>, T["length"]>], WidenT>
        )
    } &
    {
        "0" : (
            Extract<T[0], WidenT>
        ),
        length: Add<T["length"], U["length"]>;
    } &
    (WidenT)[]
);
export function tupleConcat<T extends Tuple<any>, U extends Tuple<any>> (
    t : T,
    u : U
) : (
    TupleConcat<T, U>
) {
    return t.concat(u) as any;
}

export function tupleWConcat<WidenT> () : (
    <
        T extends Tuple<WidenT>,
        U extends Tuple<WidenT>
    >(
        t : T,
        u : U
    ) => (
        TupleWConcat<WidenT, T, U>
    )
) {
    return tupleConcat as any;
}

/*
declare const a: [1, 2, 3, 4];
declare const b: ["a", "b", "c"];
declare const c: TupleConcat<typeof a, typeof b>;
declare const d: TupleConcat<typeof b, typeof a>;
d.length
*/
