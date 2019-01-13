import * as o from "../../../../../../dist/src/main";

export const a = o.KeyUtil.Array.findSubKeys(
    [
        ["a", "b"] as ("a"|"b")[],
        ["c", "d"] as ("c"|"d")[]
    ],
    ["a", "b"] as ("a"|"b")[]
);
export const b = o.KeyUtil.Array.findSubKeys(
    [
        ["a", "b"] as ("a"|"b")[],
        ["c", "d"] as ("c"|"d")[]
    ],
    ["x", "y"] as ("x"|"y")[]
);
export const c = o.KeyUtil.Array.findSubKeys(
    [
        ["a", "b"] as ("a"|"b")[],
        ["c", "d"] as ("c"|"d")[]
    ],
    ["a"] as ("a")[]
);
export const d = o.KeyUtil.Array.findSubKeys(
    [
        ["a", "b"] as ("a"|"b")[],
        ["c", "d"] as ("c"|"d")[]
    ],
    ["a", "b", "c"] as ("a"|"b"|"c")[]
);