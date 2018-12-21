"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://dev.mysql.com/doc/refman/8.0/en/locale-support.html
var Locale;
(function (Locale) {
    //Arabic - United Arab Emirates
    Locale["ar_AE"] = "ar_AE";
    //Arabic - Bahrain
    Locale["ar_BH"] = "ar_BH";
    //Arabic - Algeria
    Locale["ar_DZ"] = "ar_DZ";
    //Arabic - Egypt
    Locale["ar_EG"] = "ar_EG";
    //Arabic - India
    Locale["ar_IN"] = "ar_IN";
    //Arabic - Iraq
    Locale["ar_IQ"] = "ar_IQ";
    //Arabic - Jordan
    Locale["ar_JO"] = "ar_JO";
    //Arabic - Kuwait
    Locale["ar_KW"] = "ar_KW";
    //Arabic - Lebanon
    Locale["ar_LB"] = "ar_LB";
    //Arabic - Libya
    Locale["ar_LY"] = "ar_LY";
    //Arabic - Morocco
    Locale["ar_MA"] = "ar_MA";
    //Arabic - Oman
    Locale["ar_OM"] = "ar_OM";
    //Arabic - Qatar
    Locale["ar_QA"] = "ar_QA";
    //Arabic - Saudi Arabia
    Locale["ar_SA"] = "ar_SA";
    //Arabic - Sudan
    Locale["ar_SD"] = "ar_SD";
    //Arabic - Syria
    Locale["ar_SY"] = "ar_SY";
    //Arabic - Tunisia
    Locale["ar_TN"] = "ar_TN";
    //Arabic - Yemen
    Locale["ar_YE"] = "ar_YE";
    //Belarusian - Belarus
    Locale["be_BY"] = "be_BY";
    //Bulgarian - Bulgaria
    Locale["bg_BG"] = "bg_BG";
    //Catalan - Spain
    Locale["ca_ES"] = "ca_ES";
    //Czech - Czech Republic
    Locale["cs_CZ"] = "cs_CZ";
    //Danish - Denmark
    Locale["da_DK"] = "da_DK";
    //German - Austria
    Locale["de_AT"] = "de_AT";
    //German - Belgium
    Locale["de_BE"] = "de_BE";
    //German - Switzerland
    Locale["de_CH"] = "de_CH";
    //German - Germany
    Locale["de_DE"] = "de_DE";
    //German - Luxembourg
    Locale["de_LU"] = "de_LU";
    //Greek - Greece
    Locale["el_GR"] = "el_GR";
    //English - Australia
    Locale["en_AU"] = "en_AU";
    //English - Canada
    Locale["en_CA"] = "en_CA";
    //English - United Kingdom
    Locale["en_GB"] = "en_GB";
    //English - India
    Locale["en_IN"] = "en_IN";
    //English - New Zealand
    Locale["en_NZ"] = "en_NZ";
    //English - Philippines
    Locale["en_PH"] = "en_PH";
    //English - United States
    Locale["en_US"] = "en_US";
    //English - South Africa
    Locale["en_ZA"] = "en_ZA";
    //English - Zimbabwe
    Locale["en_ZW"] = "en_ZW";
    //Spanish - Argentina
    Locale["es_AR"] = "es_AR";
    //Spanish - Bolivia
    Locale["es_BO"] = "es_BO";
    //Spanish - Chile
    Locale["es_CL"] = "es_CL";
    //Spanish - Colombia
    Locale["es_CO"] = "es_CO";
    //Spanish - Costa Rica
    Locale["es_CR"] = "es_CR";
    //Spanish - Dominican Republic
    Locale["es_DO"] = "es_DO";
    //Spanish - Ecuador
    Locale["es_EC"] = "es_EC";
    //Spanish - Spain
    Locale["es_ES"] = "es_ES";
    //Spanish - Guatemala
    Locale["es_GT"] = "es_GT";
    //Spanish - Honduras
    Locale["es_HN"] = "es_HN";
    //Spanish - Mexico
    Locale["es_MX"] = "es_MX";
    //Spanish - Nicaragua
    Locale["es_NI"] = "es_NI";
    //Spanish - Panama
    Locale["es_PA"] = "es_PA";
    //Spanish - Peru
    Locale["es_PE"] = "es_PE";
    //Spanish - Puerto Rico
    Locale["es_PR"] = "es_PR";
    //Spanish - Paraguay
    Locale["es_PY"] = "es_PY";
    //Spanish - El Salvador
    Locale["es_SV"] = "es_SV";
    //Spanish - United States
    Locale["es_US"] = "es_US";
    //Spanish - Uruguay
    Locale["es_UY"] = "es_UY";
    //Spanish - Venezuela
    Locale["es_VE"] = "es_VE";
    //Estonian - Estonia
    Locale["et_EE"] = "et_EE";
    //Basque - Basque
    Locale["eu_ES"] = "eu_ES";
    //Finnish - Finland
    Locale["fi_FI"] = "fi_FI";
    //Faroese - Faroe Islands
    Locale["fo_FO"] = "fo_FO";
    //French - Belgium
    Locale["fr_BE"] = "fr_BE";
    //French - Canada
    Locale["fr_CA"] = "fr_CA";
    //French - Switzerland
    Locale["fr_CH"] = "fr_CH";
    //French - France
    Locale["fr_FR"] = "fr_FR";
    //French - Luxembourg
    Locale["fr_LU"] = "fr_LU";
    //Galician - Spain
    Locale["gl_ES"] = "gl_ES";
    //Gujarati - India
    Locale["gu_IN"] = "gu_IN";
    //Hebrew - Israel
    Locale["he_IL"] = "he_IL";
    //Hindi - India
    Locale["hi_IN"] = "hi_IN";
    //Croatian - Croatia
    Locale["hr_HR"] = "hr_HR";
    //Hungarian - Hungary
    Locale["hu_HU"] = "hu_HU";
    //Indonesian - Indonesia
    Locale["id_ID"] = "id_ID";
    //Icelandic - Iceland
    Locale["is_IS"] = "is_IS";
    //Italian - Switzerland
    Locale["it_CH"] = "it_CH";
    //Italian - Italy
    Locale["it_IT"] = "it_IT";
    //Japanese - Japan
    Locale["ja_JP"] = "ja_JP";
    //Korean - Republic of Korea
    Locale["ko_KR"] = "ko_KR";
    //Lithuanian - Lithuania
    Locale["lt_LT"] = "lt_LT";
    //Latvian - Latvia
    Locale["lv_LV"] = "lv_LV";
    //Macedonian - FYROM
    Locale["mk_MK"] = "mk_MK";
    //Mongolia - Mongolian
    Locale["mn_MN"] = "mn_MN";
    //Malay - Malaysia
    Locale["ms_MY"] = "ms_MY";
    //Norwegian(Bokmål) - Norway
    Locale["nb_NO"] = "nb_NO";
    //Dutch - Belgium
    Locale["nl_BE"] = "nl_BE";
    //Dutch - The Netherlands
    Locale["nl_NL"] = "nl_NL";
    //Norwegian - Norway
    Locale["no_NO"] = "no_NO";
    //Polish - Poland
    Locale["pl_PL"] = "pl_PL";
    //Portugese - Brazil
    Locale["pt_BR"] = "pt_BR";
    //Portugese - Portugal
    Locale["pt_PT"] = "pt_PT";
    //Romansh - Switzerland
    Locale["rm_CH"] = "rm_CH";
    //Romanian - Romania
    Locale["ro_RO"] = "ro_RO";
    //Russian - Russia
    Locale["ru_RU"] = "ru_RU";
    //Russian - Ukraine
    Locale["ru_UA"] = "ru_UA";
    //Slovak - Slovakia
    Locale["sk_SK"] = "sk_SK";
    //Slovenian - Slovenia
    Locale["sl_SI"] = "sl_SI";
    //Albanian - Albania
    Locale["sq_AL"] = "sq_AL";
    //Serbian - Yugoslavia
    Locale["sr_RS"] = "sr_RS";
    //Swedish - Finland
    Locale["sv_FI"] = "sv_FI";
    //Swedish - Sweden
    Locale["sv_SE"] = "sv_SE";
    //Tamil - India
    Locale["ta_IN"] = "ta_IN";
    //Telugu - India
    Locale["te_IN"] = "te_IN";
    //Thai - Thailand
    Locale["th_TH"] = "th_TH";
    //Turkish - Turkey
    Locale["tr_TR"] = "tr_TR";
    //Ukrainian - Ukraine
    Locale["uk_UA"] = "uk_UA";
    //Urdu - Pakistan
    Locale["ur_PK"] = "ur_PK";
    //Vietnamese - Viet Nam
    Locale["vi_VN"] = "vi_VN";
    //Chinese - China
    Locale["zh_CN"] = "zh_CN";
    //Chinese - Hong Kong
    Locale["zh_HK"] = "zh_HK";
    //Chinese - Taiwan Province of China
    Locale["zh_TW"] = "zh_TW";
})(Locale = exports.Locale || (exports.Locale = {}));
//# sourceMappingURL=locale.js.map