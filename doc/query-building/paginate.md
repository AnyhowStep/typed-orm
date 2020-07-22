### `.paginate(connection, rawPaginateArgs)`

A helper method to implement pagination.

-----

### `RawPaginateArgs`

The `RawPaginateArgs` interface looks like,
```ts
/**
 * `9223372036854775807n` cannot be represented using a `double`.
 *
 * It gets rounded to `9223372036854776000`
 */
export interface RawPaginateArgs {
    /**
     * The page to fetch.
     * The first page is zero.
     */
    page? : number,
    /**
     * The number of rows to fetch per page.
     * You should control this value.
     *
     * If `rowsPerPage` is too high, and too many rows are fetched,
     * it may cause an out-of-memory exception!
     */
    rowsPerPage? : number,
}
```

`.paginate(connection, rawPaginateArgs)` will try to process the `rawPaginateArgs` into a usable form,
using the [`toPaginateArgs()` function](/src/main/v3/query/util/execution/paginate.ts#L29-L43)

`.paginate()` suffers from the same problem the [`LIMIT` clause](limit-clause.md#number-arguments) does.

-----

### Return Type

The return type of `.paginate()` looks like,
```ts
declare const paginateResult : {
    info : {
        rowsFound : number,
        pagesFound : number,
        page : number,
        rowsPerPage : number,
    },
    rows : RowT[],
};
```

-----

### Recommended Usage

```ts
const paginateResult = await tsql
    .from(myTable)
    .select(columns => [columns])
    /**
     * You should always have an `ORDER BY` clause when using `.paginate()`.
     * Otherwise, the order of rows is not defined.
     *
     * The `ORDER BY` clause should also result in a **unique** ordering,
     * or your results may be inconsistent.
     */
    .orderBy(columns => [
        columns.createdAt.desc(),
        columns.myTableId.desc(),
    ])
    .paginate(connection, {
        /**
         * The first page is zero.
         */
        page : 0n,
        /**
         * 100 seems like a good number of rows per page.
         */
        rowsPerPage : 100n,
    });
```