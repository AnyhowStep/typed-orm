import { AnySelectBuilder } from "../select-builder";
import { ColumnReferencesUtil } from "../column-references";
import { SelectCollectionUtil } from '../select-collection';
import { Tuple } from "../tuple";
import { OrderBy } from "../order-by";
export declare type UnionOrderByDelegate<SelectBuilderT extends AnySelectBuilder> = ((columnReferences: (ColumnReferencesUtil.ToConvenient<SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>>), selectBuilder: SelectBuilderT) => (Tuple<OrderBy<SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>>> | undefined));
//# sourceMappingURL=union-order-by-delegate.d.ts.map