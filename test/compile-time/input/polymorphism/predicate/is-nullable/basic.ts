import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";

const parent = o.table(
    "parent",
    {
        someId : o.bigint(),

        parentSpecific : sd.string(),
        nullableParentSpecific : sd.nullable(sd.string()),

        nullableParentRequiredChild : sd.nullable(sd.string()),
        //Not allowed because child cannot widen parent type
        //nullableChildRequiredParent : sd.string(),
        nullableParentAndChild : sd.nullable(sd.string()),
        requiredParentAndChild : sd.string(),
    }
).setAutoIncrement(c => c.someId);
const child = o.table(
    "child",
    {
        someId : o.bigint(),

        childSpecific : sd.string(),
        nullableChildSpecific : sd.nullable(sd.string()),

        nullableParentRequiredChild : sd.string(),
        //Not allowed because child cannot widen parent type
        //nullableChildRequiredParent : sd.nullable(sd.string()),
        nullableParentAndChild : sd.nullable(sd.string()),
        requiredParentAndChild : sd.string(),
    }
).setId(c => c.someId)
.addParent(parent);

export const isNullable_someId = o.TablePerTypeUtil.isNullable(child, "someId");

export const isNullable_parentSpecific = o.TablePerTypeUtil.isNullable(child, "parentSpecific");
export const isNullable_nullableParentSpecific = o.TablePerTypeUtil.isNullable(child, "nullableParentSpecific");

export const isNullable_childSpecific = o.TablePerTypeUtil.isNullable(child, "childSpecific");
export const isNullable_nullableChildSpecific = o.TablePerTypeUtil.isNullable(child, "nullableChildSpecific");

export const isNullable_nullableParentRequiredChild = o.TablePerTypeUtil.isNullable(child, "nullableParentRequiredChild");
export const isNullable_nullableParentAndChild = o.TablePerTypeUtil.isNullable(child, "nullableParentAndChild");
export const isNullable_requiredParentAndChild = o.TablePerTypeUtil.isNullable(child, "requiredParentAndChild");

export const isNullable_doesNotExist = o.TablePerTypeUtil.isNullable(child, "doesNotExist");

//export const hedv : o.TablePerTypeUtil.HasExplicitDefaultValue<typeof child, "childSpecific"> = null as any;
//export const rcn : o.TablePerTypeUtil.RequiredColumnNames<typeof child> = null as any;
//export const ocn : o.TablePerTypeUtil.OptionalColumnNames<typeof child> = null as any;
//export const ir : o.TablePerTypeUtil.InsertRowLiteral<typeof child> = null as any;
/*export const insertResult = o.TablePerTypeUtil.insertAndFetch(
    null as any,
    child,
    {
        sharedValue : "thisIsShared",
        parentSpecific : "parentOnly",
        childSpecific : "childOnly",
    }
);*/