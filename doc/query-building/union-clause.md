### Compound Query `UNION` Clause

Compound queries let you combine multiple result sets into one.

-----

Compound queries are subject to some constraints outlined [here](select-clause.md#interaction-with-compound-queries-union)

-----

### `.union()/.union(sql.DISTINCT)`

```ts
queryA
    .union(queryB)
    .union(sql.DISTINCT, queryC);
```

The above is the same as writing,
```sql
-- queryA
UNION DISTINCT
-- queryB
UNION DISTINCT
-- queryC
```

-----

### `.union(sql.ALL)`

```ts
queryA
    .union(sql.ALL, queryB)
    .union(sql.ALL, queryC);
```

The above is the same as writing,
```sql
-- queryA
UNION ALL
-- queryB
UNION ALL
-- queryC
```