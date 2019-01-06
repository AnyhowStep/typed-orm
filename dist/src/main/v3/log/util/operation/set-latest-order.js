"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
const column_identifier_map_1 = require("../../../column-identifier-map");
const column_map_1 = require("../../../column-map");
const candidate_key_array_1 = require("../../../candidate-key-array");
function setLatestOrder(log, delegate) {
    const columns = column_map_1.ColumnMapUtil.pick(log.table.columns, log.copy);
    const latestOrder = delegate(columns);
    column_identifier_map_1.ColumnIdentifierMapUtil.assertHasColumnIdentifier(columns, latestOrder[0]);
    const logCk = [...log.entityIdentifier, latestOrder[0].name];
    if (!candidate_key_array_1.CandidateKeyArrayUtil.hasKey(log.entity.candidateKeys, logCk)) {
        throw new Error(`${logCk.join("|")} must be a candidate key of ${log.table.alias}`);
    }
    const { table, entity, entityIdentifier, joinDeclaration, tracked, doNotCopy, copyDefaultsDelegate, trackedDefaults, } = log;
    const copy = log.copy
        .filter((columnName) => {
        return columnName != latestOrder[0].name;
    });
    const result = new log_1.Log({
        table,
        entity,
        entityIdentifier,
        joinDeclaration,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        copyDefaultsDelegate,
        trackedDefaults,
    });
    return result;
}
exports.setLatestOrder = setLatestOrder;
/*
import * as o from "../../../index";
import {log} from "../constructor";
import { setEntityIdentifier } from "./set-entity-identifier";
const table = o.table("table", {
    x : o.bigint(),
    y : o.dateTime(),
    v : o.bigint()
}).addCandidateKey(c => [c.x, c.y]);
const l = log(table);
const l2 = setEntityIdentifier(l, c => [c.x]);
const l3 = setLatestOrder(l2, c => c.y.desc())
*/ 
//# sourceMappingURL=set-latest-order.js.map