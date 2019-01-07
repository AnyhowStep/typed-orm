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

export const hasExplicitDefaultValue_someId = o.TablePerTypeUtil.hasExplicitDefaultValue(child, "someId");

export const hasExplicitDefaultValue_parentSpecific = o.TablePerTypeUtil.hasExplicitDefaultValue(child, "parentSpecific");
export const hasExplicitDefaultValue_nullableParentSpecific = o.TablePerTypeUtil.hasExplicitDefaultValue(child, "nullableParentSpecific");

export const hasExplicitDefaultValue_childSpecific = o.TablePerTypeUtil.hasExplicitDefaultValue(child, "childSpecific");
export const hasExplicitDefaultValue_nullableChildSpecific = o.TablePerTypeUtil.hasExplicitDefaultValue(child, "nullableChildSpecific");

export const hasExplicitDefaultValue_nullableParentRequiredChild = o.TablePerTypeUtil.hasExplicitDefaultValue(child, "nullableParentRequiredChild");
export const hasExplicitDefaultValue_nullableParentAndChild = o.TablePerTypeUtil.hasExplicitDefaultValue(child, "nullableParentAndChild");
export const hasExplicitDefaultValue_requiredParentAndChild = o.TablePerTypeUtil.hasExplicitDefaultValue(child, "requiredParentAndChild");

export const hasExplicitDefaultValue_doesNotExist = o.TablePerTypeUtil.hasExplicitDefaultValue(child, "doesNotExist");

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