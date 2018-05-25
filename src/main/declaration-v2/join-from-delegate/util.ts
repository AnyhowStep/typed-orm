import {JoinCollection, JoinCollectionUtil} from "../join-collection";
import {JoinFromDelegate} from "./join-from-delegate";

export namespace JoinFromDelegateUtil {
    export function execute<
        JoinsT extends JoinCollection,
        FromDelegateT extends JoinFromDelegate<JoinsT>
    > (
        joins : JoinsT,
        fromDelegate : FromDelegateT
    ) : ReturnType<FromDelegateT> {
        const result = fromDelegate(JoinCollectionUtil.toConvenientColumnReferences(joins));
        JoinCollectionUtil.assertHasColumns(joins, result);
        //TODO Follow up on potential bug https://github.com/Microsoft/TypeScript/issues/24277
        return result as any;
    };
}
