import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
import {pool} from "../../../pool";

tape(__filename, async (t) => {
    await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TABLE IF EXISTS businessEnabled");
        await connection.rawQuery("DROP TABLE IF EXISTS business");
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS businessEnabled");
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS business");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE \`business\` (
                \`appId\` bigint(20) unsigned NOT NULL,
                \`businessId\` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
                PRIMARY KEY (\`businessId\`)
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE \`businessEnabled\` (
                \`appId\` bigint(20) unsigned NOT NULL,
                \`businessEnabledId\` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
                \`businessId\` bigint(20) unsigned NOT NULL,
                \`enabled\` tinyint(1) NOT NULL,
                \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updatedByExternalUserId\` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                PRIMARY KEY (\`businessEnabledId\`),
                UNIQUE KEY \`businessEnabled_updateRateConstraint\` (\`businessId\`,\`updatedAt\`) USING BTREE,
                KEY \`businessEnabled_businessBelongsToApp\` (\`appId\`,\`businessId\`),
                KEY \`businessEnabled_updatedBy\` (\`appId\`,\`updatedByExternalUserId\`)
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        const business = o.table("business")
            .addColumns({
                appId : o.bigintUnsigned(),
                businessId : o.bigintUnsigned(),
            })
            .setAutoIncrement(c => c.businessId);
        const businessEnabled = o.table("businessEnabled")
            .addColumns({
                appId : o.bigintUnsigned(),
                businessEnabledId : o.bigintUnsigned(),
                businessId : o.bigintUnsigned(),
                enabled : o.boolean(),
                updatedAt : o.dateTime(),
                updatedByExternalUserId : o.varChar.nullable(255),
            })
            .setAutoIncrement(c => c.businessEnabledId)
            .addCandidateKey(c => [c.businessId, c.updatedAt])
            .addHasExplicitDefaultValue(c => [c.updatedAt]);
        const businessEnabledLog = o.log(businessEnabled)
            .setEntity(business)
            .setEntityIdentifier(c => [c.businessId])
            .setLatestOrder(c => c.updatedAt.desc())
            .setTracked(c => [c.enabled])
            .setDoNotCopy(c => [
                c.updatedByExternalUserId
            ])
            .setCopyDefaultsDelegate(({entityIdentifier, connection}) => {
                return business.fetchOneByCk(
                    connection,
                    entityIdentifier,
                    c => [c.appId]
                );
            })
            .setTrackedDefaults({
                enabled : true,
            });
        await businessEnabledLog.fetchLatestValueOrDefault(
            connection,
            { businessId : 1n },
            c => c.enabled
        ).then(() => {
            t.fail("Should throw");
        }).catch((err) => {
            t.pass(err.message);
        });
        const insertResult = await o.insertInto(business)
            .values({
                appId : 9001n
            })
            .execute(connection);
        t.deepEqual(
            insertResult,
            {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 1n,
                serverStatus: 2,
                warningCount: 0,
                message: "",
                protocol41: true,
                changedRows: 0,
                insertedRowCount : 1,
                businessId : 1n,
            }
        );
        await businessEnabledLog.fetchLatestValueOrDefault(
            connection,
            { businessId : 1n },
            c => c.enabled
        ).then((enabled) => {
            t.true(enabled);
        });
        const result = await businessEnabledLog.track(
            connection,
            { businessId : 1n },
            {}
        );
        t.deepEqual(
            result,
            {
                changed : false,
                row : undefined,
            }
        );
        await businessEnabledLog.fetchLatestValueOrDefault(
            connection,
            { businessId : 1n },
            c => c.enabled
        ).then((enabled) => {
            t.true(enabled);
        });
        const result2 = await businessEnabledLog.track(
            connection,
            { businessId : 1n },
            { enabled : true, updatedByExternalUserId : "test" }
        );
        t.deepEqual(
            result2,
            {
                changed : false,
                row : undefined,
            }
        );
        await businessEnabledLog.fetchLatestValueOrDefault(
            connection,
            { businessId : 1n },
            c => c.enabled
        ).then((enabled) => {
            t.true(enabled);
        });
        const result3 = await businessEnabledLog.track(
            connection,
            { businessId : 1n },
            { enabled : false, updatedByExternalUserId : "test" }
        );
        t.deepEqual(
            result3,
            {
                changed: true,
                row: {
                    appId : 9001n,
                    businessEnabledId : 1n,
                    businessId : 1n,
                    enabled : false,
                    updatedAt : (result3 as any).row.updatedAt,
                    updatedByExternalUserId : "test",
                }
            }
        );
        await businessEnabledLog.fetchLatestValueOrDefault(
            connection,
            { businessId : 1n },
            c => c.enabled
        ).then((enabled) => {
            t.false(enabled);
        });
    });

    t.end();
});