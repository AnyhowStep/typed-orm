import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
import {pool} from "../../../pool";

tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TABLE IF EXISTS child");
        await connection.rawQuery("DROP TABLE IF EXISTS parent");
        await connection.rawQuery(`
            CREATE TABLE parent (
                \`someId\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                sharedValue VARCHAR(255) NOT NULL,
                parentSpecific VARCHAR(255) NOT NULL,
                PRIMARY KEY(\`someId\`)
            ) AUTO_INCREMENT = 0;
        `);
        await connection.rawQuery(`
            CREATE TABLE child (
                \`someId\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                sharedValue VARCHAR(255) NOT NULL,
                childSpecific VARCHAR(255) NOT NULL,
                nullableChild VARCHAR(255) NULL,
                PRIMARY KEY(\`someId\`)
            );
        `);
        const parent = o.table(
            "parent",
            {
                someId : o.bigint(),
                sharedValue : sd.string(),
                parentSpecific : sd.string(),
            }
        ).setAutoIncrement(c => c.someId);
        const child = o.table(
            "child",
            {
                someId : o.bigint(),
                sharedValue : sd.string(),
                childSpecific : sd.string(),
                nullableChild : sd.nullable(sd.string()),
            }
        ).setId(c => c.someId)
        .addParent(parent);
        const inil : o.PolymorphismUtil.IsNullable<typeof child, "childSpecific"> = null as any;
        const hedv : o.PolymorphismUtil.HasExplicitDefaultValue<typeof child, "childSpecific"> = null as any;
        const rcn : o.PolymorphismUtil.RequiredColumnNames<typeof child> = null as any;
        const ocn : o.PolymorphismUtil.OptionalColumnNames<typeof child> = null as any;
        const ir : o.PolymorphismUtil.InsertRowLiteral<typeof child> = null as any;
        const insertResult = await o.PolymorphismUtil.insertAndFetch(
            connection,
            child,
            {
                sharedValue : "thisIsShared",
                parentSpecific : "parentOnly",
                childSpecific : "childOnly",
            }
        );
        t.deepEqual(
            insertResult,
            {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 18446744073709551614n,
                serverStatus: 2,
                warningCount: 0,
                message: "",
                protocol41: true,
                changedRows: 0,
                someId : 18446744073709551614n,
            }
        );
        return o.from(autoId)
            .select(c => [c])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 1);
    t.deepEqual(result[0].someId, 18446744073709551614n);

    t.end();
});
