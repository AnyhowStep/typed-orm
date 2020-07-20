### `LIMIT` Clause

The `LIMIT` clause lets you specify how many rows are returned.

Using `OFFSET`, you can also skip over rows.

-----

### `number` arguments

The `.limit()` and `offset()` methods take `number` as their argument.

However, this opens the possibility of passing values like,
+ `NaN`
+ `Infinity`
+ `-Infinity`
+ `3.141`
+ `-1.0`
+ `1e300`
+ etc.

MySQL should only accept valid `BIGINT UNSIGNED` values for the `LIMIT/OFFSET` clause.
However, the JS `number` type is unable to represent the full `BIGINT UNSIGNED` range.

This, is a problem.
But isn't too much of a problem... Usually.

This is fixed in [`@squill/squill`](https://github.com/AnyhowStep/tsql)
where `bigint` is the recommended data type for `LIMIT/OFFSET`.

-----

### `.limit()`

The `LIMIT` may be specified with,
```ts
myQuery
    .limit(1);
```

The above is the same as writing,
```sql
LIMIT
    1
OFFSET
    0
```

-----

### `.offset()`

The `OFFSET` may be specified with,
```ts
myQuery
    .limit(1337)
    .offset(69);
```

The above is the same as writing,
```sql
LIMIT
    1337
OFFSET
    69
```

-----

You may use `.offset()` without using `.limit()`,
```ts
myQuery
    .offset(69);
```

The above is the same as writing,
```sql
LIMIT
    9223372036854775807
OFFSET
    69
```