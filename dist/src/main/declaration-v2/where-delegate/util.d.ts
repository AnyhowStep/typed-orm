import { AnySelectBuilder } from "../select-builder";
import { WhereDelegate } from "./where-delegate";
import { Expr } from "../expr";
import { Join } from "../join";
import { Column } from "../column";
import { AliasedTable } from "../aliased-table";
export declare namespace WhereDelegateUtil {
    function execute<SelectBuilderT extends AnySelectBuilder, WhereDelegateT extends WhereDelegate<SelectBuilderT>>(selectBuilder: SelectBuilderT, delegate: WhereDelegateT): Expr<{ readonly [tableAlias in Extract<keyof (SelectBuilderT["data"]["joins"][Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? { readonly [tableAlias in SelectBuilderT["data"]["joins"][Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["table"]["alias"]]: true extends { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["nullable"] ? { readonly [columnName in Extract<keyof { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"], string>]: Column<{ [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"][columnName]["tableAlias"], { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"][columnName]["name"], ReturnType<{ [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"][columnName]["assertDelegate"]> | null>; } : { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"]; } : {}), string>]+?: { readonly [columnName in Extract<keyof (SelectBuilderT["data"]["joins"][Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? { readonly [tableAlias in SelectBuilderT["data"]["joins"][Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["table"]["alias"]]: true extends { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["nullable"] ? { readonly [columnName in Extract<keyof { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"], string>]: Column<{ [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"][columnName]["tableAlias"], { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"][columnName]["name"], ReturnType<{ [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"][columnName]["assertDelegate"]> | null>; } : { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"]; } : {})[tableAlias], string>]+?: ((SelectBuilderT["data"]["joins"][Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? { readonly [tableAlias in SelectBuilderT["data"]["joins"][Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["table"]["alias"]]: true extends { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["nullable"] ? { readonly [columnName in Extract<keyof { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"], string>]: Column<{ [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"][columnName]["tableAlias"], { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"][columnName]["name"], ReturnType<{ [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"][columnName]["assertDelegate"]> | null>; } : { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"]; } : {})[tableAlias][columnName] extends Column<string, string, any> ? (SelectBuilderT["data"]["joins"][Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? { readonly [tableAlias in SelectBuilderT["data"]["joins"][Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["table"]["alias"]]: true extends { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["nullable"] ? { readonly [columnName in Extract<keyof { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"], string>]: Column<{ [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"][columnName]["tableAlias"], { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"][columnName]["name"], ReturnType<{ [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"][columnName]["assertDelegate"]> | null>; } : { [index in Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]: SelectBuilderT["data"]["joins"][index] extends Join<AliasedTable<string, string, {
        readonly [columnName: string]: Column<string, string, any>;
    }>, {
        readonly [columnName: string]: Column<string, string, any>;
    }, boolean> ? SelectBuilderT["data"]["joins"][index]["table"]["alias"] extends tableAlias ? SelectBuilderT["data"]["joins"][index] : never : never; }[Exclude<keyof SelectBuilderT["data"]["joins"], number | "reverse" | "map" | "filter" | "length" | "toString" | "toLocaleString" | "push" | "pop" | "concat" | "join" | "shift" | "slice" | "sort" | "splice" | "unshift" | "indexOf" | "lastIndexOf" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values">]["columns"]; } : {})[tableAlias][columnName] : never) | undefined; } | undefined; }, boolean>;
}
