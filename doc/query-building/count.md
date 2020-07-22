### `query.count()`

Convenience method for,
```ts
const count : bigint = await sql
    .selectValue(() => sql.count())
    .from(myQuery.as("tmp"))
    .fetchValue(connection);
```

-----

### Usage

```ts
const count : bigint = await myQuery
    .count(connection);
```