import * as sd from "schema-decorator";
import { EntityIdentifier, LogNoTrackedDefaults } from "../../../log";
import { ALIASED } from "../../../../constants";
import { ExprUtil, IExpr } from "../../../../expr";
export declare type LatestOrderOrNull<LogT extends LogNoTrackedDefaults> = (ExprUtil.As<IExpr<{
    usedRef: {};
    assertDelegate: sd.AssertDelegate<ReturnType<LogT["latestOrder"][0]["assertDelegate"]> | null>;
    tableAlias: typeof ALIASED;
}>, LogT["latestOrder"][0]["name"]>);
export declare function latestOrderOrNull<LogT extends LogNoTrackedDefaults>(log: LogT, entityIdentifier: EntityIdentifier<LogT>): (LatestOrderOrNull<LogT>);
