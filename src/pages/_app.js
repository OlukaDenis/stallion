import React from 'react'
import App from 'next/app'
import { appWithTranslation } from '../utilities/i18n'
import { wrapper } from '../state/store';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Spin } from 'antd';

const MyApp = ({ Component, pageProps }) => {
  
    
  if (typeof window !== 'undefined') {
    require('../public/static/js/modernizr-custom');
 
    document.documentElement.classList.remove('no-js');

    Modernizr.on('webp', function (result) {
      if (result) {
        // webp format supported
        // document.documentElement.classList.remove('no-webp');
      } else {
        // not-supported
        // document.documentElement.classList.remove('webp');
      }
    });
  }

    const store = useStore((state) => state);

    return (
      <PersistGate
        persistor={store.__persistor}
        loading={
          <div className="center-spinner spinner-vertical-margin ">
            <Spin spinning={true}></Spin>
          </div>
        }
      >
        <Component {...pageProps} />
        <style global jsx>
          {`
            html {
              width: 100%;
              height: 100%;
            }
            body,
            #__next {
              width: 100%;
              height: 100%;
            }
            .center-spinner {
              text-align: center;
            }
            .spinner-vertical-margin {
              margin-top: 150px;
            }
            .site-header {
              text-align: center;
            }

            .site-footer {
              padding: 5px 10px;
              bottom: 0;
            }

            .site-header-light,
            .site-footer-light {
              background-color: #fff;
            }

            // .site-header-dark,
            // .site-footer-dark {
            //   background-color: #001529;
            // }

            .site-footer-dark {
              color: #ddd;
            }

            .min-full-height {
              min-height: 100%;
            }

            .vertical-center-div {
              height: 100%;
              padding: 0;
              margin: 0;
              list-style: none;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .site-header .trigger-light,
            .site-header .trigger-dark {
              font-size: 32px;
              line-height: 64px;
              padding: 0 24px;
              cursor: pointer;
              transition: color 0.3s;
              float: right;
            }

            .site-header .trigger-light {
              color: #001529;
            }

            .site-header .trigger-dark {
              color: white;
            }

            .site-header .trigger-light:hover {
              color: #009a44;
            }

            .site-header .trigger-dark:hover {
              color: #009a44;
            }

            .theme-mode-switch {
              font-weight: 600;
              font-size: 30px;
              line-height: 1.35;
            }

            .theme-mode-switch-in-sider {
              display: none;
            }

            .white-text {
              color: white;
            }

            .off-white-text {
              color: rgba(255, 255, 255, 0.85);
            }

            .back-top-bg {
              background-color: rgb(64, 64, 64);
            }

            .vertical-divider-margin {
              margin: 0 15px;
            }

            .site-header-logo {
              height: 72px;
              width: auto;
              float: left;
              padding-left: 30px;
            }

            .menu-header-logo {
              max-width: 100%;
              height: auto;
            }

            .custom-icon-image {
              height: 1em;
              width: 1em;
              min-width: 14px;
              margin-right: 10px;
            }

            .badge-icon > .ant-badge-count {
              background-color: #1fa4d1;
              height: 16px;
              min-width: 16px;
              padding: 0 4px;
              font-size: 10px;
              line-height: 16px;
              border-radius: 8px;
            }

            .menu-badge-icon {
              font-size: 32px;
            }

            .ant-menu-vertical .badge-icon .ant-badge-count {
              transform: translate(50%, -80%);
            }

            .ant-menu-inline-collapsed .badge-icon .ant-badge-count {
              transform: translate(50%, -18%);
            }

            .no-margin {
              margin: 0px 0;
            }

            .fill-screen {
              min-height: 100%;
            }

            .bottom-padded-menu {
              padding-bottom: 100px;
            }

            .small-margin-h-divider {
              margin: 2px 0;
            }

            .input-element-v-margin {
              margin: 3px 0;
            }

            .small-margin-v-divider {
              margin: 0 2px;
            }

            .right-align-text {
              text-align: right;
            }

            .float-right {
              float: right;
            }

            .float-left {
              float: left;
            }

            @media only screen and (max-width: 960px) {
              .site-header-logo {
                padding-left: 10px;
              }
            }

            @media only screen and (max-width: 720px) {
              .site-header {
                position: static;
                min-width: 100%;
              }

              .theme-mode-switch {
                font-weight: 500;
                font-size: 26px;
                line-height: 1.8;
              }
            }

            @media only screen and (max-width: 575px) {
              .floating-side-menu {
                overflow: auto;
                overflow-y: scroll;
                height: 100vh;
                position: fixed;
                right: 0;
              }
            }

            @media only screen and (max-width: 637px) {
              .theme-mode-switch {
                line-height: 1.4;
              }
            }

            @media only screen and (max-width: 487px) {
              .theme-mode-switch {
                font-weight: 400;
                font-size: 20px;
                line-height: 1.6;
              }
            }

            @media only screen and (max-width: 400px) {
              .theme-mode-switch {
                display: none;
              }
              .theme-mode-switch-in-sider {
                width: 100%;
                display: block;
                text-align: center;
                margin-top: 5px;
                margin-bottom: 5px;
              }
            }
            /* INDEX-PAGE::START */
            .webp .top-section {
              background-image: url(/images/webp/hero_img_rect.webp);
            }
            .no-webp .top-section,
            .no-js .top-section {
              background-image: url(/images/hero_img_rect.jpg);
            }
            @media only screen and (max-width: 960px) {
              .webp .top-section {
                background-image: url(/images/webp/hero_img.webp);
              }
              .no-webp .top-section,
              .no-js .top-section {
                background-image: url(/images/hero_img.jpg);
              }
            }
            .location-option {
              padding: 5px 0;
              border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            }
            /* INDEX-PAGE::END */
          `}
        </style>
      </PersistGate>
    );
}

MyApp.getInitialProps = async (appContext) => ({ ...(await App.getInitialProps(appContext)) });

export default wrapper.withRedux(appWithTranslation(MyApp));