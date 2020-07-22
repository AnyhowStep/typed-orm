### `.fetchZeroOrOne()`

Attempts to fetch exactly zero or one row.

+ If zero rows are fetched, `undefined` is returned.
+ If two (or more) rows are fetched, a `sql.TooManyRowsFoundError` is thrown.
+ The shape of the row follows the behaviour of [`fetchAll()`](fetch-all-xxx.md#fetchall)
