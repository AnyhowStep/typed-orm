import {
    FromBuilder,
    AnyColumn,
    AnyFromBuilderData,
    ColumnReferences,
    AnyAliasedTable,
    Column,
    ColumnToReference,
    TableReference,
    ssoClient,
    app,
    appKey,
    user,
    from
} from "./FromBuilder";
import {Tuple, TupleKeys} from "./Tuple";

type AnySelectType = AnyColumn|AnyAliasedTable;
type AnySelectInput = Tuple<AnySelectType>;
type SelectColumnReference<SelectTypeT extends AnySelectType> = (
    SelectTypeT extends AnyColumn ?
    ColumnToReference<SelectTypeT> :
    SelectTypeT extends AnyAliasedTable ?
    TableReference<SelectTypeT> :
    never
);
type SelectColumnReferences<AnySelectInputT extends AnySelectInput> = (
    AnySelectInputT[TupleKeys<AnySelectInputT>] extends AnySelectType ?
        SelectColumnReference<AnySelectInputT[TupleKeys<AnySelectInputT>]> :
        never
);

type AnySelectBuilderData = {
    fromBuilderData : AnyFromBuilderData,

    columnReferences : ColumnReferences
};

declare class SelectBuilder<T extends AnySelectBuilderData> {
    data : T;
};

type SelectCallback<
    FromBuilderT extends FromBuilder<any>,
> = (
    FromBuilderT extends FromBuilder<infer DataT> ?
        (f : FromBuilderT) => AnySelectInput :
        never
);

declare function select<
    FromBuilderT extends FromBuilder<any>
> (
    fromBuilder : FromBuilderT,
    //selectCallback : SelectCallback<FromBuilderT>
) : (
    SelectCallback<FromBuilderT>
    /*FromBuilderT extends FromBuilder<infer DataT> ?
        SelectBuilder<{
            fromBuilderData : DataT,
            columnReferences : SelectColumnReferences<ReturnType<SelectCallbackT>>
        }> :
        never*/
);

const fromBuilder = from(app)
    .join(appKey, [app.columns.appId], [appKey.columns.appId]);
const x = select(
    fromBuilder,
    
)
x()
