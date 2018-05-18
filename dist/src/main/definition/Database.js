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
const mysql = require("typed-mysql");
const select_builder_1 = require("./select-builder");
const insert_1 = require("./insert");
const update_1 = require("./update");
const ConnectedDatabase_1 = require("./ConnectedDatabase");
class Database extends mysql.Database {
    constructor() {
        super(...arguments);
        this.from = select_builder_1.newCreateSelectBuilderDelegate(this);
        this.insertSelectInto = ((table, selectBuilder) => {
            return new insert_1.InsertSelectBuilder({
                table: table,
                selectBuilder: selectBuilder,
                ignore: false,
                columns: undefined,
            }, this);
        });
        this.insertValueInto = ((table) => {
            return new insert_1.InsertValueBuilder({
                table: table,
                ignore: false,
                values: undefined,
            }, this);
        });
        //TODO Implement proper transactions?
        //TODO Remove mysql.Database dependency?
        this.updateTable = ((selectBuilder) => {
            return new update_1.UpdateBuilder({
                selectBuilder: selectBuilder,
                ignoreErrors: false,
                assignments: undefined,
            }, this);
        });
    }
    transaction(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const allocated = new ConnectedDatabase_1.ConnectedDatabase(this.isUtcOnly(), yield this.allocatePoolConnection());
            allocated.setPaginationConfiguration(this.getPaginationConfiguration());
            yield allocated.beginTransaction();
            yield callback(allocated);
            yield allocated.commit();
            allocated.releaseConnection();
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map