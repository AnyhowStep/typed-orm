export declare class StringBuilder {
    private lines;
    private indentLevel;
    constructor();
    toString(): string;
    indent(): this;
    unindent(): this;
    append(str: string): this;
    appendLine(str?: string): this;
    appendIfNotZero(i: number, str: string): this;
    map<T>(arr: T[], callback: (sb: this, element: T, index: number) => void, joinStr?: string): this;
    scope(callback: (sb: this) => void): this;
}
