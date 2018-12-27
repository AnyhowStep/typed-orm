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

export const isNullable_someId = o.PolymorphismUtil.isNullable(child, "someId");

export const isNullable_parentSpecific = o.PolymorphismUtil.isNullable(child, "parentSpecific");
export const isNullable_nullableParentSpecific = o.PolymorphismUtil.isNullable(child, "nullableParentSpecific");

export const isNullable_childSpecific = o.PolymorphismUtil.isNullable(child, "childSpecific");
export const isNullable_nullableChildSpecific = o.PolymorphismUtil.isNullable(child, "nullableChildSpecific");

export const isNullable_nullableParentRequiredChild = o.PolymorphismUtil.isNullable(child, "nullableParentRequiredChild");
export const isNullable_nullableParentAndChild = o.PolymorphismUtil.isNullable(child, "nullableParentAndChild");
export const isNullable_requiredParentAndChild = o.PolymorphismUtil.isNullable(child, "requiredParentAndChild");

export const isNullable_doesNotExist = o.PolymorphismUtil.isNullable(child, "doesNotExist");

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