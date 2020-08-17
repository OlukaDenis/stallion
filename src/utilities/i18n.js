const NextI18Next = require('next-i18next').default;

const localeSubpaths = {
  ar: 'ar',
  de: 'de',
  en: 'en',
  es: 'es',
  fr: 'fr',
  hi: 'hi',
  ki: 'ki',
  lg: 'lg',
  so: 'so',
  sw: 'sw',
  zh: 'zh',
};
  

const path = require('path');

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['ar', 'de', 'es', 'fr', 'hi', 'ki', 'lg', 'so', 'sw', 'zh'],
  localePath:
    typeof window === 'undefined'
      ? path.resolve('./src/public/static/locales')
      : path.resolve('./public/static/locales'),
  localeSubpaths,
  // shallowRender: true,
});
