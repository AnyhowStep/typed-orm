import * as o from "../../../../../dist/src/main";

export const a = o.CandidateKeyUtil.isSubKey(
    ["a", "b"] as ("a"|"b")[],
    ["a", "b"] as ("a"|"b")[]
);
export const b = o.CandidateKeyUtil.isSubKey(
    ["a", "b"] as ("a"|"b")[],
    ["a"] as ("a")[]
);
export const c = o.CandidateKeyUtil.isSubKey(
    ["a", "b"] as ("a"|"b")[],
    ["a", "b", "c"] as ("a"|"b"|"c")[]
);
export const d = o.CandidateKeyUtil.isSubKey(
    ["a", "b"] as ("a"|"b")[],
    ["a", "c"] as ("a"|"c")[]
);