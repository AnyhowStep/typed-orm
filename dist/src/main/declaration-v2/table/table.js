"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("../aliased-table");
const column_collection_1 = require("../column-collection");
//import {RawColumnCollection, RawColumnCollectionUtil} from "../raw-column-collection";
const table_data_1 = require("../table-data");
const util_1 = require("./util");
class Table extends aliased_table_1.AliasedTable {
    constructor(alias, name, columns, data) {
        super(alias, name, columns);
        this.data = data;
    }
    as(newAlias) {
        return new Table(newAlias, this.name, column_collection_1.ColumnCollectionUtil.withTableAlias(this.columns, newAlias), table_data_1.TableDataUtil.withTableAlias(this.data, newAlias)
        //this.data
        );
    }
    getUniqueKeyAssertDelegate() {
        if (this.uniqueKeyAssertDelegate == undefined) {
            this.uniqueKeyAssertDelegate = util_1.TableUtil.uniqueKeyAssertDelegate(this);
        }
        return this.uniqueKeyAssertDelegate;
    }
}
exports.Table = Table;
//# sourceMappingURL=table.js.map