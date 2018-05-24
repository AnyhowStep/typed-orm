export class StringBuilder {
    private lines : string[] = [];
    private indentLevel : number = 0;

    public constructor () {

    }
    toString () : string {
        return this.lines.join("\n");
    }

    indent () : this {
        ++this.indentLevel;
        return this;
    }
    unindent () : this {
        if (this.indentLevel > 0) {
            --this.indentLevel;
        }
        return this;
    }
    append (str : string) : this {
        if (str == "") {
            return this;
        }

        const arr = str.split("\n");
        const first = arr.shift();
        if (first == undefined) {
            return this;
        }

        const tab = "\t".repeat(this.indentLevel);

        if (this.lines.length == 0) {
            //Empty string builder, this is our first line
            this.lines.push(tab + first);
        } else {
            //Append to existing line
            const curLine = this.lines[this.lines.length-1];
            const leadingIndentMatch = /^(\t*)$/.exec(curLine);
            if (leadingIndentMatch == undefined) {
                //Existing line is not considered empty, append normally
                this.lines[this.lines.length-1] += first;
            } else {
                //Existing line is considered empty, only has indent
                //We check the indentation is "correct"
                if (leadingIndentMatch[1].length == this.indentLevel) {
                    //It is correct, append normally
                    this.lines[this.lines.length-1] += first;
                } else {
                    //It is incorrect, fix it
                    this.lines[this.lines.length-1] = tab + first;
                }
            }
        }

        //The rest of `arr` go on new lines
        this.lines.push(...arr.map(s => tab + s));
        return this;
    }
    appendLine (str : string="") : this {
        return this.append(str+"\n");
    }
    appendIfNotZero (i : number, str : string) : this {
        if (i != 0) {
            return this.append(str);
        }
        return this;
    }
    map<T> (arr : T[], callback : (sb : this, element : T, index : number) => void, joinStr : string="") : this {
        for (let index=0; index<arr.length; ++index) {
            this.appendIfNotZero(index, joinStr);
            const element = arr[index];
            callback(this, element, index);
        }
        return this;
    }
    scope (callback : (sb : this) => void) : this {
        this.indent();
        callback(this);
        this.unindent();
        //TODO Should this be removed?
        this.appendLine();
        return this;
    }
}
