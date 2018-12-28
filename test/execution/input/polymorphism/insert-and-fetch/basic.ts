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
            ) AUTO_INCREMENT = 1;
        `);
        await connection.rawQuery(`
            CREATE TABLE child (
                \`someId\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                sharedValue VARCHAR(255) NOT NULL,
                childSpecific VARCHAR(255) NOT NULL,
                nullableChild VARCHAR(255) NULL,
                \`generated\` BIGINT UNSIGNED AS (99) STORED NOT NULL,
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
                generated : o.bigint(),
            }
        ).setId(
            c => c.someId
        ).addGenerated(
            c => [c.generated]
        ).addParent(
            parent
        );

        return o.PolymorphismUtil.insertAndFetch(
            connection,
            child,
            {
                sharedValue : "thisIsShared",
                parentSpecific : "parentOnly",
                childSpecific : "childOnly",
            }
        );
    });
    t.deepEqual(
        result,
        {
            someId : 1n,
            sharedValue : "thisIsShared",
            parentSpecific : "parentOnly",
            childSpecific : "childOnly",
            nullableChild : null,
            generated : 99n
        }
    );

    t.end();
});
