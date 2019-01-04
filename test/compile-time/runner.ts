import * as ts from "typescript";
import * as fs from "fs";
import * as diff from "diff";
import {
    getAllTsFiles,
    inputRoot,
    actualOutputRoot,
    expectedOutputRoot,
    removeAllFilesAndDirectoriesSync,
} from "./util";

removeAllFilesAndDirectoriesSync(actualOutputRoot);

const start = new Date().getTime();
const rootNames = getAllTsFiles(inputRoot);
const compilerOptions : ts.CompilerOptions = {
    strict : true,
    target : ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    declaration : true,
    emitDeclarationOnly : true,
};
const program = ts.createProgram({
    rootNames : rootNames,
    options : compilerOptions,
});
const emitResult = program.emit(
    undefined,
    (fileName, data) => {
        if (!fileName.startsWith(inputRoot)) {
            return;
        }
        const relativePath = fileName.substr(inputRoot.length);

        //Ensure the directory exists
        const parts = relativePath.substr(1).split("/");
        parts.pop();

        let curPath = actualOutputRoot;
        for (let p of parts) {
            curPath += "/" + p;
            if (!fs.existsSync(curPath)) {
                fs.mkdirSync(curPath);
            }
        }

        //Write the declaration file
        fs.writeFileSync(
            actualOutputRoot + relativePath,
            data
        );
    }
);
const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

const errorDict : {
    [path : string] : undefined|{
        messageText : string|ts.DiagnosticMessageChain,
        category : ts.DiagnosticCategory,
        code : number,
        length : number|undefined,
        start : number|undefined,
    }[]
} = {};
for (let d of allDiagnostics) {
    if (d.file == undefined) {
        console.error(d);
        throw new Error(`Unexpected diagnostic error`);
    }
    if (!d.file.fileName.startsWith(inputRoot)) {
        continue;
    }
    const fileName = d.file.fileName.substr(inputRoot.length);

    let errors = errorDict[fileName];
    if (errors == undefined) {
        errors = [];
        errorDict[fileName] = errors;
    }

    const {
        messageText,
        code,
        category,
        length,
        start,
    } = d;
    errors.push({
        messageText,
        code,
        category,
        length,
        start,
    });
}
Object.keys(errorDict).forEach((fileName) => {
    fs.writeFileSync(
        actualOutputRoot + "/" + fileName + ".errors",
        JSON.stringify(errorDict[fileName], null, 2)
    );
});

const allDiffResults : {
    relativePath : string,
    declarationDiffs : diff.IDiffResult[],
    errorDiffs : diff.IDiffResult[],
}[] = [];

function diffFiles (actualPath : string, expectedPath : string) {
    if (!fs.existsSync(actualPath)) {
        return [];
    }
    const expectedData = fs.existsSync(expectedPath) ?
        fs.readFileSync(expectedPath).toString() :
        "";
    return diff.diffLines(
        expectedData,
        fs.readFileSync(actualPath).toString(),
        {
            ignoreCase : false,
            newlineIsToken : true,
        }
    ).filter(d => (
        d.removed === true ||
        d.added === true
    ));
}
//Now, we look for differences between the actual and expected
for (let rootName of rootNames) {
    const relativePath = rootName
        .substr(inputRoot.length)
        .replace(".ts", "");

    const declarationDiffs = diffFiles(
        actualOutputRoot + relativePath + ".d.ts",
        expectedOutputRoot + relativePath + ".d.ts"
    );
    const errorDiffs = diffFiles(
        actualOutputRoot + relativePath + ".ts.errors",
        expectedOutputRoot + relativePath + ".ts.errors"
    );
    if (declarationDiffs.length > 0 || errorDiffs.length > 0) {
        allDiffResults.push({
            relativePath,
            declarationDiffs,
            errorDiffs,
        });
    }
}
const end = new Date().getTime();
const timeTaken = end-start;
console.log("Compile-time tests completed in", timeTaken/1000.0, "s");
if (allDiffResults.length > 0) {
    for (let diffResult of allDiffResults) {
        console.log("====================================");
        console.error(JSON.stringify(diffResult, null, 2));
    }
    for (let diffResult of allDiffResults) {
        console.log(diffResult.relativePath);
    }
    console.error("Found discrepancies in", allDiffResults.length, "out of", rootNames.length,"files");
    process.exit(1);
}
console.log("tested", rootNames.length, "files");