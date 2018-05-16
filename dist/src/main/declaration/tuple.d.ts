import { Add, Subtract, StringToNumber, NumberToString } from "./math";
export declare type Tuple<T> = T[] & {
    "0": T;
};
export declare type TupleKeys<TupleT extends Tuple<any>> = Exclude<keyof TupleT, //Extract<keyof TupleT, string>,
keyof any[]>;
export declare type TupleLength<TupleT extends Tuple<any>> = (TupleT extends {
    "20": any;
} ? 21 : TupleT extends {
    "19": any;
} ? 20 : TupleT extends {
    "18": any;
} ? 19 : TupleT extends {
    "17": any;
} ? 18 : TupleT extends {
    "16": any;
} ? 17 : TupleT extends {
    "15": any;
} ? 16 : TupleT extends {
    "14": any;
} ? 15 : TupleT extends {
    "13": any;
} ? 14 : TupleT extends {
    "12": any;
} ? 13 : TupleT extends {
    "11": any;
} ? 12 : TupleT extends {
    "10": any;
} ? 11 : TupleT extends {
    "9": any;
} ? 10 : TupleT extends {
    "8": any;
} ? 9 : TupleT extends {
    "7": any;
} ? 8 : TupleT extends {
    "6": any;
} ? 7 : TupleT extends {
    "5": any;
} ? 6 : TupleT extends {
    "4": any;
} ? 5 : TupleT extends {
    "3": any;
} ? 4 : TupleT extends {
    "2": any;
} ? 3 : TupleT extends {
    "1": any;
} ? 2 : TupleT extends {
    "0": any;
} ? 1 : never);
export declare type TupleNextKey<TupleT extends Tuple<any>> = (TupleT extends {
    "19": any;
} ? "20" : TupleT extends {
    "18": any;
} ? "19" : TupleT extends {
    "17": any;
} ? "18" : TupleT extends {
    "16": any;
} ? "17" : TupleT extends {
    "15": any;
} ? "16" : TupleT extends {
    "14": any;
} ? "15" : TupleT extends {
    "13": any;
} ? "14" : TupleT extends {
    "12": any;
} ? "13" : TupleT extends {
    "11": any;
} ? "12" : TupleT extends {
    "10": any;
} ? "11" : TupleT extends {
    "9": any;
} ? "10" : TupleT extends {
    "8": any;
} ? "9" : TupleT extends {
    "7": any;
} ? "8" : TupleT extends {
    "6": any;
} ? "7" : TupleT extends {
    "5": any;
} ? "6" : TupleT extends {
    "4": any;
} ? "5" : TupleT extends {
    "3": any;
} ? "4" : TupleT extends {
    "2": any;
} ? "3" : TupleT extends {
    "1": any;
} ? "2" : TupleT extends {
    "0": any;
} ? "1" : never);
export declare type TupleNextLength<TupleT extends Tuple<any>> = (TupleT extends {
    "20": any;
} ? 22 : TupleT extends {
    "19": any;
} ? 21 : TupleT extends {
    "18": any;
} ? 20 : TupleT extends {
    "17": any;
} ? 19 : TupleT extends {
    "16": any;
} ? 18 : TupleT extends {
    "15": any;
} ? 17 : TupleT extends {
    "14": any;
} ? 16 : TupleT extends {
    "13": any;
} ? 15 : TupleT extends {
    "12": any;
} ? 14 : TupleT extends {
    "11": any;
} ? 13 : TupleT extends {
    "10": any;
} ? 12 : TupleT extends {
    "9": any;
} ? 11 : TupleT extends {
    "8": any;
} ? 10 : TupleT extends {
    "7": any;
} ? 9 : TupleT extends {
    "6": any;
} ? 8 : TupleT extends {
    "5": any;
} ? 7 : TupleT extends {
    "4": any;
} ? 6 : TupleT extends {
    "3": any;
} ? 5 : TupleT extends {
    "2": any;
} ? 4 : TupleT extends {
    "1": any;
} ? 3 : TupleT extends {
    "0": any;
} ? 2 : never);
export declare type TuplePush<TupleT extends Tuple<any>, NextT> = (TupleT extends Tuple<infer TypeT> ? ({
    [index in TupleKeys<TupleT>]: TupleT[index];
} & {
    [index in TupleNextKey<TupleT>]: NextT;
} & {
    length: TupleNextLength<TupleT>;
} & (TypeT | NextT)[] & {
    "0": TupleT["0"];
}) : never);
export declare type TupleConcat<T extends Tuple<any>, U extends Tuple<any>> = ({
    [index in TupleKeys<T>]: T[index];
} & {
    [newIndex in NumberToString<Add<StringToNumber<Extract<TupleKeys<U>, string>>, T["length"]>>]: U[Subtract<StringToNumber<newIndex>, T["length"]>];
} & {
    length: Add<T["length"], U["length"]>;
} & {
    "0": T[0];
} & (T[TupleKeys<T>] | U[TupleKeys<U>])[]);
