### Custom Expressions

Custom expressions have to be of type `Expr<>`

For example,

```ts
//RAND()
const myRand = new sql.Expr(
    {
        usedRef : {},
        assertDelegate : dataType.double(),
    },
    new sql.FunctionCall(
        "RAND",
        []
    )
);

//RAND() + 1
const sum = sql.add(myRand, 1);
```

The above,

+ Does not refer to any columns
+ Has return type `number/DOUBLE`
+ Is the SQL string `RAND()`

-----

You may also return `Expr<>` from functions,

```ts
function addOne (x : number) {
    return new sql.Expr(
        {
            usedRef : {},
            assertDelegate : dataType.double(),
        },
        [
            RawExprUtil.queryTree(x),
            "+",
            "1e0"
        ]
    );
}

//1 + 1e0
const _2 = addOne(1);
//2 + 1e0
const _3 = addOne(2);

//(1 + 1e0) + (2 + 1e0)
const _5 = sql.add(_2, _3);
```