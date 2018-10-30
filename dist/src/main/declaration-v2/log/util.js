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
const sd = require("schema-decorator");
const column_collection_1 = require("../column-collection");
const raw_expr_1 = require("../raw-expr");
const column_1 = require("../column");
//import {SelectValue} from "../select-value";
const expr_1 = require("../expr");
const column_references_1 = require("../column-references");
const coalesce_1 = require("../expression/coalesce");
const and_1 = require("../expression/logical-connective/and");
const type_check_1 = require("../expression/type-check");
const mysql = require("typed-mysql");
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
    function fullOverwriteTrackableAssertDelegate(data) {
        return column_collection_1.ColumnCollectionUtil.assertDelegate(data.table.columns, Object.keys(data.isTrackable));
    }
    LogDataUtil.fullOverwriteTrackableAssertDelegate = fullOverwriteTrackableAssertDelegate;
    function doNotCopyOnTrackableChangedAssertDelegate(data) {
        const columnCollection = column_collection_1.ColumnCollectionUtil.extractColumnNames(data.table.columns, Object.keys(data.doNotCopyOnTrackableChanged));
        return sd.schema(...Object.keys(columnCollection)
            .map((columnName) => {
            const column = columnCollection[columnName];
            if (data.table.data.hasDefaultValue[columnName] === true) {
                //Is optional
                return sd.field(column.name, column.assertDelegate).optional();
            }
            else {
                //Required
                return sd.field(column.name, column.assertDelegate);
            }
        }));
    }
    LogDataUtil.doNotCopyOnTrackableChangedAssertDelegate = doNotCopyOnTrackableChangedAssertDelegate;
    function doNotModifyOnTrackableChangedAssertDelegate(data) {
        const columnCollection = column_collection_1.ColumnCollectionUtil.excludeColumnNames(data.table.columns, Object.keys(data.doNotCopyOnTrackableChanged)
            .concat(...Object.keys(data.isTrackable))
            .concat(...Object.keys(data.entityIdentifier)));
        return sd.schema(...Object.keys(columnCollection)
            .map((columnName) => {
            const column = columnCollection[columnName];
            return sd.field(column.name, column.assertDelegate);
        }));
    }
    LogDataUtil.doNotModifyOnTrackableChangedAssertDelegate = doNotModifyOnTrackableChangedAssertDelegate;
    function insertIfDifferentRowAssertDelegate(data) {
        return sd.intersect(trackableAssertDelegate(data), doNotCopyOnTrackableChangedAssertDelegate(data), doNotModifyOnTrackableChangedAssertDelegate(data));
    }
    LogDataUtil.insertIfDifferentRowAssertDelegate = insertIfDifferentRowAssertDelegate;
    function fullOverwriteInsertIfDifferentRowAssertDelegate(data) {
        return sd.intersect(fullOverwriteTrackableAssertDelegate(data), doNotCopyOnTrackableChangedAssertDelegate(data), doNotModifyOnTrackableChangedAssertDelegate(data));
    }
    LogDataUtil.fullOverwriteInsertIfDifferentRowAssertDelegate = fullOverwriteInsertIfDifferentRowAssertDelegate;
    function fetchLatestQuery(db, data, entityIdentifier) {
        entityIdentifier = entityIdentifierAssertDelegate(data)(`${data.table.alias} entity identifier`, entityIdentifier);
        return db.from(data.table)
            .where(() => raw_expr_1.RawExprUtil.toEqualityCondition(data.table, 
        //https://github.com/Microsoft/TypeScript/issues/27399
        entityIdentifier))
            .orderBy(() => {
            return data.orderByLatest;
        })
            .limit(1);
    }
    LogDataUtil.fetchLatestQuery = fetchLatestQuery;
    function fetchLatestOrError(db, data, entityIdentifier) {
        entityIdentifier = entityIdentifierAssertDelegate(data)(`${data.table.alias} entity identifier`, entityIdentifier);
        return db.from(data.table)
            .where(() => raw_expr_1.RawExprUtil.toEqualityCondition(data.table, 
        //https://github.com/Microsoft/TypeScript/issues/27399
        entityIdentifier))
            .orderBy(() => {
            return data.orderByLatest;
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
            .orderBy(() => {
            return data.orderByLatest;
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
                if (db.willPrintQueryOnRowCountError()) {
                    console.error(data.table.name, entityIdentifier);
                }
                throw new mysql.RowNotFoundError(`Could not fetch latest log for ${data.table.alias}, ${JSON.stringify(entityIdentifier)}, and no default row has been specified`);
            }
            return data.defaultRowDelegate(entityIdentifier, db);
        });
    }
    LogDataUtil.fetchLatestOrDefault = fetchLatestOrDefault;
    function insertIfDifferentAndFetch(db, data, entityIdentifier, insertIfDifferentRow) {
        return db.transactionIfNotInOne((db) => __awaiter(this, void 0, void 0, function* () {
            const trackable = trackableAssertDelegate(data)(`${data.table.alias} trackable`, insertIfDifferentRow);
            const doNotCopy = doNotCopyOnTrackableChangedAssertDelegate(data)(`${data.table.alias} do not copy`, insertIfDifferentRow);
            const curValues = yield fetchLatestOrDefault(db, data, entityIdentifier);
            let differenceFound = false;
            for (let columnName in trackable) {
                const newTrackableValue = trackable[columnName];
                if (newTrackableValue === undefined) {
                    continue;
                }
                const curValue = curValues[columnName];
                if (newTrackableValue !== curValue) {
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
                if (data.doNotCopyOnTrackableChanged[columnName] === true) {
                    continue;
                }
                toInsert[columnName] = curValues[columnName];
            }
            //Overwrite with new values
            for (let columnName in trackable) {
                const newTrackableValue = trackable[columnName];
                if (newTrackableValue === undefined) {
                    continue;
                }
                toInsert[columnName] = newTrackableValue;
            }
            for (let columnName in doNotCopy) {
                const newValue = doNotCopy[columnName];
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
    /*
        If a row exists for the entity,
        then it behaves the same as insertIfDifferentAndFetch()

        If a row *does not* exist for the entity,
        then it will try to insert the row;
        this requires all trackable fields to be set or
        it will throw an error.
    */
    function insertIfDifferentOrFirstAndFetch(db, data, entityIdentifier, insertIfDifferentRow, onFirstDelegate) {
        return db.transactionIfNotInOne((db) => __awaiter(this, void 0, void 0, function* () {
            if (yield rowsExistForEntity(db, data, entityIdentifier)) {
                return insertIfDifferentAndFetch(db, data, entityIdentifier, insertIfDifferentRow);
            }
            else {
                return {
                    latest: yield db.insertValueAndFetch(data.table, yield onFirstDelegate(db, insertIfDifferentRow)),
                    wasInserted: true,
                };
            }
        }));
    }
    LogDataUtil.insertIfDifferentOrFirstAndFetch = insertIfDifferentOrFirstAndFetch;
    function latestValueExpression(db, data, entity, valueDelegate, defaultValueDelegate) {
        const entityRefs = {
            [entity.alias]: entity.columns
        };
        const refs = Object.assign({
            [data.table.alias]: data.table.columns
        }, entityRefs);
        let value = valueDelegate(refs);
        if (value instanceof expr_1.Expr) {
            column_references_1.ColumnReferencesUtil.assertHasColumnReferences(refs, value.usedReferences);
        }
        else if (value instanceof column_1.Column) {
            column_references_1.ColumnReferencesUtil.assertHasColumn(refs, value);
        }
        else {
            value = raw_expr_1.RawExprUtil.toExpr(value);
            //throw new Error(`Expected value expression to be an Expr or Column`);
        }
        let defaultValue = defaultValueDelegate(entityRefs);
        if (defaultValue instanceof expr_1.Expr) {
            column_references_1.ColumnReferencesUtil.assertHasColumnReferences(entityRefs, defaultValue.usedReferences);
        }
        else if (defaultValue instanceof column_1.Column) {
            column_references_1.ColumnReferencesUtil.assertHasColumn(entityRefs, defaultValue);
        }
        else {
            defaultValue = raw_expr_1.RawExprUtil.toExpr(defaultValue);
            //throw new Error(`Expected defaultValue expression to be an Expr or Column`);
        }
        const equalityArr = Object.keys(data.entityIdentifier)
            .map((columnName) => type_check_1.isNotNullAndEq(entity.columns[columnName], data.table.columns[columnName]));
        return coalesce_1.coalesce(db.from(entity)
            .subQuery()
            .from(data.table)
            .where(() => and_1.and(equalityArr[0], ...equalityArr.slice(1)))
            .orderBy(() => data.orderByLatest)
            .limit(1)
            .select(() => [value]), defaultValue);
    }
    LogDataUtil.latestValueExpression = latestValueExpression;
    function rowsExistForEntity(db, data, entityIdentifier) {
        entityIdentifier = entityIdentifierAssertDelegate(data)(`${data.table.alias} entity identifier`, entityIdentifier);
        return db.from(data.table)
            .where(() => raw_expr_1.RawExprUtil.toEqualityCondition(data.table, entityIdentifier))
            .exists();
    }
    LogDataUtil.rowsExistForEntity = rowsExistForEntity;
})(LogDataUtil = exports.LogDataUtil || (exports.LogDataUtil = {}));
//# sourceMappingURL=util.js.map