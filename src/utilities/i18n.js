const NextI18Next = require('next-i18next').default;

const localeSubpaths = {
  de: 'de',
  en: 'en',
  es: 'es',
  fr: 'fr',
  zh: 'zh',
};
  

const path = require('path');

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['de', 'es', 'fr', 'zh'],
  localePath:
    typeof window === 'undefined'
      ? path.resolve('./src/public/static/locales')
      : path.resolve('./public/static/locales'),
  localeSubpaths,
  // shallowRender: true,
});
