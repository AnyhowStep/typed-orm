### `typed-orm`

An experiment in structurally-safe MySQL query building using TypeScript.

### Examples

Examples may be found in `test/compile-time`, `test/run-time`, `test/execution`.

Current code coverage is about 74%

### Gotcha's

+ Using `.whereEq("test")` may return a row with `"TEST"` if the collation is case-insensitive.
  TODO Double check if it narrows the column type to `"test"` or leaves it as `string`.
  It should not narrow to `"test"`