/* eslint-disable */
const withLess = require('@zeit/next-less');
const withPWA = process.env.NODE_ENV === 'production' ? require('next-pwa') : (arg) => arg;
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const { nextI18NextRewrites } = require('next-i18next/rewrites');
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
  }

// Where your antd-custom.less file lives
const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8'));

module.exports = withPWA(
  withLess({
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    publicRuntimeConfig: {
      localeSubpaths,
    },
    pwa: {
      dest: 'public',
    },
    distDir: '../.next',
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables, // make your antd custom effective
      localIdentName: '[local]___[hash:base64:5]',
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        });
      }

      return config;
    },
  })
);
