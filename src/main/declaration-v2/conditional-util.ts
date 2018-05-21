export type Conditional<
    DerivedT,
    BaseT,
    IfTrueT,
    IfFalseT
> = (
    DerivedT extends BaseT ?
        IfTrueT :
        IfFalseT
);
export type AnyConditional = Conditional<any, any, any, any>;

export type CheckIf<
    ConditionT extends AnyConditional,
> = (
    ConditionT extends Conditional<infer DerivedT, infer BaseT, infer IfTrueT, infer IfFalseT> ?
        (
            DerivedT extends BaseT ?
                IfTrueT :
                IfFalseT
        ) :
        never
);
export function checkIf<
    DerivedT,
    BaseT,
    IfTrueT,
    IfFalseT
> (
    derived : DerivedT,
    conditionDelegate : (derived : DerivedT) => BaseT|undefined,
    ifTrueDelegate : (base : Exclude<BaseT, undefined>) => IfTrueT,
    ifFalseDelegate : (derived : DerivedT) => IfFalseT,
) : (
    DerivedT extends BaseT ?
        IfTrueT :
        IfFalseT
) {
    const base = conditionDelegate(derived);
    if (base != undefined) {
        return ifTrueDelegate(base as any) as any;
    } else {
        return ifFalseDelegate(derived) as any;
    }
}

export type Assert<
    AssertT,
    IfSafeT
> = (
    Error extends AssertT ?
        AssertT :
        IfSafeT
);
export function assert<
    AssertT,
    IfSafeT
> (
    assertDelegate : () => AssertT,
    ifSafeDelegate : (asserted : AssertT) => IfSafeT
) : (
    Assert<AssertT, IfSafeT>
) {
    const asserted = assertDelegate();
    return ifSafeDelegate(asserted) as any;
}
