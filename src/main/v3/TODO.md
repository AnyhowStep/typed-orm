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