### `typed-orm`

An experiment in structurally-safe MySQL query building using TypeScript.

-----

### DEPRECATION NOTICE

This project is fully functional but should not be used anymore.

Instead, look at,

+ [`@squill/squill`](https://github.com/AnyhowStep/tsql)
+ [`@squill/mysql-5.7`](https://github.com/AnyhowStep/tsql-mysql-5.7)
+ [`@squill/sqlite3-browser`](https://github.com/anyhowstep/tsql-sqlite3-browser)

-----

### Documentation

Documentation may be found [here](doc/README.md)

-----

### Examples

Examples may be found in `test/compile-time`, `test/run-time`, `test/execution`.

Current code coverage is about 74%

### Gotcha's

+ Using `.whereEq("test")` may return a row with `"TEST"` if the collation is case-insensitive.
  TODO Double check if it narrows the column type to `"test"` or leaves it as `string`.
  It should not narrow to `"test"`