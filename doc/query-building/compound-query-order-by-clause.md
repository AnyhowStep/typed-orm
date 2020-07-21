### Compound Query `ORDER BY` Clause

The compound query `ORDER BY` clause lets you specify the order of rows of a compound query.

-----

### `SortExpr` for Compound Query `ORDER BY` Clause

MySQL allows columns and unaliased expressions as sort expressions.

-----

### `.unionOrderBy()`

An arbitrary `ORDER BY` clause for compound queries may be specified with,
```ts
import * as sql from "typed-orm";
/**
 * Assume we already defined `myTable`, `otherTable` elsewhere
 */
import {myTable, otherTable} from "./table";

const myQuery = sql
    .from(myTable)
    .select(columns => [
        sql.bigIntAdd(
            columns.myColumn,
            32n
        ).as("x")
    ])
    .unionAll(
        sql
            .from(otherTable)
            .select(columns => [
                columns.otherColumn
            ])
    )
    .unionOrderBy((columns) => [
        //Alias in `SELECT` clause of first query
        columns.x.asc(),
    ]);
```

The above is the same as writing,
```sql
SELECT
    (myTable.myColumn + 32) AS x
FROM
    myTable
UNION ALL
SELECT
    otherTable.otherColumn
FROM
    otherTable
ORDER BY
    x ASC
```