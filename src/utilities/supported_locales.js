import arEG from 'antd/lib/locale-provider/ar_EG';
import deDE from 'antd/lib/locale-provider/de_DE';
import enUS from 'antd/lib/locale-provider/en_US';
import esES from 'antd/lib/locale-provider/es_ES';
import frFR from 'antd/lib/locale-provider/fr_FR';
import hiIN from 'antd/lib/locale-provider/hi_IN';
// import zhCN from 'antd/lib/locale-provider/ki_KE';
// import zhCN from 'antd/lib/locale-provider/lg_UG';
// import zhCN from 'antd/lib/locale-provider/so_SO';
import enGB from 'antd/lib/locale-provider/en_GB';
import zhCN from 'antd/lib/locale-provider/zh_CN';

export const defaultLanguageIndex = 2; // English
export const supported_languages = [
  {
    code: 'ar',
    name: 'عربى',
    flag: '🇦🇪|🇪🇬',
    antdLocale: arEG,
    textDirection: 'rtl',
  },
  {
    code: 'de',
    name: 'Deutsche',
    flag: '🇩🇪',
    antdLocale: deDE,
    textDirection: 'ltr',
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸|🇬🇧',
    antdLocale: enUS,
    textDirection: 'ltr',
  },
  {
    code: 'es',
    name: 'Española',
    flag: '🇪🇸',
    antdLocale: esES,
    textDirection: 'ltr',
  },
  {
    code: 'fr',
    name: 'Française',
    flag: '🇫🇷',
    antdLocale: frFR,
    textDirection: 'ltr',
  },
  {
    code: 'hi',
    name: 'हिन्दी',
    flag: '🇮🇳',
    antdLocale: hiIN,
    textDirection: 'ltr',
  },
  {
    code: 'ki',
    name: 'Gîkûyû',
    flag: '🇰🇪',
    antdLocale: enGB,
    textDirection: 'ltr',
  },
  {
    code: 'lg',
    name: 'Luganda',
    flag: '🇺🇬',
    antdLocale: enGB,
    textDirection: 'ltr',
  },
  {
    code: 'so',
    name: 'Somali',
    flag: '🇸🇴',
    antdLocale: enGB,
    textDirection: 'ltr',
  },
  {
    code: 'sw',
    name: 'Kiswahili',
    flag: '🇰🇪|🇹🇿',
    antdLocale: enGB,
    textDirection: 'ltr',
  },
  {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    antdLocale: zhCN,
    textDirection: 'ltr',
  },
];