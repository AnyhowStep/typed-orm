import * as o from "../../../../../../dist/src/main";

export const a = o.CandidateKeyUtil.Array.intersect(
    [
        ["a", "b"] as ["a", "b"],
        ["c", "d"] as ["c", "d"]
    ],
    [
        ["a", "b"] as ["a", "b"],
        ["x", "y"] as ["x", "y"]
    ]
);
export const a2 = o.CandidateKeyUtil.Array.intersect(
    [
        ["a", "b"] as ["a", "b"],
        ["c", "d"] as ["c", "d"]
    ],
    [
        ["x", "y"] as ["x", "y"],
        ["a", "b"] as ["a", "b"]
    ]
);
export const b = o.CandidateKeyUtil.Array.intersect(
    [
        ["a", "b"] as ["a", "b"],
        ["c", "d"] as ["c", "d"]
    ],
    [
        ["a", "b"] as ["a", "b"],
        ["c", "d"] as ["c", "d"]
    ]
);
export const b2 = o.CandidateKeyUtil.Array.intersect(
    [
        ["a", "b"] as ["a", "b"],
        ["c", "d"] as ["c", "d"]
    ],
    [
        ["c", "d"] as ["c", "d"],
        ["a", "b"] as ["a", "b"],
        ["extra", "candidate", "key"] as ["extra", "candidate", "key"]
    ]
);
export const c = o.CandidateKeyUtil.Array.intersect(
    [
        ["a", "b"] as ["a", "b"],
        ["c", "d"] as ["c", "d"]
    ],
    [
        ["a", "b"] as ["a", "b"],
        ["a", "b", "c", "d"] as ["a", "b", "c", "d"]
    ]
);
export const d = o.CandidateKeyUtil.Array.intersect(
    [
        ["a", "b", "c", "d"] as ["a", "b", "c", "d"],
        ["c", "d"] as ["c", "d"]
    ],
    [
        ["a", "b"] as ["a", "b"],
        ["c", "d"] as ["c", "d"]
    ]
);
export const e = o.CandidateKeyUtil.Array.intersect(
    [
        ["a", "b"] as ["a", "b"],
        ["c", "d"] as ["c", "d"]
    ],
    [
        ["x", "y"] as ["x", "y"]
    ]
);