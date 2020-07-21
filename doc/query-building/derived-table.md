### Derived Table

A query may be used as a derived table,
```ts
const myQuery = sql
    .from(myTable)
    .crossJoin(
        //This is a query
        sql.from(otherTable)
            .select(columns => [
                columns.otherColumn0,
                columns.otherColumn1,
                columns.otherColumn2,
                //etc.
            ])
            //This converts the query into a derived table
            .as("derivedTable")
    );
```
