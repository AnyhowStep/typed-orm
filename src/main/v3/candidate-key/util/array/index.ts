export * from "./operation";
export * from "./predicate";

import {CandidateKey} from "../../candidate-key";
import {isEqual, IsSubKey, isSubKey, isCandidateKey} from "../predicate";
import {ExtractSubKey, ExtractSuperKey} from "../query";

export type FindSubKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
> = (
    ExtractSubKey<
        ArrT[number],
        KeyT
    >
);
export type HasSubKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
> = (
    true extends IsSubKey<ArrT[number], KeyT> ?
    true :
    false
);
export function hasSubKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
> (
    arr : ArrT,
    key : KeyT
) : HasSubKey<ArrT, KeyT> {
    for (let k of arr) {
        if (isSubKey(k, key)) {
            return true as HasSubKey<ArrT, KeyT>;
        }
    }
    return false as HasSubKey<ArrT, KeyT>;
}
export type FindSuperKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
> = (
    ExtractSuperKey<
        ArrT[number],
        KeyT
    >
);
export type HasSuperKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
> = (
    true extends IsSubKey<KeyT, ArrT[number]> ?
    true :
    false
);
export function hasSuperKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
> (
    arr : ArrT,
    key : KeyT
) : HasSuperKey<ArrT, KeyT> {
    for (let k of arr) {
        if (isSubKey(key, k)) {
            return true as HasSuperKey<ArrT, KeyT>;
        }
    }
    return false as HasSuperKey<ArrT, KeyT>;
}

export type HasKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
>= (
    KeyT extends ArrT[number]?
    (
        Extract<ArrT[number], KeyT> extends never?
        false :
        true
    ) :
    false
);
export function hasKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
> (
    arr : ArrT,
    key : KeyT
) : HasKey<ArrT, KeyT> {
    for (let k of arr) {
        if (isEqual(k, key)) {
            return true as HasKey<ArrT, KeyT>;
        }
    }
    return false as HasKey<ArrT, KeyT>;
}

export function isCandidateKeyArray (raw : any) : raw is CandidateKey[] {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!isCandidateKey(item)) {
            return false;
        }
    }
    return true;
}