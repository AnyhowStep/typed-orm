import {CandidateKey, CandidateKeyUtil} from "../candidate-key";
import {ExtractEqual} from "../type";

export namespace CandidateKeyArrayUtil {
    export type ToUnion<CandidateKeyArrayT extends CandidateKey[]> = (
        CandidateKeyArrayT[number]
    );

    /*
        For table inheritance support.

        When adding a parent table to a table,
        the two tables must have at least
        one unique key in common.

        TODO-DEBATE Find a better name?
    */
    export type CommonCandidateKeyUnion<
        ArrayA extends CandidateKey[],
        ArrayB extends CandidateKey[]
    > = (
        ExtractEqual<
            ToUnion<ArrayA>,
            ToUnion<ArrayB>
        >
    );
    export function hasCommonCandidateKeys (
        arrayA : CandidateKey[],
        arrayB : CandidateKey[]
    ) : boolean {
        for (let a of arrayA) {
            for (let b of arrayB) {
                if (CandidateKeyUtil.isEqual(a, b)) {
                    return true;
                }
            }
        }
        return false;
    }
    export function commonCandidateKeys<
        ArrayA extends CandidateKey[],
        ArrayB extends CandidateKey[]
    > (
        arrayA : ArrayA,
        arrayB : ArrayB
    ) : (
        CommonCandidateKeyUnion<
            ArrayA,
            ArrayB
        >[]
    ) {
        const result : CandidateKey[] = [];
        for (let a of arrayA) {
            for (let b of arrayB) {
                if (CandidateKeyUtil.isEqual(a, b)) {
                    result.push(a);
                    break;
                }
            }
        }
        return result as any;
    }

    export type FindSubKey<
        ArrT extends CandidateKey[],
        KeyT extends CandidateKey
    > = (
        CandidateKeyUtil.ExtractSubKey<
            ArrT[number],
            KeyT
        >
    );
    export type HasSubKey<
        ArrT extends CandidateKey[],
        KeyT extends CandidateKey
    > = (
        true extends CandidateKeyUtil.IsSubKey<ArrT[number], KeyT> ?
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
            if (CandidateKeyUtil.isSubKey(k, key)) {
                return true as HasSubKey<ArrT, KeyT>;
            }
        }
        return false as HasSubKey<ArrT, KeyT>;
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
            if (CandidateKeyUtil.isEqual(k, key)) {
                return true as HasKey<ArrT, KeyT>;
            }
        }
        return false as HasKey<ArrT, KeyT>;
    }
}
