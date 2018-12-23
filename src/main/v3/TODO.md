+ Investigate row constructor support

  https://dev.mysql.com/doc/refman/5.7/en/row-constructor-optimization.html
  https://dev.mysql.com/doc/refman/5.7/en/row-subqueries.html

+ Implement subqueries.

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

+ Implement `Column.asc()/.desc()`, `Expr.asc()/.desc()` convenience methods