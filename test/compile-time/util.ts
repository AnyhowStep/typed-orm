import * as fs from "fs";

import {getAllTsFiles} from "../util";
export {getAllTsFiles};

export const inputRoot = __dirname + "/input";
export const actualOutputRoot = __dirname + "/actual-output";
export const expectedOutputRoot = __dirname + "/expected-output";


export function getAllFilesAndDirectories (rootDir : string, result : { path : string, isDir : boolean }[] = [], relativeDir : string|undefined = undefined) : { path : string, isDir : boolean }[] {
    const currentDir = (relativeDir == undefined) ?
        rootDir :
        rootDir + "/" + relativeDir;
    for (let path of fs.readdirSync(currentDir)) {
        const fullPath = currentDir + "/" + path;

        if (fs.lstatSync(fullPath).isDirectory()) {
            result.push({
                path : fullPath,
                isDir : true,
            });
            getAllFilesAndDirectories(
                rootDir,
                result,
                (relativeDir == undefined) ?
                    path :
                    relativeDir + "/" + path
            );
        } else {
            result.push({
                path : fullPath,
                isDir : false,
            });
        }
    }
    return result;
}

export function removeAllFilesAndDirectoriesSync (rootDir : string) {
    const paths = getAllFilesAndDirectories(rootDir).reverse();
    for (let path of paths) {
        if (path.isDir) {
            fs.rmdirSync(path.path);
        } else {
            fs.unlinkSync(path.path);
        }
    }
}

export function makeDirectorySync (rootDir : string, relativePath : string, relativePathIsFile : boolean) {
    //Ensure the directory exists
    const parts = relativePath.substr(1).split("/");
    if (relativePathIsFile) {
        parts.pop();
    }

    let curPath = rootDir;
    for (let p of parts) {
        curPath += "/" + p;
        if (!fs.existsSync(curPath)) {
            fs.mkdirSync(curPath);
        }
    }
}

export function copyFileSync (fromRootDir : string, toRootDir : string, relativePath : string) {
    makeDirectorySync(toRootDir, relativePath, true);

    const path = fromRootDir + relativePath;
    {
        const data = fs.readFileSync(path);
        fs.writeFileSync(
            toRootDir + relativePath,
            data
        );
    }
    if (fs.existsSync(path.replace(".d.ts", ".ts.errors"))) {
        const data = fs.readFileSync(path.replace(".d.ts", ".ts.errors"));
        fs.writeFileSync(
            toRootDir + relativePath.replace(".d.ts", ".ts.errors"),
            data
        );
    }
}
export function copyAllFilesAndDirectoriesSync (fromRootDir : string, toRootDir : string) {
    const paths = getAllTsFiles(fromRootDir);
    for (let path of paths) {
        const relativePath = path.substr(fromRootDir.length);
        makeDirectorySync(toRootDir, relativePath, true);

        {
            const data = fs.readFileSync(path);
            fs.writeFileSync(
                toRootDir + relativePath,
                data
            );
        }
        if (fs.existsSync(path.replace(".d.ts", ".ts.errors"))) {
            const data = fs.readFileSync(path.replace(".d.ts", ".ts.errors"));
            fs.writeFileSync(
                toRootDir + relativePath.replace(".d.ts", ".ts.errors"),
                data
            );
        }
    }
}