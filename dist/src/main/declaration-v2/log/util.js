"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const column_collection_1 = require("../column-collection");
const raw_expr_1 = require("../raw-expr");
var LogDataUtil;
(function (LogDataUtil) {
    function entityIdentifierAssertDelegate(data) {
        return column_collection_1.ColumnCollectionUtil.assertDelegate(data.table.columns, Object.keys(data.entityIdentifier));
    }
    LogDataUtil.entityIdentifierAssertDelegate = entityIdentifierAssertDelegate;
    function trackableAssertDelegate(data) {
        return column_collection_1.ColumnCollectionUtil.partialAssertDelegate(data.table.columns, Object.keys(data.isTrackable));
    }
    LogDataUtil.trackableAssertDelegate = trackableAssertDelegate;
    function fetchLatestOrError(db, data, entityIdentifier) {
        entityIdentifier = entityIdentifierAssertDelegate(data)(`${data.table.alias} entity identifier`, entityIdentifier);
        return db.from(data.table)
            .where(() => raw_expr_1.RawExprUtil.toEqualityCondition(data.table, entityIdentifier))
            .orderBy((c) => {
            return data.orderByLatest.map(orderBy => [
                c[orderBy[0]],
                orderBy[1]
            ]);
        })
            .limit(1)
            .selectAll()
            .fetchOne();
    }
    LogDataUtil.fetchLatestOrError = fetchLatestOrError;
    function fetchLatestOrUndefined(db, data, entityIdentifier) {
        entityIdentifier = entityIdentifierAssertDelegate(data)(`${data.table.alias} entity identifier`, entityIdentifier);
        return db.from(data.table)
            .where(() => raw_expr_1.RawExprUtil.toEqualityCondition(data.table, entityIdentifier))
            .orderBy((c) => {
            return data.orderByLatest.map(orderBy => [
                c[orderBy[0]],
                orderBy[1]
            ]);
        })
            .limit(1)
            .selectAll()
            .fetchZeroOrOne();
    }
    LogDataUtil.fetchLatestOrUndefined = fetchLatestOrUndefined;
    function fetchLatestOrDefault(db, data, entityIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            entityIdentifier = entityIdentifierAssertDelegate(data)(`${data.table.alias} entity identifier`, entityIdentifier);
            const result = yield fetchLatestOrUndefined(db, data, entityIdentifier);
            if (result != undefined) {
                return result;
            }
            if (data.defaultRowDelegate == undefined) {
                throw new Error(`Could not fetch latest log for ${data.table.alias}, ${JSON.stringify(entityIdentifier)}, and no default row has been specified`);
            }
            return data.defaultRowDelegate(entityIdentifier, db);
        });
    }
    LogDataUtil.fetchLatestOrDefault = fetchLatestOrDefault;
    function insertIfDifferentAndFetch(db, data, entityIdentifier, newValues) {
        return db.transactionIfNotInOne((db) => __awaiter(this, void 0, void 0, function* () {
            newValues = trackableAssertDelegate(data)(`${data.table.alias} trackable`, newValues);
            let differenceFound = false;
            const curValues = yield fetchLatestOrDefault(db, data, entityIdentifier);
            for (let columnName in newValues) {
                const newValue = newValues[columnName];
                if (newValue === undefined) {
                    continue;
                }
                const curValue = curValues[columnName];
                if (newValue !== curValue) {
                    differenceFound = true;
                    break;
                }
            }
            if (!differenceFound) {
                return {
                    latest: curValues,
                    wasInserted: false,
                };
            }
            const toInsert = {};
            for (let columnName in curValues) {
                if (data.table.data.isGenerated[columnName] === true) {
                    continue;
                }
                if (data.entityIdentifier[columnName] === true ||
                    data.isTrackable[columnName] === true ||
                    data.table.data.hasDefaultValue[columnName] !== true) {
                    toInsert[columnName] = curValues[columnName];
                }
            }
            //Overwrite with new values
            for (let columnName in newValues) {
                const newValue = newValues[columnName];
                if (newValue === undefined) {
                    continue;
                }
                toInsert[columnName] = newValue;
            }
            return {
                latest: yield db.insertValueAndFetch(data.table, toInsert),
                wasInserted: true,
            };
        }));
    }
    LogDataUtil.insertIfDifferentAndFetch = insertIfDifferentAndFetch;
})(LogDataUtil = exports.LogDataUtil || (exports.LogDataUtil = {}));
//# sourceMappingURL=util.js.map