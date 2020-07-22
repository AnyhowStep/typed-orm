### `.fetchOne()`

Attempts to fetch exactly one row.

+ If zero rows are fetched, a `sql.RowNotFoundError` is thrown.
+ If two (or more) rows are fetched, a `sql.TooManyRowsFoundError` is thrown.
+ The shape of the row follows the behaviour of [`fetchAll()`](fetch-all-xxx.md#fetchall)
