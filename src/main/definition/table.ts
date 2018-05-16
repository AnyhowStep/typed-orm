import * as d from "../declaration";
import {Database} from "typed-mysql";
import {spread} from "@anyhowstep/type-util";
import {toColumnCollection} from "./column-collection";
import {nullableColumnNames} from "./column-operation";

function nullableToHasServerDefaultValue<ColumnCollectionT extends d.AnyColumnCollection> (
    columns : ColumnCollectionT
) : {
    [name in d.NullableColumnNames<ColumnCollectionT>] : true
} {
    return nullableColumnNames(columns)
        .reduce<{ [name : string] : true }>((memo, name) => {
            memo[name] = true;
            return memo;
        }, {}) as any;
}

export class Table<
    AliasT extends string,
    NameT extends string,
    RawColumnCollectionT extends d.RawColumnCollection,
    DataT extends d.RawTableData
> implements d.ITable<AliasT, NameT, RawColumnCollectionT, DataT> {
    readonly alias  : AliasT;
    readonly name   : NameT;
    readonly columns : d.ColumnCollection<AliasT, RawColumnCollectionT>;

    readonly data : DataT;

    readonly query : string;

    constructor (
        alias : AliasT,
        name : NameT,
        columns : RawColumnCollectionT,
        data : DataT
    ) {
        this.alias = alias;
        this.name  = name;
        this.columns = toColumnCollection(alias, columns);
        this.data = data;

        if ((name as string) == (alias as string)) {
            this.query = Database.EscapeId(name);
        } else {
            this.query = `${Database.EscapeId(name)} AS ${Database.EscapeId(alias)}`
        }
    }

    querify (sb : d.IStringBuilder) {
        sb.append(this.query);
    }

    public as<NewAliasT extends string> (alias : NewAliasT) : d.AliasedTable<NewAliasT, NameT, RawColumnCollectionT> {
        return new Table(
            alias,
            this.name,
            this.columns,
            this.data
        ) as any;
    }
    assertIsOwnColumn (name : string, other : d.AnyColumn) {
        if (other.table != this.alias) {
            throw new Error(`Expected ${name}.table to be ${this.alias}, received ${other.table}`);
        }
        const column = (this.columns as any)[other.name];
        if (column == undefined) {
            throw new Error(`Table ${this.alias} has no such column ${other.name} of ${name}`);
        }
        if (column != other) {
            throw new Error(`The column ${other.table}.${other.name} exists but is different from the instance received of ${name}`);
        }
    }
    autoIncrement<
        AutoIncrementDelegateT extends d.AutoIncrementDelegate<d.ColumnCollection<AliasT, RawColumnCollectionT>>
    > (
        autoIncrementDelegate : AutoIncrementDelegateT
    ) {
        const autoIncrement = autoIncrementDelegate(this.columns);
        this.assertIsOwnColumn("autoIncrement", autoIncrement);
        return new Table(
            this.alias,
            this.name,
            this.columns,
            spread(
                this.data,
                {
                    autoIncrement : autoIncrement,
                    hasServerDefaultValue : {
                        ...this.data.hasServerDefaultValue,
                        [autoIncrement.name] : true,
                    }
                }
            )
        ) as any;
    }
    public setHasServerDefaultValue<
        HasServerDefaultValueDelegateT extends d.HasServerDefaultValueDelegate<d.ColumnCollection<AliasT, RawColumnCollectionT>>
    > (
        hasServerDefaultValueDelegate : HasServerDefaultValueDelegateT
    ) {
        const columns = hasServerDefaultValueDelegate(this.columns);
        for (let i=0; i<columns.length; ++i) {
            this.assertIsOwnColumn(`serverDefaultValue[${i}]`, columns[i]);
        }

        const hasServerDefaultValue : { [name : string] : true } = nullableToHasServerDefaultValue(this.columns);
        for (let c of columns) {
            hasServerDefaultValue[c.name] = true;
        }
        if (this.data.autoIncrement != undefined) {
            hasServerDefaultValue[this.data.autoIncrement.name] = true;
        }

        return new Table(
            this.alias,
            this.name,
            this.columns,
            spread(
                this.data,
                {
                    hasServerDefaultValue : hasServerDefaultValue,
                }
            )
        ) as any;
    }
}

export const table : d.CreateTableDelegate = <
    NameT extends string,
    RawColumnCollectionT extends d.RawColumnCollection
> (
    name : NameT,
    rawColumns : RawColumnCollectionT,
) => {
    const columns = toColumnCollection(name, rawColumns);

    return new Table(
        name,
        name,
        columns,
        {
            autoIncrement : undefined,
            hasServerDefaultValue : nullableToHasServerDefaultValue(columns),
        }
    ) as any;
};
