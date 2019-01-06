"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
const column_identifier_map_1 = require("../../../column-identifier-map");
const column_map_1 = require("../../../column-map");
const join_declaration_1 = require("../../../join-declaration");
const candidate_key_array_1 = require("../../../candidate-key-array");
function setEntityIdentifier(log, delegate) {
    const columns = column_map_1.ColumnMapUtil.pick(log.table.columns, log.copy);
    const rawEntityIdentifier = delegate(columns);
    column_identifier_map_1.ColumnIdentifierMapUtil.assertHasColumnIdentifiers(columns, rawEntityIdentifier);
    const entityIdentifier = rawEntityIdentifier.map(c => c.name);
    if (!candidate_key_array_1.CandidateKeyArrayUtil.hasKey(log.entity.candidateKeys, entityIdentifier)) {
        throw new Error(`${entityIdentifier.join("|")} must be a candidate key of ${log.entity.alias}`);
    }
    const { table, entity, latestOrder, tracked, doNotCopy, copyDefaultsDelegate, trackedDefaults, } = log;
    const copy = log.copy
        .filter((columnName) => {
        return entityIdentifier.indexOf(columnName) < 0;
    });
    const result = new log_1.Log({
        table,
        entity,
        entityIdentifier,
        joinDeclaration: join_declaration_1.innerJoinCkUsing(log.table, log.entity, () => rawEntityIdentifier),
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        copyDefaultsDelegate,
        trackedDefaults,
    });
    return result;
}
exports.setEntityIdentifier = setEntityIdentifier;
//# sourceMappingURL=set-entity-identifier.js.map