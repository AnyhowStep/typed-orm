import {PopFront} from "./pop-front";
import {PushBack} from "./push-back";

/*
    function generate (count, callback, separator) {
        if (separator == undefined) {
            separator = ", ";
        }
        const parts = [];
        for (let i=0; i<count; ++i) {
            parts.push(callback(i));
        }
        return parts.join(separator);
    }
    function generateCases (count) {
        return generate(count, i => `${i}: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >`, ",\n            ");
    }
    generateCases(5);
*/
export type Concat<A extends any[], B extends any[]> = (
    (
        {
            [index : number] : any,
            0: A,
            1: PushBack<A, B[0]>,
            2: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            3: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            4: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            5: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            6: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            7: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            8: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            9: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            10: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            11: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            12: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            13: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            14: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            15: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            16: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            17: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            18: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            19: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            20: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            21: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            22: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            23: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            24: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            25: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            26: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            27: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            28: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            29: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            30: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            31: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            32: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            33: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            34: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            35: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            36: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            37: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            38: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            39: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            40: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            41: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            42: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            43: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            44: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            45: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            46: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            47: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            48: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >,
            49: Concat<
                PushBack<A, B[0]>,
                PopFront<B>
            >
        }
    )[B["length"]]
);
export function concat<A extends any[], B extends any[]> (
    a : A,
    b : B
) : (
    Concat<A, B>
) {
    return a.concat(b);
}
/*
As of this writing, this more compact version is actually much slower!
export type Concat2<A extends Tuple<unknown>, B extends Tuple<unknown>> = (
    (
        {
            [index : number] : unknown,
            0: A,
            1: PushBack<A, B[0]>,
        } &
        {
            [index in 2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49]: Concat2<
                PushBack<A, B[0]>,
                PopFront<B>
            >
        }
    )[B["length"]]
);*/
//const x : Concat<[1,2,3,4,5], [3,2,1,3,2,1,3,2,1,3,2,1,3,2,1,3,2,1,"5",23,"tet",true]>
//const x : Concat2<[1,2,3,4,5], [3,2,1,3,2,1,3,2,1,3,2,1,3,2,1,3,2,1,"5",23,"tet",true]>