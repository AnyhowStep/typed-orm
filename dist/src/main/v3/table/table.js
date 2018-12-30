"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TableUtil = require("./util");
class Table {
    constructor(data, { unaliasedQuery, }) {
        this.usedRef = data.usedRef;
        this.alias = data.alias;
        this.columns = data.columns;
        this.unaliasedQuery = unaliasedQuery;
        this.autoIncrement = data.autoIncrement;
        this.id = data.id;
        this.primaryKey = data.primaryKey;
        this.candidateKeys = data.candidateKeys;
        this.generated = data.generated;
        this.isNullable = data.isNullable;
        this.hasExplicitDefaultValue = data.hasExplicitDefaultValue;
        this.mutable = data.mutable;
        this.parents = data.parents;
        this.insertAllowed = data.insertAllowed;
        this.deleteAllowed = data.deleteAllowed;
    }
    as(newAlias) {
        return TableUtil.as(this, newAlias);
    }
    candidateKeyAssertDelegate() {
        if (this.cachedCandidateKeyAssertDelegate == undefined) {
            this.cachedCandidateKeyAssertDelegate = (TableUtil.candidateKeyAssertDelegate(this));
        }
        return this.cachedCandidateKeyAssertDelegate;
    }
    superKeyAssertDelegate() {
        if (this.cachedSuperKeyAssertDelegate == undefined) {
            this.cachedSuperKeyAssertDelegate = (TableUtil.superKeyAssertDelegate(this));
        }
        return this.cachedSuperKeyAssertDelegate;
    }
    primaryKeyAssertDelegate() {
        if (this.cachedPrimaryKeyAssertDelegate == undefined) {
            this.cachedPrimaryKeyAssertDelegate = (TableUtil.primaryKeyAssertDelegate(this));
        }
        return this.cachedPrimaryKeyAssertDelegate;
    }
    setAlias(newAlias) {
        return TableUtil.setAlias(this, newAlias);
    }
    addColumns(rawColumns) {
        return TableUtil.addColumns(this, rawColumns);
    }
    setAutoIncrement(delegate) {
        return TableUtil.setAutoIncrement(this, delegate);
    }
    setDatabaseName(newDatabaseName) {
        return TableUtil.setDatabaseName(this, newDatabaseName);
    }
    setId(delegate) {
        return TableUtil.setId(this, delegate);
    }
    setPrimaryKey(delegate) {
        return TableUtil.setPrimaryKey(this, delegate);
    }
    /*
        Adding a candidate key that is a super-set of
        an existing candidate key should throw an error,
        both during compile-time and run-time.

        Candidate keys should be as small as possible.
    */
    addCandidateKey(delegate) {
        return TableUtil.addCandidateKey(this, delegate);
    }
    addGenerated(delegate) {
        return TableUtil.addGenerated(this, delegate);
    }
    addHasExplicitDefaultValue(delegate) {
        return TableUtil.addHasExplicitDefaultValue(this, delegate);
    }
    setImmutable() {
        return TableUtil.setImmutable(this);
    }
    setMutable(delegate) {
        return TableUtil.setMutable(this, delegate);
    }
    addParent(parent) {
        return TableUtil.addParent(this, parent);
    }
    disallowInsert() {
        return TableUtil.disallowInsert(this);
    }
    disallowDelete() {
        return TableUtil.disallowDelete(this);
    }
}
exports.Table = Table;
//# sourceMappingURL=table.js.map