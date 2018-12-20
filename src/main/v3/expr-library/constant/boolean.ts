import {ExprUtil} from "../../expr";

const TRUE = ExprUtil.fromRawExpr(true as true);
const FALSE = ExprUtil.fromRawExpr(false as false);

export {
    TRUE as true,
    FALSE as false,
};