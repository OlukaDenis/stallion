
import deDE from 'antd/lib/locale-provider/de_DE';
import enUS from 'antd/lib/locale-provider/en_US';
import esES from 'antd/lib/locale-provider/es_ES';
import frFR from 'antd/lib/locale-provider/fr_FR';
import zhCN from 'antd/lib/locale-provider/zh_CN';

export const defaultLanguageIndex = 1; // English
export const supported_languages = [
  // {
  //   code: 'de',
  //   name: 'Deutsche',
  //   flag: '🇩🇪',
  //   antdLocale: deDE,
  //   textDirection: 'ltr',
  // },
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
  // {
  //   code: 'fr',
  //   name: 'Française',
  //   flag: '🇫🇷',
  //   antdLocale: frFR,
  //   textDirection: 'ltr',
  // },
  // {
  //   code: 'zh',
  //   name: '中文',
  //   flag: '🇨🇳',
  //   antdLocale: zhCN,
  //   textDirection: 'ltr',
  // },
];