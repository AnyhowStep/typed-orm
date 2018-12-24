"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collation;
(function (Collation) {
    //Armenian, Binary
    Collation["armscii8_bin"] = "armscii8_bin";
    //Armenian, case-insensitive
    Collation["armscii8_general_ci"] = "armscii8_general_ci";
    //West European (multilingual), Binary
    Collation["ascii_bin"] = "ascii_bin";
    //West European (multilingual), case-insensitive
    Collation["ascii_general_ci"] = "ascii_general_ci";
    //Traditional Chinese, Binary
    Collation["big5_bin"] = "big5_bin";
    //Traditional Chinese, case-insensitive
    Collation["big5_chinese_ci"] = "big5_chinese_ci";
    //Binary
    Collation["binary"] = "binary";
    //Central European (multilingual), Binary
    Collation["cp1250_bin"] = "cp1250_bin";
    //Croatian, case-insensitive
    Collation["cp1250_croatian_ci"] = "cp1250_croatian_ci";
    //Czech, case-sensitive
    Collation["cp1250_czech_cs"] = "cp1250_czech_cs";
    //Central European (multilingual), case-insensitive
    Collation["cp1250_general_ci"] = "cp1250_general_ci";
    //Polish, case-insensitive
    Collation["cp1250_polish_ci"] = "cp1250_polish_ci";
    //Cyrillic (multilingual), Binary
    Collation["cp1251_bin"] = "cp1251_bin";
    //Bulgarian, case-insensitive
    Collation["cp1251_bulgarian_ci"] = "cp1251_bulgarian_ci";
    //Cyrillic (multilingual), case-insensitive
    Collation["cp1251_general_ci"] = "cp1251_general_ci";
    //Cyrillic (multilingual), case-sensitive
    Collation["cp1251_general_cs"] = "cp1251_general_cs";
    //Ukrainian, case-insensitive
    Collation["cp1251_ukrainian_ci"] = "cp1251_ukrainian_ci";
    //Arabic, Binary
    Collation["cp1256_bin"] = "cp1256_bin";
    //Arabic, case-insensitive
    Collation["cp1256_general_ci"] = "cp1256_general_ci";
    //Baltic (multilingual), Binary
    Collation["cp1257_bin"] = "cp1257_bin";
    //Baltic (multilingual), case-insensitive
    Collation["cp1257_general_ci"] = "cp1257_general_ci";
    //Lithuanian, case-insensitive
    Collation["cp1257_lithuanian_ci"] = "cp1257_lithuanian_ci";
    //West European (multilingual), Binary
    Collation["cp850_bin"] = "cp850_bin";
    //West European (multilingual), case-insensitive
    Collation["cp850_general_ci"] = "cp850_general_ci";
    //Central European (multilingual), Binary
    Collation["cp852_bin"] = "cp852_bin";
    //Central European (multilingual), case-insensitive
    Collation["cp852_general_ci"] = "cp852_general_ci";
    //Russian, Binary
    Collation["cp866_bin"] = "cp866_bin";
    //Russian, case-insensitive
    Collation["cp866_general_ci"] = "cp866_general_ci";
    //Japanese, Binary
    Collation["cp932_bin"] = "cp932_bin";
    //Japanese, case-insensitive
    Collation["cp932_japanese_ci"] = "cp932_japanese_ci";
    //West European (multilingual), Binary
    Collation["dec8_bin"] = "dec8_bin";
    //Swedish, case-insensitive
    Collation["dec8_swedish_ci"] = "dec8_swedish_ci";
    //Japanese, Binary
    Collation["eucjpms_bin"] = "eucjpms_bin";
    //Japanese, case-insensitive
    Collation["eucjpms_japanese_ci"] = "eucjpms_japanese_ci";
    //Korean, Binary
    Collation["euckr_bin"] = "euckr_bin";
    //Korean, case-insensitive
    Collation["euckr_korean_ci"] = "euckr_korean_ci";
    //unknown, Binary
    Collation["gb18030_bin"] = "gb18030_bin";
    //, case-insensitive
    Collation["gb18030_chinese_ci"] = "gb18030_chinese_ci";
    //Unicode (multilingual)
    Collation["gb18030_unicode_520_ci"] = "gb18030_unicode_520_ci";
    //Simplified Chinese, Binary
    Collation["gb2312_bin"] = "gb2312_bin";
    //Simplified Chinese, case-insensitive
    Collation["gb2312_chinese_ci"] = "gb2312_chinese_ci";
    //Simplified Chinese, Binary
    Collation["gbk_bin"] = "gbk_bin";
    //Simplified Chinese, case-insensitive
    Collation["gbk_chinese_ci"] = "gbk_chinese_ci";
    //Georgian, Binary
    Collation["geostd8_bin"] = "geostd8_bin";
    //Georgian, case-insensitive
    Collation["geostd8_general_ci"] = "geostd8_general_ci";
    //Greek, Binary
    Collation["greek_bin"] = "greek_bin";
    //Greek, case-insensitive
    Collation["greek_general_ci"] = "greek_general_ci";
    //Hebrew, Binary
    Collation["hebrew_bin"] = "hebrew_bin";
    //Hebrew, case-insensitive
    Collation["hebrew_general_ci"] = "hebrew_general_ci";
    //West European (multilingual), Binary
    Collation["hp8_bin"] = "hp8_bin";
    //English, case-insensitive
    Collation["hp8_english_ci"] = "hp8_english_ci";
    //Czech-Slovak, Binary
    Collation["keybcs2_bin"] = "keybcs2_bin";
    //Czech-Slovak, case-insensitive
    Collation["keybcs2_general_ci"] = "keybcs2_general_ci";
    //Russian, Binary
    Collation["koi8r_bin"] = "koi8r_bin";
    //Russian, case-insensitive
    Collation["koi8r_general_ci"] = "koi8r_general_ci";
    //Ukrainian, Binary
    Collation["koi8u_bin"] = "koi8u_bin";
    //Ukrainian, case-insensitive
    Collation["koi8u_general_ci"] = "koi8u_general_ci";
    //West European (multilingual), Binary
    Collation["latin1_bin"] = "latin1_bin";
    //Danish, case-insensitive
    Collation["latin1_danish_ci"] = "latin1_danish_ci";
    //West European (multilingual), case-insensitive
    Collation["latin1_general_ci"] = "latin1_general_ci";
    //West European (multilingual), case-sensitive
    Collation["latin1_general_cs"] = "latin1_general_cs";
    //German (dictionary), case-insensitive
    Collation["latin1_german1_ci"] = "latin1_german1_ci";
    //German (phone book), case-insensitive
    Collation["latin1_german2_ci"] = "latin1_german2_ci";
    //Spanish, case-insensitive
    Collation["latin1_spanish_ci"] = "latin1_spanish_ci";
    //Swedish, case-insensitive
    Collation["latin1_swedish_ci"] = "latin1_swedish_ci";
    //Central European (multilingual), Binary
    Collation["latin2_bin"] = "latin2_bin";
    //Croatian, case-insensitive
    Collation["latin2_croatian_ci"] = "latin2_croatian_ci";
    //Czech, case-sensitive
    Collation["latin2_czech_cs"] = "latin2_czech_cs";
    //Central European (multilingual), case-insensitive
    Collation["latin2_general_ci"] = "latin2_general_ci";
    //Hungarian, case-insensitive
    Collation["latin2_hungarian_ci"] = "latin2_hungarian_ci";
    //Turkish, Binary
    Collation["latin5_bin"] = "latin5_bin";
    //Turkish, case-insensitive
    Collation["latin5_turkish_ci"] = "latin5_turkish_ci";
    //Baltic (multilingual), Binary
    Collation["latin7_bin"] = "latin7_bin";
    //Estonian, case-sensitive
    Collation["latin7_estonian_cs"] = "latin7_estonian_cs";
    //Baltic (multilingual), case-insensitive
    Collation["latin7_general_ci"] = "latin7_general_ci";
    //Baltic (multilingual), case-sensitive
    Collation["latin7_general_cs"] = "latin7_general_cs";
    //Central European (multilingual), Binary
    Collation["macce_bin"] = "macce_bin";
    //Central European (multilingual), case-insensitive
    Collation["macce_general_ci"] = "macce_general_ci";
    //West European (multilingual), Binary
    Collation["macroman_bin"] = "macroman_bin";
    //West European (multilingual), case-insensitive
    Collation["macroman_general_ci"] = "macroman_general_ci";
    //Japanese, Binary
    Collation["sjis_bin"] = "sjis_bin";
    //Japanese, case-insensitive
    Collation["sjis_japanese_ci"] = "sjis_japanese_ci";
    //Swedish, Binary
    Collation["swe7_bin"] = "swe7_bin";
    //Swedish, case-insensitive
    Collation["swe7_swedish_ci"] = "swe7_swedish_ci";
    //Thai, Binary
    Collation["tis620_bin"] = "tis620_bin";
    //Thai, case-insensitive
    Collation["tis620_thai_ci"] = "tis620_thai_ci";
    //Unicode (multilingual), Binary
    Collation["ucs2_bin"] = "ucs2_bin";
    //Croatian, case-insensitive
    Collation["ucs2_croatian_ci"] = "ucs2_croatian_ci";
    //Czech, case-insensitive
    Collation["ucs2_czech_ci"] = "ucs2_czech_ci";
    //Danish, case-insensitive
    Collation["ucs2_danish_ci"] = "ucs2_danish_ci";
    //Esperanto, case-insensitive
    Collation["ucs2_esperanto_ci"] = "ucs2_esperanto_ci";
    //Estonian, case-insensitive
    Collation["ucs2_estonian_ci"] = "ucs2_estonian_ci";
    //Unicode (multilingual), case-insensitive
    Collation["ucs2_general_ci"] = "ucs2_general_ci";
    //Unicode (multilingual)
    Collation["ucs2_general_mysql500_ci"] = "ucs2_general_mysql500_ci";
    //German (phone book), case-insensitive
    Collation["ucs2_german2_ci"] = "ucs2_german2_ci";
    //Hungarian, case-insensitive
    Collation["ucs2_hungarian_ci"] = "ucs2_hungarian_ci";
    //Icelandic, case-insensitive
    Collation["ucs2_icelandic_ci"] = "ucs2_icelandic_ci";
    //Latvian, case-insensitive
    Collation["ucs2_latvian_ci"] = "ucs2_latvian_ci";
    //Lithuanian, case-insensitive
    Collation["ucs2_lithuanian_ci"] = "ucs2_lithuanian_ci";
    //Persian, case-insensitive
    Collation["ucs2_persian_ci"] = "ucs2_persian_ci";
    //Polish, case-insensitive
    Collation["ucs2_polish_ci"] = "ucs2_polish_ci";
    //West European, case-insensitive
    Collation["ucs2_roman_ci"] = "ucs2_roman_ci";
    //Romanian, case-insensitive
    Collation["ucs2_romanian_ci"] = "ucs2_romanian_ci";
    //Sinhalese, case-insensitive
    Collation["ucs2_sinhala_ci"] = "ucs2_sinhala_ci";
    //Slovak, case-insensitive
    Collation["ucs2_slovak_ci"] = "ucs2_slovak_ci";
    //Slovenian, case-insensitive
    Collation["ucs2_slovenian_ci"] = "ucs2_slovenian_ci";
    //Traditional Spanish, case-insensitive
    Collation["ucs2_spanish2_ci"] = "ucs2_spanish2_ci";
    //Spanish, case-insensitive
    Collation["ucs2_spanish_ci"] = "ucs2_spanish_ci";
    //Swedish, case-insensitive
    Collation["ucs2_swedish_ci"] = "ucs2_swedish_ci";
    //Turkish, case-insensitive
    Collation["ucs2_turkish_ci"] = "ucs2_turkish_ci";
    //Unicode (multilingual)
    Collation["ucs2_unicode_520_ci"] = "ucs2_unicode_520_ci";
    //Unicode (multilingual), case-insensitive
    Collation["ucs2_unicode_ci"] = "ucs2_unicode_ci";
    //Vietnamese, case-insensitive
    Collation["ucs2_vietnamese_ci"] = "ucs2_vietnamese_ci";
    //Japanese, Binary
    Collation["ujis_bin"] = "ujis_bin";
    //Japanese, case-insensitive
    Collation["ujis_japanese_ci"] = "ujis_japanese_ci";
    //unknown, Binary
    Collation["utf16_bin"] = "utf16_bin";
    //Croatian, case-insensitive
    Collation["utf16_croatian_ci"] = "utf16_croatian_ci";
    //Czech, case-insensitive
    Collation["utf16_czech_ci"] = "utf16_czech_ci";
    //Danish, case-insensitive
    Collation["utf16_danish_ci"] = "utf16_danish_ci";
    //Esperanto, case-insensitive
    Collation["utf16_esperanto_ci"] = "utf16_esperanto_ci";
    //Estonian, case-insensitive
    Collation["utf16_estonian_ci"] = "utf16_estonian_ci";
    //unknown, case-insensitive
    Collation["utf16_general_ci"] = "utf16_general_ci";
    //German (phone book), case-insensitive
    Collation["utf16_german2_ci"] = "utf16_german2_ci";
    //Hungarian, case-insensitive
    Collation["utf16_hungarian_ci"] = "utf16_hungarian_ci";
    //Icelandic, case-insensitive
    Collation["utf16_icelandic_ci"] = "utf16_icelandic_ci";
    //Latvian, case-insensitive
    Collation["utf16_latvian_ci"] = "utf16_latvian_ci";
    //Lithuanian, case-insensitive
    Collation["utf16_lithuanian_ci"] = "utf16_lithuanian_ci";
    //Persian, case-insensitive
    Collation["utf16_persian_ci"] = "utf16_persian_ci";
    //Polish, case-insensitive
    Collation["utf16_polish_ci"] = "utf16_polish_ci";
    //West European, case-insensitive
    Collation["utf16_roman_ci"] = "utf16_roman_ci";
    //Romanian, case-insensitive
    Collation["utf16_romanian_ci"] = "utf16_romanian_ci";
    //Sinhalese, case-insensitive
    Collation["utf16_sinhala_ci"] = "utf16_sinhala_ci";
    //Slovak, case-insensitive
    Collation["utf16_slovak_ci"] = "utf16_slovak_ci";
    //Slovenian, case-insensitive
    Collation["utf16_slovenian_ci"] = "utf16_slovenian_ci";
    //Traditional Spanish, case-insensitive
    Collation["utf16_spanish2_ci"] = "utf16_spanish2_ci";
    //Spanish, case-insensitive
    Collation["utf16_spanish_ci"] = "utf16_spanish_ci";
    //Swedish, case-insensitive
    Collation["utf16_swedish_ci"] = "utf16_swedish_ci";
    //Turkish, case-insensitive
    Collation["utf16_turkish_ci"] = "utf16_turkish_ci";
    //Unicode (multilingual)
    Collation["utf16_unicode_520_ci"] = "utf16_unicode_520_ci";
    //Unicode (multilingual), case-insensitive
    Collation["utf16_unicode_ci"] = "utf16_unicode_ci";
    //Vietnamese, case-insensitive
    Collation["utf16_vietnamese_ci"] = "utf16_vietnamese_ci";
    //unknown, Binary
    Collation["utf16le_bin"] = "utf16le_bin";
    //unknown, case-insensitive
    Collation["utf16le_general_ci"] = "utf16le_general_ci";
    //unknown, Binary
    Collation["utf32_bin"] = "utf32_bin";
    //Croatian, case-insensitive
    Collation["utf32_croatian_ci"] = "utf32_croatian_ci";
    //Czech, case-insensitive
    Collation["utf32_czech_ci"] = "utf32_czech_ci";
    //Danish, case-insensitive
    Collation["utf32_danish_ci"] = "utf32_danish_ci";
    //Esperanto, case-insensitive
    Collation["utf32_esperanto_ci"] = "utf32_esperanto_ci";
    //Estonian, case-insensitive
    Collation["utf32_estonian_ci"] = "utf32_estonian_ci";
    //unknown, case-insensitive
    Collation["utf32_general_ci"] = "utf32_general_ci";
    //German (phone book), case-insensitive
    Collation["utf32_german2_ci"] = "utf32_german2_ci";
    //Hungarian, case-insensitive
    Collation["utf32_hungarian_ci"] = "utf32_hungarian_ci";
    //Icelandic, case-insensitive
    Collation["utf32_icelandic_ci"] = "utf32_icelandic_ci";
    //Latvian, case-insensitive
    Collation["utf32_latvian_ci"] = "utf32_latvian_ci";
    //Lithuanian, case-insensitive
    Collation["utf32_lithuanian_ci"] = "utf32_lithuanian_ci";
    //Persian, case-insensitive
    Collation["utf32_persian_ci"] = "utf32_persian_ci";
    //Polish, case-insensitive
    Collation["utf32_polish_ci"] = "utf32_polish_ci";
    //West European, case-insensitive
    Collation["utf32_roman_ci"] = "utf32_roman_ci";
    //Romanian, case-insensitive
    Collation["utf32_romanian_ci"] = "utf32_romanian_ci";
    //Sinhalese, case-insensitive
    Collation["utf32_sinhala_ci"] = "utf32_sinhala_ci";
    //Slovak, case-insensitive
    Collation["utf32_slovak_ci"] = "utf32_slovak_ci";
    //Slovenian, case-insensitive
    Collation["utf32_slovenian_ci"] = "utf32_slovenian_ci";
    //Traditional Spanish, case-insensitive
    Collation["utf32_spanish2_ci"] = "utf32_spanish2_ci";
    //Spanish, case-insensitive
    Collation["utf32_spanish_ci"] = "utf32_spanish_ci";
    //Swedish, case-insensitive
    Collation["utf32_swedish_ci"] = "utf32_swedish_ci";
    //Turkish, case-insensitive
    Collation["utf32_turkish_ci"] = "utf32_turkish_ci";
    //Unicode (multilingual)
    Collation["utf32_unicode_520_ci"] = "utf32_unicode_520_ci";
    //Unicode (multilingual), case-insensitive
    Collation["utf32_unicode_ci"] = "utf32_unicode_ci";
    //Vietnamese, case-insensitive
    Collation["utf32_vietnamese_ci"] = "utf32_vietnamese_ci";
    //Unicode (multilingual), Binary
    Collation["utf8_bin"] = "utf8_bin";
    //Croatian, case-insensitive
    Collation["utf8_croatian_ci"] = "utf8_croatian_ci";
    //Czech, case-insensitive
    Collation["utf8_czech_ci"] = "utf8_czech_ci";
    //Danish, case-insensitive
    Collation["utf8_danish_ci"] = "utf8_danish_ci";
    //Esperanto, case-insensitive
    Collation["utf8_esperanto_ci"] = "utf8_esperanto_ci";
    //Estonian, case-insensitive
    Collation["utf8_estonian_ci"] = "utf8_estonian_ci";
    //Unicode (multilingual), case-insensitive
    Collation["utf8_general_ci"] = "utf8_general_ci";
    //Unicode (multilingual)
    Collation["utf8_general_mysql500_ci"] = "utf8_general_mysql500_ci";
    //German (phone book), case-insensitive
    Collation["utf8_german2_ci"] = "utf8_german2_ci";
    //Hungarian, case-insensitive
    Collation["utf8_hungarian_ci"] = "utf8_hungarian_ci";
    //Icelandic, case-insensitive
    Collation["utf8_icelandic_ci"] = "utf8_icelandic_ci";
    //Latvian, case-insensitive
    Collation["utf8_latvian_ci"] = "utf8_latvian_ci";
    //Lithuanian, case-insensitive
    Collation["utf8_lithuanian_ci"] = "utf8_lithuanian_ci";
    //Persian, case-insensitive
    Collation["utf8_persian_ci"] = "utf8_persian_ci";
    //Polish, case-insensitive
    Collation["utf8_polish_ci"] = "utf8_polish_ci";
    //West European, case-insensitive
    Collation["utf8_roman_ci"] = "utf8_roman_ci";
    //Romanian, case-insensitive
    Collation["utf8_romanian_ci"] = "utf8_romanian_ci";
    //Sinhalese, case-insensitive
    Collation["utf8_sinhala_ci"] = "utf8_sinhala_ci";
    //Slovak, case-insensitive
    Collation["utf8_slovak_ci"] = "utf8_slovak_ci";
    //Slovenian, case-insensitive
    Collation["utf8_slovenian_ci"] = "utf8_slovenian_ci";
    //Traditional Spanish, case-insensitive
    Collation["utf8_spanish2_ci"] = "utf8_spanish2_ci";
    //Spanish, case-insensitive
    Collation["utf8_spanish_ci"] = "utf8_spanish_ci";
    //Swedish, case-insensitive
    Collation["utf8_swedish_ci"] = "utf8_swedish_ci";
    //Turkish, case-insensitive
    Collation["utf8_turkish_ci"] = "utf8_turkish_ci";
    //Unicode (multilingual)
    Collation["utf8_unicode_520_ci"] = "utf8_unicode_520_ci";
    //Unicode (multilingual), case-insensitive
    Collation["utf8_unicode_ci"] = "utf8_unicode_ci";
    //Vietnamese, case-insensitive
    Collation["utf8_vietnamese_ci"] = "utf8_vietnamese_ci";
    //Unicode (multilingual), Binary
    Collation["utf8mb4_bin"] = "utf8mb4_bin";
    //Croatian, case-insensitive
    Collation["utf8mb4_croatian_ci"] = "utf8mb4_croatian_ci";
    //Czech, case-insensitive
    Collation["utf8mb4_czech_ci"] = "utf8mb4_czech_ci";
    //Danish, case-insensitive
    Collation["utf8mb4_danish_ci"] = "utf8mb4_danish_ci";
    //Esperanto, case-insensitive
    Collation["utf8mb4_esperanto_ci"] = "utf8mb4_esperanto_ci";
    //Estonian, case-insensitive
    Collation["utf8mb4_estonian_ci"] = "utf8mb4_estonian_ci";
    //Unicode (multilingual), case-insensitive
    Collation["utf8mb4_general_ci"] = "utf8mb4_general_ci";
    //German (phone book), case-insensitive
    Collation["utf8mb4_german2_ci"] = "utf8mb4_german2_ci";
    //Hungarian, case-insensitive
    Collation["utf8mb4_hungarian_ci"] = "utf8mb4_hungarian_ci";
    //Icelandic, case-insensitive
    Collation["utf8mb4_icelandic_ci"] = "utf8mb4_icelandic_ci";
    //Latvian, case-insensitive
    Collation["utf8mb4_latvian_ci"] = "utf8mb4_latvian_ci";
    //Lithuanian, case-insensitive
    Collation["utf8mb4_lithuanian_ci"] = "utf8mb4_lithuanian_ci";
    //Persian, case-insensitive
    Collation["utf8mb4_persian_ci"] = "utf8mb4_persian_ci";
    //Polish, case-insensitive
    Collation["utf8mb4_polish_ci"] = "utf8mb4_polish_ci";
    //West European, case-insensitive
    Collation["utf8mb4_roman_ci"] = "utf8mb4_roman_ci";
    //Romanian, case-insensitive
    Collation["utf8mb4_romanian_ci"] = "utf8mb4_romanian_ci";
    //Sinhalese, case-insensitive
    Collation["utf8mb4_sinhala_ci"] = "utf8mb4_sinhala_ci";
    //Slovak, case-insensitive
    Collation["utf8mb4_slovak_ci"] = "utf8mb4_slovak_ci";
    //Slovenian, case-insensitive
    Collation["utf8mb4_slovenian_ci"] = "utf8mb4_slovenian_ci";
    //Traditional Spanish, case-insensitive
    Collation["utf8mb4_spanish2_ci"] = "utf8mb4_spanish2_ci";
    //Spanish, case-insensitive
    Collation["utf8mb4_spanish_ci"] = "utf8mb4_spanish_ci";
    //Swedish, case-insensitive
    Collation["utf8mb4_swedish_ci"] = "utf8mb4_swedish_ci";
    //Turkish, case-insensitive
    Collation["utf8mb4_turkish_ci"] = "utf8mb4_turkish_ci";
    //Unicode (multilingual)
    Collation["utf8mb4_unicode_520_ci"] = "utf8mb4_unicode_520_ci";
    //Unicode (multilingual), case-insensitive
    Collation["utf8mb4_unicode_ci"] = "utf8mb4_unicode_ci";
    //Vietnamese, case-insensitive
    Collation["utf8mb4_vietnamese_ci"] = "utf8mb4_vietnamese_ci";
})(Collation = exports.Collation || (exports.Collation = {}));
//# sourceMappingURL=collation.js.map