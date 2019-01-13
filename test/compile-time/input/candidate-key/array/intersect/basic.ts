import * as o from "../../../../../../dist/src/main";

export const a = o.KeyUtil.Array.intersect(
    [
        ["a", "b"] as ("a"|"b")[],
        ["c", "d"] as ("c"|"d")[]
    ],
    [
        ["a", "b"] as ("a"|"b")[],
        ["x", "y"] as ("x"|"y")[]
    ]
);
export const a2 = o.KeyUtil.Array.intersect(
    [
        ["a", "b"] as ("a"|"b")[],
        ["c", "d"] as ("c"|"d")[]
    ],
    [
        ["x", "y"] as ("x"|"y")[],
        ["a", "b"] as ("a"|"b")[]
    ]
);
export const b = o.KeyUtil.Array.intersect(
    [
        ["a", "b"] as ("a"|"b")[],
        ["c", "d"] as ("c"|"d")[]
    ],
    [
        ["a", "b"] as ("a"|"b")[],
        ["c", "d"] as ("c"|"d")[]
    ]
);
export const b2 = o.KeyUtil.Array.intersect(
    [
        ["a", "b"] as ("a"|"b")[],
        ["c", "d"] as ("c"|"d")[]
    ],
    [
        ["c", "d"] as ("c"|"d")[],
        ["a", "b"] as ("a"|"b")[],
        ["extra", "candidate", "key"] as ("extra"|"candidate"|"key")[]
    ]
);
export const c = o.KeyUtil.Array.intersect(
    [
        ["a", "b"] as ("a"|"b")[],
        ["c", "d"] as ("c"|"d")[]
    ],
    [
        ["a", "b"] as ("a"|"b")[],
        ["a", "c", "d"] as ("a"|"c"|"d")[]
    ]
);
export const d = o.KeyUtil.Array.intersect(
    [
        ["a", "b", "d"] as ("a"|"b"|"d")[],
        ["c", "d"] as ("c"|"d")[]
    ],
    [
        ["a", "b"] as ("a"|"b")[],
        ["c", "d"] as ("c"|"d")[]
    ]
);
export const e = o.KeyUtil.Array.intersect(
    [
        ["a", "b"] as ("a"|"b")[],
        ["c", "d"] as ("c"|"d")[]
    ],
    [
        ["x", "y"] as ("x"|"y")[]
    ]
);
/*
    ("a"|"b"|"c"|"d")[] is a super key of ("c"|"d")[]
    The array containing both is simplified to ("a"|"b"|"c"|"d")[]

    And we can no longer get the correct intersection.
*/
export const thisIsWhyTheArrayCannotHaveSuperKeys = o.KeyUtil.Array.intersect(
    [
        ["a", "b", "c", "d"] as ("a"|"b"|"c"|"d")[],
        ["c", "d"] as ("c"|"d")[]
    ],
    [
        ["a", "b"] as ("a"|"b")[],
        ["c", "d"] as ("c"|"d")[]
    ]
);