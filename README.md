### `typed-orm`

An experiment in type-safe, and structurally-safe MySQL query building using TypeScript.

### Tables

```ts
import * as o from "typed-orm";
import * as sd from "schema-decorator";

const app = o.table(
    "app",
    {
        appId : sd.naturalNumber(),
        name : sd.string(),
        description : sd.nullable(sd.string())
    }
)
    .setAutoIncrement(c => c.appId)
    .build();

const user = o.table(
    "user",
    {
        userId : sd.naturalNumber(),
        firstName : sd.string(),
        lastName : sd.string(),
    }
)
    .setAutoIncrement(c => c.userId)
    .build();

const baseTable = o.table(
    "base",
    {
        baseId : sd.naturalNumber()
    }
)
    .setAutoIncrement(c => c.baseId)
    .build();

//Table-per-concrete-class inheritance
const derivedTable = o.table(baseTable)
    .withName("derived")
    .addColumns({
        value0 : sd.boolean(),
        value1 : sd.date(),
    });
    .build();

//Table-per-type inheritance
const derivedTable2 = o.table(
    "derived2",
    {
        baseId : sd.naturalNumber(),
        value0 : sd.boolean(),
        value1 : sd.date(),
    }
)
    .setId(c => c.baseId)
    .addParent(baseTable)
    .build();

```

### Database

```ts
import * as o from "typed-orm";
const db = new o.PooledDatabase({
    host     : "host",
    database : "database",
    user     : "username",
    password : "password",
});
await db.utcOnly();
```

### Select

```ts
db.from(app)
    .selectAll()
    .fetchAll()
    .then(console.log);

db.from(app)
    .rightJoinUsing(user, c => [c.appId])
    .selectAll()
    .fetchAll()
    .then(console.log);

db.from(app)
    .selectAll()
    .aggregate(async (row) => {
        return {
            ...row,
            users : await db.from(user)
                .whereIsEqual(c => c.appId, row.appId)
                .selectAll()
                .fetchAll()
        };
    })
    .fetchAll()
    .then(console.log);
```

### Insert

```ts
await db.insertValue(app, {
    name : "new-app",
})
    .execute()
    .then(console.log);
```

### Update

```ts
import * as o from "typed-orm";
await db.update(
    app,
    () => ({
        name : "new-name"
    }),
    c => o.eq(c.appId, 4)
)
    .execute()
    .then(console.log);
```

### Delete

```ts
db.deleteFrom(app, c => o.eq(c.appId, 1))
    .execute()
    .then(console.log);
```

### Sub-query Expression

```ts
await db.select(() => {
    return [
        db.select(() => [
            o.NOW.as("now")
        ]).asExpr("nowish")
    ]
})
    .fetchOne()
    .then(console.log);

await db.from(app)
    .select((_c, s) => {
        return [
            s.subQuery()
                .select((c) => {
                    return [c.appId]
                })
                .asExpr("appId")
        ];
    })
    .limit(1)
    .fetchOne()
    .then(console.log);
```

### Example of a complicated query

```ts
/*snip*/
    tryFetchOneAwaitingCreation () {
        return this.dao.from(t.merchant)
            .useJoins(
                j.merchantBelongsToOneAppPlatform,
                j.merchantBelongsToOneBusiness,
                j.businessBelongsToOneUser
            )
            .where(() => this.canStartCreationAttemptExpression())
            .selectAll()
            .select(() => [
                this.lastCreationAttemptAtExpression().as("lastCreationAttemptAt")
            ])
            .orderBy(c => [
                //We prioritize those that have not been attempted
                [o.isNull(c.__expr.lastCreationAttemptAt), o.DESCENDING],
                //For those that have been attempted,
                //we get the earliest attempted
                [c.__expr.lastCreationAttemptAt, o.ASCENDING],
                //For those that have not been attempted,
                //we get the earliest created
                [c.merchant.createdAt, o.ASCENDING]
            ])
            .limit(1)
            .fetchZeroOrOne();
    }
/*snip*/
```