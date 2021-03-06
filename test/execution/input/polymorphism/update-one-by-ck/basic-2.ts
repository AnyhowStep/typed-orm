import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
import {pool} from "../../../pool";

tape(__filename, async (t) => {
    await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS child");
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS parent");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE parent (
                \`someId\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                sharedValue VARCHAR(255) NOT NULL,
                parentSpecific VARCHAR(255) NOT NULL,
                \`generatedParentOnly\` BIGINT UNSIGNED AS (888) STORED NOT NULL,
                generatedParentRequiredChild BIGINT UNSIGNED AS (123) STORED NOT NULL,
                generatedChildRequiredParent BIGINT UNSIGNED NOT NULL,
                PRIMARY KEY(\`someId\`)
            ) AUTO_INCREMENT = 1;
        `);
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE child (
                \`someId\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                sharedValue VARCHAR(255) NOT NULL,
                childSpecific VARCHAR(255) NOT NULL,
                nullableChild VARCHAR(255) NULL,
                \`generatedChildOnly\` BIGINT UNSIGNED AS (99) STORED NOT NULL,
                generatedParentRequiredChild BIGINT UNSIGNED NOT NULL,
                generatedChildRequiredParent BIGINT UNSIGNED AS (456) STORED NOT NULL,
                PRIMARY KEY(\`someId\`)
            );
        `);
        const parent = o.table(
            "parent",
            {
                someId : o.bigint(),
                sharedValue : sd.string(),
                parentSpecific : sd.string(),
                generatedParentOnly : o.bigint(),
                generatedParentRequiredChild : o.bigint(),
                generatedChildRequiredParent : o.bigint()
            }
        ).setAutoIncrement(
            c => c.someId
        ).addGenerated(
            c => [c.generatedParentOnly, c.generatedParentRequiredChild]
        );
        const child = o.table(
            "child",
            {
                someId : o.bigint(),
                sharedValue : sd.string(),
                childSpecific : sd.string(),
                nullableChild : sd.orNull(sd.string()),
                generatedChildOnly : o.bigint(),
                generatedParentRequiredChild : o.bigint(),
                generatedChildRequiredParent : o.bigint(),

            }
        ).setId(
            c => c.someId
        ).addGenerated(
            c => [c.generatedChildOnly, c.generatedChildRequiredParent]
        ).addParent(
            parent
        );
        child.mutable

        const insertResult = await o.TablePerTypeUtil.insertAndFetch(
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
                someId : 1n,
                sharedValue : "thisIsShared",
                parentSpecific : "parentOnly",
                childSpecific : "childOnly",
                nullableChild : null,
                generatedChildOnly : 99n,
                generatedParentOnly : 888n,
                generatedParentRequiredChild : 123n,
                generatedChildRequiredParent : 456n,
            }
        );
        await o.TablePerTypeUtil.updateOneByCk(
            connection,
            child,
            //Does not exist
            { someId : 9999999999n },
            () => {
                return {
                    sharedValue : "hello"
                }
            }
        ).then(() => {
            t.fail("Should not update any rows");
        }).catch((err) => {
            t.pass(err.message);
        });
    });

    t.end();
});
