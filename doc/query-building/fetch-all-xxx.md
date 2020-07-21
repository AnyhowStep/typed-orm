### `.fetchAllXxx()`

The `.fetchAllXxx()` methods fetch an array of rows.

-----

### Overview

+ `.fetchAllUnmapped()`
+ `.fetchAll()`

-----

### `.fetchAllUnmapped()`

When using `.fetchAllUnmapped()`, all previous calls to `.map()` are ignored and unmapped rows are returned.

It's like `.map()` was never called.

An unmapped row might look like,
```ts
declare const row : {
    //table alias
    myTable : {
        //column alias
        myColumn : bigint,
    },
    //table alias
    otherTable : {
        //column alias
        otherColumn : bigint,
    },
};
```

-----

### `.fetchAll()`

If called after `.map()`, it will fetch all rows, and run each row through the mapper(s).

Otherwise, it behaves like `.fetchAllUnmapped()`.