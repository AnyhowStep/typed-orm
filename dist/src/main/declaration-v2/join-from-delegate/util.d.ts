import { JoinCollection } from "../join-collection";
import { JoinFromDelegate } from "./join-from-delegate";
export declare namespace JoinFromDelegateUtil {
    function execute<JoinsT extends JoinCollection, FromDelegateT extends JoinFromDelegate<JoinsT>>(joins: JoinsT, fromDelegate: FromDelegateT): ReturnType<FromDelegateT>;
}
//# sourceMappingURL=util.d.ts.map