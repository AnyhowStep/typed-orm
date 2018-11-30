"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function concat(a, b) {
    return a.concat(b);
}
exports.concat = concat;
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
//# sourceMappingURL=concat.js.map