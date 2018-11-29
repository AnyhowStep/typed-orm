import * as tape from "tape";

tape(__filename, (t) => {
    const i : bigint = BigInt(Number.MAX_SAFE_INTEGER);
    const i2 : bigint = i * i;
    const i3 : bigint = i2 * i2;
    const i4 : bigint = i3 * i3;
    const i5 : bigint = i4 * i4;
    const i6 : bigint = i5 * i5;

    t.deepEqual(
        i6,
        3522675558424098898733321058454641244700795509015226130248002538764312345945558217355449313723627990195040056485554883866996138267463134231663614784945961494205733122067087773595804198998644497195701727291524418134186905114274550702748357399078042989331094660012792325013328184414837671581987113017991248712160433656834163981545357003481831127894269144094565133313609873435892279815968031807647169995518153597535002058452022201257321199477958488708673179221488676969870070027675588444345604039060850061114081281n
    );

    /*//Ugly hack to serialize bigint as string
    (BigInt.prototype as any).toJSON = function () {
        return this.toString();
    };
    console.log(JSON.stringify(i));
    console.log(i);
    console.log(JSON.stringify(i6));
    console.log(i6);*/
    t.end();
});
