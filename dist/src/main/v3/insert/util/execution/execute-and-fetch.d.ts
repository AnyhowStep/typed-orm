import { TableUtil } from "../../../table";
import { ExecutableInsert } from "../../insert";
import { IConnection } from "../../../execution";
import { Row } from "../../../row";
export declare function executeAndFetch<InsertT extends ExecutableInsert>(insert: InsertT, connection: (IConnection & TableUtil.AssertHasCandidateKey<InsertT["_table"]>)): (Promise<Row<InsertT["_table"]>>);
//# sourceMappingURL=execute-and-fetch.d.ts.map