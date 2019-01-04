"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
const column_identifier_map_1 = require("../../../column-identifier-map");
const column_map_1 = require("../../../column-map");
function setLatestOrder(log, delegate) {
    const columns = column_map_1.ColumnMapUtil.omit(log.table.columns, log.entityIdentifier);
    const latestOrder = delegate(columns);
    column_identifier_map_1.ColumnIdentifierMapUtil.assertHasColumnIdentifiers(columns, latestOrder[0]);
    const { table, entityIdentifier, tracked, doNotCopy, staticDefaultValue, dynamicDefaultValueDelegate, } = log;
    const copy = log.copy
        .filter((columnName) => {
        return columnName != latestOrder[0].name;
    });
    return new log_1.Log({
        table,
        entityIdentifier,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        staticDefaultValue,
        dynamicDefaultValueDelegate,
    });
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