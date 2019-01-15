"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const primary_key_1 = require("../primary-key");
const candidate_key_1 = require("../candidate-key");
const super_key_1 = require("../super-key");
const query_1 = require("../query");
const insert_1 = require("../insert");
const update_1 = require("../update");
const delete_1 = require("../delete");
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
            this.cachedCandidateKeyAssertDelegate = (candidate_key_1.CandidateKeyUtil.assertDelegate(this));
        }
        return this.cachedCandidateKeyAssertDelegate;
    }
    superKeyAssertDelegate() {
        if (this.cachedSuperKeyAssertDelegate == undefined) {
            this.cachedSuperKeyAssertDelegate = (super_key_1.SuperKeyUtil.assertDelegate(this));
        }
        return this.cachedSuperKeyAssertDelegate;
    }
    primaryKeyAssertDelegate() {
        if (this.cachedPrimaryKeyAssertDelegate == undefined) {
            this.cachedPrimaryKeyAssertDelegate = (primary_key_1.PrimaryKeyUtil.assertDelegate(this));
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
    validate(connection, result) {
        return TableUtil.validate(this, connection, result);
    }
    assertExistsByCk(connection, ck) {
        return query_1.QueryUtil.assertExistsByCk(connection, this, ck);
    }
    assertExistsByPk(connection, pk) {
        return query_1.QueryUtil.assertExistsByPk(connection, this, pk);
    }
    assertExistsBySk(connection, sk) {
        return query_1.QueryUtil.assertExistsBySk(connection, this, sk);
    }
    existsByCk(connection, ck) {
        return query_1.QueryUtil.existsByCk(connection, this, ck);
    }
    existsByPk(connection, pk) {
        return query_1.QueryUtil.existsByPk(connection, this, pk);
    }
    existsBySk(connection, sk) {
        return query_1.QueryUtil.existsBySk(connection, this, sk);
    }
    fetchOneByCk(connection, ck) {
        return query_1.QueryUtil.fetchOneByCk(connection, this, ck);
    }
    fetchOneByPk(connection, pk) {
        return query_1.QueryUtil.fetchOneByPk(connection, this, pk);
    }
    fetchOneBySk(connection, sk) {
        return query_1.QueryUtil.fetchOneBySk(connection, this, sk);
    }
    fetchValueByCk(connection, ck, delegate) {
        return query_1.QueryUtil.fetchValueByCk(connection, this, ck, delegate);
    }
    fetchValueByPk(connection, pk, delegate) {
        return query_1.QueryUtil.fetchValueByPk(connection, this, pk, delegate);
    }
    fetchValueBySk(connection, sk, delegate) {
        return query_1.QueryUtil.fetchValueBySk(connection, this, sk, delegate);
    }
    fetchValueOrUndefinedByCk(connection, ck, delegate) {
        return query_1.QueryUtil.fetchValueOrUndefinedByCk(connection, this, ck, delegate);
    }
    fetchValueOrUndefinedByPk(connection, pk, delegate) {
        return query_1.QueryUtil.fetchValueOrUndefinedByPk(connection, this, pk, delegate);
    }
    fetchValueOrUndefinedBySk(connection, sk, delegate) {
        return query_1.QueryUtil.fetchValueOrUndefinedBySk(connection, this, sk, delegate);
    }
    fetchZeroOrOneByCk(connection, ck, delegate) {
        if (delegate == undefined) {
            return query_1.QueryUtil.fetchZeroOrOneByCk(connection, this, ck);
        }
        else {
            return query_1.QueryUtil.fetchZeroOrOneByCk(connection, this, ck, delegate);
        }
    }
    fetchZeroOrOneByPk(connection, pk, delegate) {
        if (delegate == undefined) {
            return query_1.QueryUtil.fetchZeroOrOneByPk(connection, this, pk);
        }
        else {
            return query_1.QueryUtil.fetchZeroOrOneByPk(connection, this, pk, delegate);
        }
    }
    fetchZeroOrOneBySk(connection, sk, delegate) {
        if (delegate == undefined) {
            return query_1.QueryUtil.fetchZeroOrOneBySk(connection, this, sk);
        }
        else {
            return query_1.QueryUtil.fetchZeroOrOneBySk(connection, this, sk, delegate);
        }
    }
    insertAndFetch(connection, insertRow) {
        return insert_1.InsertUtil.insertAndFetch(connection, this, insertRow);
    }
    insertIgnore(connection, insertRow) {
        return insert_1.InsertUtil.insertIgnore(connection, this, insertRow);
    }
    insert(connection, insertRow) {
        return insert_1.InsertUtil.insert(connection, this, insertRow);
    }
    replace(connection, insertRow) {
        return insert_1.InsertUtil.replace(connection, this, insertRow);
    }
    updateAndFetchOneByCk(connection, ck, delegate) {
        return update_1.UpdateUtil.updateAndFetchOneByCk(connection, this, ck, delegate);
    }
    updateAndFetchOneByPk(connection, pk, delegate) {
        return update_1.UpdateUtil.updateAndFetchOneByPk(connection, this, pk, delegate);
    }
    updateAndFetchOneBySk(connection, sk, delegate) {
        return update_1.UpdateUtil.updateAndFetchOneBySk(connection, this, sk, delegate);
    }
    updateAndFetchZeroOrOneByCk(connection, ck, delegate) {
        return update_1.UpdateUtil.updateAndFetchZeroOrOneByCk(connection, this, ck, delegate);
    }
    updateAndFetchZeroOrOneByPk(connection, pk, delegate) {
        return update_1.UpdateUtil.updateAndFetchZeroOrOneByPk(connection, this, pk, delegate);
    }
    updateAndFetchZeroOrOneBySk(connection, sk, delegate) {
        return update_1.UpdateUtil.updateAndFetchZeroOrOneBySk(connection, this, sk, delegate);
    }
    updateOneByCk(connection, ck, delegate) {
        return update_1.UpdateUtil.updateOneByCk(connection, this, ck, delegate);
    }
    updateOneByPk(connection, pk, delegate) {
        return update_1.UpdateUtil.updateOneByPk(connection, this, pk, delegate);
    }
    updateOneBySk(connection, sk, delegate) {
        return update_1.UpdateUtil.updateOneBySk(connection, this, sk, delegate);
    }
    updateZeroOrOneByCk(connection, ck, delegate) {
        return update_1.UpdateUtil.updateZeroOrOneByCk(connection, this, ck, delegate);
    }
    updateZeroOrOneByPk(connection, pk, delegate) {
        return update_1.UpdateUtil.updateZeroOrOneByPk(connection, this, pk, delegate);
    }
    updateZeroOrOneBySk(connection, sk, delegate) {
        return update_1.UpdateUtil.updateZeroOrOneBySk(connection, this, sk, delegate);
    }
    deleteOneByCk(connection, ck) {
        return delete_1.DeleteUtil.deleteOneByCk(connection, this, ck);
    }
    deleteOneByPk(connection, pk) {
        return delete_1.DeleteUtil.deleteOneByPk(connection, this, pk);
    }
    deleteOneBySk(connection, sk) {
        return delete_1.DeleteUtil.deleteOneBySk(connection, this, sk);
    }
    deleteZeroOrOneByCk(connection, ck) {
        return delete_1.DeleteUtil.deleteZeroOrOneByCk(connection, this, ck);
    }
    deleteZeroOrOneByPk(connection, pk) {
        return delete_1.DeleteUtil.deleteZeroOrOneByPk(connection, this, pk);
    }
    deleteZeroOrOneBySk(connection, sk) {
        return delete_1.DeleteUtil.deleteZeroOrOneBySk(connection, this, sk);
    }
}
exports.Table = Table;
//# sourceMappingURL=table.js.map