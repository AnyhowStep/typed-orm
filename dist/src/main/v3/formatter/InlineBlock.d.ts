import { Token } from "./Token";
/**
 * Bookkeeper for inline blocks.
 *
 * Inline blocks are parenthized expressions that are shorter than INLINE_MAX_LENGTH.
 * These blocks are formatted on a single line, unlike longer parenthized
 * expressions where open-parenthesis causes newline and increase of indentation.
 */
export declare class InlineBlock {
    private level;
    constructor();
    /**
     * Begins inline block when lookahead through upcoming tokens determines
     * that the block would be smaller than INLINE_MAX_LENGTH.
     * @param  {Object[]} tokens Array of all tokens
     * @param  {Number} index Current token position
     */
    beginIfPossible(tokens: Token[], index: number): void;
    /**
     * Finishes current inline block.
     * There might be several nested ones.
     */
    end(): void;
    /**
     * True when inside an inline block
     * @return {Boolean}
     */
    isActive(): boolean;
    isInlineBlock(tokens: Token[], index: number): boolean;
    isForbiddenToken({ type, value }: Token): boolean;
}
//# sourceMappingURL=InlineBlock.d.ts.map