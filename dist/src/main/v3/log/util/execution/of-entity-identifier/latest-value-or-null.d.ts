import * as sd from "schema-decorator";
import { EntityIdentifier, LogNoTrackedDefaults } from "../../../log";
import { ExprUtil, IExpr } from "../../../../expr";
import { ALIASED } from "../../../../constants";
import { LatestValueDelegate } from "../latest-value-delegate";
export declare type LatestValueOrNull<LogT extends LogNoTrackedDefaults, DelegateT extends LatestValueDelegate<LogT>> = (ExprUtil.As<IExpr<{
    usedRef: {};
    assertDelegate: sd.AssertDelegate<ReturnType<LogT["table"]["columns"][ReturnType<DelegateT>["name"]]["assertDelegate"]> | null>;
    tableAlias: typeof ALIASED;
}>, ReturnType<DelegateT>["name"]>);
export declare function latestValueOrNull<LogT extends LogNoTrackedDefaults, DelegateT extends LatestValueDelegate<LogT>>(log: LogT, entityIdentifier: EntityIdentifier<LogT>, delegate: DelegateT): (LatestValueOrNull<LogT, DelegateT>);
