+ Investigate row constructor support

  https://dev.mysql.com/doc/refman/5.7/en/row-constructor-optimization.html
  https://dev.mysql.com/doc/refman/5.7/en/row-subqueries.html

+ Implement subqueries.

+ Implement `AliasedQuery`
  + Can extend `IExpr` if selecting a single column.
    + Type is always nullable
  + Will extend `IAliasedTable` to enable joining to a subquery.

+ Implement replaceTable()
  + Implement `IAliasedTable` .as()
    + Implement `Table` .as()
    + Implement `AliasedQuery` .as()
    + Unify them
      + This means `IAliasedTable` will need a `queryTree` field like `IExpr`

+ Implement `Query.transform()`
+ Implement type-narrowing `WHERE` expressions
  + andWhereIsNull
  + andWhereIsNotNull
  + andWhereIsEqual
+ Implement `Query.useJoins()`
+ Implement `requireParentJoins()`
+ Implement `Query.flatten()`
  + It'll be a convenience method for,
  ```ts
  Query.transform(row => {
    //Confirm `row` is a nested object, with multiple tableAliases
    //Confirm `row` has no duplicate columnNames,
    //we do not want to overwrite values.
    const result = {};
    for (let tableAlias of Object.keys(row)) {
      for (let columnName of Object.keys(row[tableAlias])) {
        result[columnName] = row[tableAlias][columnName];
      }
    }
    return result;
  })
  ```

```ts
/*
  This should not be allowed unless
  `tentativeContributorNegotiation`
  is in the parent joins of the outer query
*/
from(t.tentativeContribution)
  .joinUsing(
    from(t.tentativeContribution)
      .groupBy(c => [
        c.appId,
        c.tentativeContributorNegotiationId,
        c.invoiceId,
        c.externalUserId
      ])
      .select(c => [
        c.tentativeContributorNegotiationId,
        c.invoiceId,
        c.externalUserId,
        o.max(c.updatedAt).as("updatedAt"),
      ])
      //This is important
      .requireParentJoins(t.tentativeContributorNegotiation)
      .where(c => o.eq(
        c.tentativeContribution.tentativeContributorNegotiationId,
        c.tentativeContributorNegotiation.tentativeContributorNegotiationId
      ))
      .as("latests"),
    c => [
      c.tentativeContributorNegotiationId,
      c.invoiceId,
      c.externalUserId,
      c.updatedAt
    ]
  )
```

```ts
TODO Implement a "defaultAlias" for expressions.
This way, we can just write,
function isConfirmed () {
    o.exists(
        //snip
    ).defaultAlias("isConfirmed")
}
//Snip
.selectExpr(
    sql.tentativeContributorNegotiation
        .isConfirmed()
)
```

+ Implement `Column.asc()/.desc()`, `Expr.asc()/.desc()` convenience methods