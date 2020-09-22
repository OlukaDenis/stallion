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
              bottom: 0;
            }

            .site-header-light,
            .site-footer-light {
              background-color: #fff;
            }

            .main-content-section {
              padding-top: 20px;
            }

            @media only screen and (max-width: 960px) {
              padding-top: 10px;
            }

            .site-footer-dark {
              color: #ddd;
            }

            .site-footer-dark .footer-item .footer-heading {
              color: #f86942;
              border-bottom: 1px solid #888;
            }
            .footer-item {
              padding: 10px 20px 10px 50px;
            }

            .footer-item ul {
              list-style: none;
              padding: 0;
            }

            .footer-item ul li {
              padding: 4px 0;
            }

            .footer-item ul li a {
              color: #555;
            }

            .site-footer-dark .footer-item ul li a {
              color: #ccc;
            }

            .footer-item ul li a:hover {
              color: #f86942;
            }

            .footer-heading {
              font-weight: 800;
              border-bottom: 1px solid #ddd;
              padding-bottom: 4px;
              margin-right: 40px;
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

            .medium-margin-h-divider {
              margin: 5px 0;
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
              .ant-steps-label-vertical .ant-steps-item-content {
                width: 92px;
              }
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
            @media only screen and (max-width: 300px) {
              .ant-steps-label-vertical .ant-steps-item-content {
                width: 78px;
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

            /* QUOTATION-COMPONENTS::START */
            .quotation {
              z-index: 3;
              right: 0;
              padding-bottom: 3px;
              border: 2px solid #fff;
              box-shadow: 0 0 0 0.5rem rgba(0, 0, 0, 0.4);
              background: #fff;
            }

            .quotation_header {
              text-align: center;
              width: 100%;
              padding-top: 1.2rem;
              padding-bottom: 1.2rem;
              background-color: #f63e0c;
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABMAgMAAAC358n/AAAACVBMVEX///9HcEz///9EorLRAAAAA3RSTlMaAA4Mf89/AAABQElEQVQ4y3WUMVLEMAxFHWZSQEWzR9h77BFSxJkt9yhbAhUNPQ0FnBL/SNr5X3bcSHnOWN+SrPKHVesG81uxlnIvpTw1LyzYrfnlS9kCdqo19sCu8M/wbA/eBv+51thjtroFi8M3Zhd8sJjGImDsgcXhDzHEHoEb2w+flFX4LxQYLAIyy1lg9u0WLIsBW1MWwCQzs7GcBWZhd3bzFDNLgXt2MpZKIsztzpIYY1oSY1oSYypGmVljWhJj1ZkFdsZiJmdSksR2MZ/GRAyz2Zv1tXhbt/Wj/0mmVcuIsWbp89nY6mH5vqNcxTVGjHMvaXEm6Tuu+VWkHPeQhHV20cdw1Luprfq+Px+/mWXARm8wTyxi/Ka1GMa0GMezRIuhjGcTj43JWR4vMf8mnYnduCLGM7Ybf411Y7Kxt7Y+WljYd2P/340aPNbGbJEAAAAASUVORK5CYII=);
              background-repeat: no-repeat;
              background-size: auto 100%;
              color: #fff;
            }

            .quotation_header_dark {
              color: rgba(255, 255, 255, 0.9);
              background-color: #000;
            }

            .quotation_header h3 {
              font-weight: 700;
              font-size: 18px;
              border-bottom: 1px solid black;
              padding-bottom: 0.8rem;
              margin: 0 1.5rem 0.5rem;
              color: #fff;
            }
            .quotation_header_dark h3 {
              color: rgba(255, 255, 255, 0.9);
            }

            .quotation_header p {
              font-size: 14px;
              font-weight: 400;
              margin-bottom: 0;
              line-height: 1.8rem;
              opacity: 1;
            }

            .quotation_body {
              text-align: center;
              padding: 0.6rem 0.6rem 0.2rem;
            }

            .quotation_section {
              background: #000;
              padding: 0.2rem 1.4rem;
              display: flex;
              color: #fff;
              box-sizing: border-box;
            }
            .quotation_section_dark {
              color: rgba(255, 255, 255, 0.9);
            }
            .quotation_section--step {
              font-size: 17px;
              text-align: center;
              font-weight: 700;
              padding-right: 1.1rem;
              border-right: 1px solid hsla(0, 0%, 100%, 0.3);
              margin: 0.6rem 0;
            }

            .quotation_section--title {
              font-size: 16px;
              padding-left: 1.1rem;
              line-height: 2.05rem;
              margin: 0.6rem 0;
            }

            .quotation_input-container {
              border: 1px solid #ccc;
              border-top: 0;
              padding: 1rem;
              margin-bottom: 1rem;
            }
            .quotation_input-container_dark {
              background: #f0f0f0;
            }
            /* QUOTATION-COMPONENTS::END */
          `}
        </style>
      </PersistGate>
    );
}

MyApp.getInitialProps = async (appContext) => ({ ...(await App.getInitialProps(appContext)) });

export default wrapper.withRedux(appWithTranslation(MyApp));