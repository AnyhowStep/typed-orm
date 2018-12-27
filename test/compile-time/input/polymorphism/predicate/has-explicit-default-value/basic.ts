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

export const hasExplicitDefaultValue_someId = o.PolymorphismUtil.hasExplicitDefaultValue(child, "someId");

export const hasExplicitDefaultValue_parentSpecific = o.PolymorphismUtil.hasExplicitDefaultValue(child, "parentSpecific");
export const hasExplicitDefaultValue_nullableParentSpecific = o.PolymorphismUtil.hasExplicitDefaultValue(child, "nullableParentSpecific");

export const hasExplicitDefaultValue_childSpecific = o.PolymorphismUtil.hasExplicitDefaultValue(child, "childSpecific");
export const hasExplicitDefaultValue_nullableChildSpecific = o.PolymorphismUtil.hasExplicitDefaultValue(child, "nullableChildSpecific");

export const hasExplicitDefaultValue_nullableParentRequiredChild = o.PolymorphismUtil.hasExplicitDefaultValue(child, "nullableParentRequiredChild");
export const hasExplicitDefaultValue_nullableParentAndChild = o.PolymorphismUtil.hasExplicitDefaultValue(child, "nullableParentAndChild");
export const hasExplicitDefaultValue_requiredParentAndChild = o.PolymorphismUtil.hasExplicitDefaultValue(child, "requiredParentAndChild");

export const hasExplicitDefaultValue_doesNotExist = o.PolymorphismUtil.hasExplicitDefaultValue(child, "doesNotExist");

//export const hedv : o.PolymorphismUtil.HasExplicitDefaultValue<typeof child, "childSpecific"> = null as any;
//export const rcn : o.PolymorphismUtil.RequiredColumnNames<typeof child> = null as any;
//export const ocn : o.PolymorphismUtil.OptionalColumnNames<typeof child> = null as any;
//export const ir : o.PolymorphismUtil.InsertRowLiteral<typeof child> = null as any;
/*export const insertResult = o.PolymorphismUtil.insertAndFetch(
    null as any,
    child,
    {
        sharedValue : "thisIsShared",
        parentSpecific : "parentOnly",
        childSpecific : "childOnly",
    }
);*/