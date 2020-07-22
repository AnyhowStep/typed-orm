### `.fetchValueXxx()`

+ `.fetchValueXxx()` ignores all previous calls to `.map()`
+ `.fetchValueXxx()` may only be called if the `SELECT` clause is of length **one** and a column or aliased expression is selected.

-----

The `.fetchValueXxx()` methods fetch a single row, at most.

-----

### Overview

+ `.fetchValue()`
+ `.fetchValueOrUndefined()`

-----

### `.fetchValue()`

Convenience method for,
```ts
const row : { myColumn : bigint } = await sql
    .from(myTable)
    .select(columns => [columns.myColumn])
    .fetchOne(connection);

const bigintValue : bigint = row.myColumn;
```

Usage,
```ts
const bigintValue : bigint = await tsql
    .from(myTable)
    .select(columns => [columns.myColumn])
    .fetchValue(connection);
```

-----

### `.fetchValueOrUndefined()`

Convenience method for,
```ts
const row : { myColumn : bigint } = await sql
    .from(myTable)
    .select(columns => [columns.myColumn])
    .fetchZeroOrOne(connection);

const bigintValue : bigint|undefined = row == undefined ? undefined : row.myColumn;
```

Usage,
```ts
const bigintValue : bigint = await tsql
    .from(myTable)
    .select(columns => [columns.myColumn])
    .fetchValueOrUndefined(connection);
```
