
https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_sum

```ts
const QST = 0.0975;
const GST = 0.05;
console.log(QST + GST);
```

Were you expecting `0.1475`?

The result is `0.14750000000000002`.

This is an example of double behaving in unintuitive ways.

-----

Using `SUM()` on `double`/`float` values can give you the above result, too.
The solution is to convert the values to a `DECIMAL(M, D)` type, sum that,
then convert the result back to a `double`.

The `sumAsDecimal()` function does this.