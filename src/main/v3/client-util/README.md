There may be some queries not supported by MySQL.

An example is `FULL OUTER JOIN`.

For those, we can either mangle the query to emulate the desired query,
or we can emulate the query using client code.

-----

When we want to emulate using client code, we'll put such code in `client-util`.