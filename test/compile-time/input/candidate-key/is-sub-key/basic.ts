import * as o from "../../../../../dist/src/main";

export const a = o.KeyUtil.isSubKey(
    ["a", "b"] as ("a"|"b")[],
    ["a", "b"] as ("a"|"b")[]
);
export const b = o.KeyUtil.isSubKey(
    ["a", "b"] as ("a"|"b")[],
    ["a"] as ("a")[]
);
export const c = o.KeyUtil.isSubKey(
    ["a", "b"] as ("a"|"b")[],
    ["a", "b", "c"] as ("a"|"b"|"c")[]
);
export const d = o.KeyUtil.isSubKey(
    ["a", "b"] as ("a"|"b")[],
    ["a", "c"] as ("a"|"c")[]
);