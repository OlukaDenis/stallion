import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Layout, ConfigProvider, Menu, Switch, Col, Row, Divider, BackTop, Avatar, Spin, Badge } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PhoneOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  CloudServerOutlined,
  EyeInvisibleOutlined,
  UnorderedListOutlined,
  InfoOutlined,
  SolutionOutlined,
  VerticalAlignTopOutlined,
  UnlockOutlined,
  LockOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
  UserOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';

import CustomIcon from './CustomIcon';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { FirestoreProvider } from "@react-firebase/firestore";
// import { firebaseConfig } from "../configs";
import { firebaseTestConfig as firebaseConfig } from "../configs";

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

const crypto = require('crypto');
const cspNonce = crypto.randomBytes(16).toString('hex');

// Import a pre-configured instance of i18next, needs to be bundled
import { Link, Router } from '../utilities/i18n';
import { i18n, withTranslation } from '../utilities/i18n';
import { supported_languages, defaultLanguageIndex } from '../utilities/supported_locales';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTheme, setIsSideMenuShowing, setIsLoadingNewPage } from '../state/ui/action'
import { userLoggedOut } from '../state/user/action';
import parse from 'html-react-parser';

export function BaseLayout({
         t,
         children,
         theme,
         changeTheme,
         isSideMenuShowing,
         setIsSideMenuShowing,
         setIsLoadingNewPage,
         isLoadingNewPage,
         isLoggedIn,
         userLoggedOut,
         isAdmin,
         isManager,
         isDriver,
         isShippingAgent,
       }) {
         const getCurrentLanguageIndex = () => {
           const index = supported_languages.findIndex((item) => item.code === i18n.language);
           return index > -1 ? index : defaultLanguageIndex;
         };

         const [isScreenTooSmall, setScreenTooSmall] = useState(false);
         const [isThemeLightMode, setIsThemeLightMode] = useState(theme === 'light');
         const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(getCurrentLanguageIndex());
        const [marketingHeader, setMarketingHeader] = useState('');

         const fetchMarketingHeader = () => {
           firebase
             .firestore()
             .doc('/pixel/current')
             .get()
             .then((doc) => {
               let data = doc.data();
              //  console.log('data.value', data.value);
               setMarketingHeader(data ? parse(data.value) : '');
             })
             .catch((ex) => {
               console.error('Error', ex);
             });
         };

         useEffect(() => {
           fetchMarketingHeader();
         }, []);

         useEffect(() => {
           i18n.changeLanguage(supported_languages[selectedLanguageIndex].code);
         }, [selectedLanguageIndex]);

         const toggle = () => {
           setIsSideMenuShowing(!isSideMenuShowing);
         };

         const onThemeSwitched = (isLightMode) => {
           setIsThemeLightMode(isLightMode);
           changeTheme(isLightMode ? 'light' : 'dark');
         };

         const onBreakpoint = (isWidthLessThanBreakpoint) => {
           setScreenTooSmall(isWidthLessThanBreakpoint);
         };

         const handleMenuClick = async (menuItem) => {
           const currentPage = Router.pathname;
           const destinationPage = menuItem.key;
           if (currentPage === destinationPage) return;
           if (menuItem.key === '/logout') {
             userLoggedOut();
             await firebase.auth().signOut();
             setIsSideMenuShowing(false);
             return;
           } else if (menuItem.key === '/hide-or-show-menu') {
             setIsSideMenuShowing(!isSideMenuShowing);
             return;
           }
           setIsSideMenuShowing(false);
           setIsLoadingNewPage(true);
           await Router.push(menuItem.key);
           setIsLoadingNewPage(false);
         };

         return (
           <FirestoreProvider {...firebaseConfig} firebase={firebase}>
             <ConfigProvider
               locale={supported_languages[selectedLanguageIndex].antdLocale}
               direction={supported_languages[selectedLanguageIndex].textDirection}
               csp={{ nonce: cspNonce }}
             >
               <Layout className="fill-screen">
                 <Head>
                   <title>Super Stallion Logistics</title>

                   <meta name="mobile-web-app-capable" content="yes" />
                   <meta name="apple-mobile-web-app-capable" content="yes" />
                   <meta name="application-name" content="Super Stallion Logistics" />
                   <meta name="apple-mobile-web-app-title" content="Super Stallion Logistics" />
                   <meta name="msapplication-navbutton-color" content="#000000" />
                   <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                   <meta name="msapplication-starturl" content="/" />

                   <link rel="shortcut icon" href="/favicons/favicon.ico" type="image/x-icon" />
                   <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
                   <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
                   <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
                   <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
                   <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
                   <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
                   <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
                   <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
                   <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
                   <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
                   <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
                   <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
                   <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
                   <meta name="msapplication-TileColor" content="#ffffff" />
                   <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                   <meta name="theme-color" content="#000000" />
                   <meta property="csp-nonce" content={cspNonce} />
                   <meta
                     httpEquiv="Content-Security-Policy"
                     content={`${
                       'development' === process.env.NODE_ENV
                         ? "default-src 'self' 'unsafe-eval' data:; style-src 'self' 'unsafe-inline';" // 'nonce-" + cspNonce + "';"
                         : "default-src 'self' data:; style-src 'self' 'unsafe-inline';" // 'nonce-" + cspNonce + "';"
                     }  style-src-elem 'self' https://*.googleapis.com 'unsafe-inline' https://unpkg.com https://api.mapbox.com;  script-src-elem 'self' https://*.paypal.com https://*.facebook.net/ *.bing.com https://*.postalcars.blogspot.com 'sha256-LNmVjiLmn2c8bXuH+g6dXMDlKC7r2/HA5psQKi4qqq0=' 'sha256-7nnKyr+RUZ9a44Hg3lYwjgkUx5VyFQwv2ZUhVw6N7J4=' 'sha256-qHSWNWOBU7+I7H5eQlPDXTltpWrwWXLEaLsjOrCkTwo=' https://*.gstatic.com http://*.gstatic.com https://*.google.com https://unpkg.com;  img-src https://* 'self' data:; font-src 'self' data: https://*.gstatic.com; child-src 'none'; connect-src 'self' https://*.paypal.com https://*.googleapis.com https://*.openstreetmap.org https://*.mapbox.com; worker-src 'self' blob:;frame-src 'self' https://*.accountchooser.com/ https://*.paypal.com https://*.google.com https://super-stallion-logistics.firebaseapp.com;`}
                   ></meta>
                   <meta charSet="utf-8" />
                   <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                   <meta
                     name="viewport"
                     content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                   />
                   <meta name="description" content="Super Stallion Logistics's website" />
                   <meta
                     name="keywords"
                     content="auto, transport, Copart, IAAI, DOT, Transportation, Fleet, vehicle, tow, towing, hauling, haul, carrier, carriers, car-carrier, hotshot, quote, transportation-quote, car-transport, Metrologistics, cararrival, montway, central-dispatch, dispatch, unitedroads"
                   />

                   <link rel="manifest" href="/manifest.json" />
                   <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                   <meta name="theme-color" content="#2b76b1" />

                   {marketingHeader}
                   {/* Step 1. make some change in the code using VS Code editor */}
                   {(() => {
                     !(function (f, b, e, v, n, t, s) {
                       if (f.fbq) return;
                       n = f.fbq = function () {
                         n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                       };
                       if (!f._fbq) f._fbq = n;
                       n.push = n;
                       n.loaded = !0;
                       n.version = '2.0';
                       n.queue = [];
                       t = b.createElement(e);
                       t.async = !0;
                       t.src = v;
                       s = b.getElementsByTagName(e)[0];
                       s.parentNode.insertBefore(t, s);
                     })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
                     fbq('init', '870742117053416');
                     fbq('track', 'PageView');
                     return '';
                   })()}
                   <noscript>
                     <img
                       height="1"
                       width="1"
                       style="display:none"
                       src="https://www.facebook.com/tr?id=870742117053416&ev=PageView&noscript=1"
                     />
                   </noscript>
                 </Head>
                 <Header
                   onClick={() => {
                     setIsSideMenuShowing(false);
                   }}
                   className={`site-header ${isThemeLightMode ? 'site-header-light' : 'site-header-dark'}`}
                 >
                   <Link href="/">
                     <a>
                       <picture>
                         <source srcSet="/images/webp/logo.webp" type="image/webp"></source>
                         <img className="site-header-logo" alt="Super Stallion Logistics Logo" src="/images/logo.jpg" />
                       </picture>
                     </a>
                   </Link>

                   <Switch
                     className="theme-mode-switch"
                     checked={isThemeLightMode}
                     onChange={() => onThemeSwitched(!isThemeLightMode)}
                     checkedChildren={t('button.theme.light')}
                     unCheckedChildren={t('button.theme.dark')}
                   />

                   <div className={`vertical-center-div ${isThemeLightMode ? 'trigger-light' : 'trigger-dark'}`}>
                     <Badge className="menu-badge-icon badge-icon" count={0} overflowCount={'0'}>
                       {React.createElement(!isSideMenuShowing ? MenuFoldOutlined : MenuUnfoldOutlined, {
                         className: '',
                         onClick: (e) => {
                           e.stopPropagation();
                           toggle();
                         },
                       })}
                     </Badge>
                   </div>
                 </Header>

                 <Layout className="site-layout" hasSider>
                   <Content
                     className="no-margin main-content-section"
                     onClick={() => {
                       setIsSideMenuShowing(false);
                     }}
                   >
                     <Spin className="page-spin-wrapper" spinning={isLoadingNewPage}>
                       <content>{children}</content>
                     </Spin>
                   </Content>

                   <Sider
                     theme={isThemeLightMode ? 'light' : 'dark'}
                     trigger={null}
                     collapsed={!isSideMenuShowing}
                     breakpoint="sm"
                     onBreakpoint={onBreakpoint}
                     collapsedWidth={isScreenTooSmall ? 0 : 80}
                     className="floating-side-menu"
                   >
                     <picture>
                       <source srcSet="/images/webp/logo.webp" type="image/webp"></source>
                       <img className="menu-header-logo" alt="Super Stallion Logistics Logo" src="/images/logo.jpg" />
                     </picture>

                     <div className="theme-mode-switch-in-sider">
                       <Switch
                         data-testid="ThemeModeSwitchInSideMenu"
                         checked={isThemeLightMode}
                         onChange={() => onThemeSwitched(!isThemeLightMode)}
                         checkedChildren={t('button.theme.light')}
                         unCheckedChildren={t('button.theme.dark')}
                       />
                     </div>
                     <Divider className="small-margin-h-divider" />
                     <Menu mode="vertical" theme={isThemeLightMode ? 'light' : 'dark'} selectable={false}>
                       <SubMenu
                         data-testid="LanguageChooserButton"
                         key="lang_submenu"
                         title={t('menu.language.label')}
                         icon={
                           <CustomIcon
                             imgAlt="Language Icon"
                             imgSrc="/images/icon128px-exported-black.jpg"
                             srcSetData={[{ src: '/images/webp/icon128px-exported-black.webp', type: 'image/webp' }]}
                           />
                         }
                       >
                         <Menu.ItemGroup title={t('menu.label.select_language')}>
                           {supported_languages.map((lang, index) => (
                             <Menu.Item
                               className={`${index == selectedLanguageIndex ? 'ant-menu-item-selected' : ''}`}
                               data-testid={`LanguageOptionButton_${lang.code}`}
                               key={index}
                               onClick={(item) => {
                                 setSelectedLanguageIndex(item.key);
                               }}
                             >
                               <Row gutter={[8, 0]}>
                                 <Col span={8} className="right-align-text">
                                   {lang.flag}
                                 </Col>
                                 <Col span={14}>{lang.name}</Col>
                               </Row>
                             </Menu.Item>
                           ))}
                         </Menu.ItemGroup>
                       </SubMenu>
                     </Menu>
                     <Divider className="no-margin" />
                     <Menu
                       onClick={handleMenuClick}
                       mode="vertical"
                       defaultSelectedKeys={['1']}
                       theme={isThemeLightMode ? 'light' : 'dark'}
                     >
                       <Menu.Item key="/" icon={<HomeOutlined />}>
                         {t('menu.home.label')}
                       </Menu.Item>
                       <Menu.Item key="/track" icon={<CloudServerOutlined />}>
                         {t('menu.track.label')}
                       </Menu.Item>
                       <Menu.Item key="/quotation" icon={<UnorderedListOutlined />}>
                         {t('menu.quotation.label')}
                       </Menu.Item>
                       <Menu.Item key="/jobs/available" icon={<FolderOpenOutlined />}>
                         {t('menu.jobs.label')}
                       </Menu.Item>
                       {(isAdmin || isManager) && (
                         <Menu.Item key="/jobs/approve" icon={<FileDoneOutlined />}>
                           {t('menu.approve.label')}
                         </Menu.Item>
                       )}
                       {isAdmin && (
                         <Menu.Item key="/users/manage" icon={<UserOutlined />}>
                           {t('menu.users.label')}
                         </Menu.Item>
                       )}
                       <Menu.Item
                         key={isLoggedIn ? '/logout' : '/login'}
                         icon={isLoggedIn ? <LockOutlined /> : <UnlockOutlined />}
                       >
                         {isLoggedIn ? t('menu.logout.label') : t('menu.login.label')}
                       </Menu.Item>
                     </Menu>
                     <Divider className="small-margin-h-divider" />

                     <Menu theme={isThemeLightMode ? 'light' : 'dark'} onClick={handleMenuClick} mode="vertical">
                       <Menu.Item key="/about-us" icon={<InfoOutlined />}>
                         {t('menu.about.label')}
                       </Menu.Item>
                       <Menu.Item key="/contact" icon={<PhoneOutlined />}>
                         {t('menu.contact.label')}
                       </Menu.Item>
                     </Menu>
                     <Divider className="small-margin-h-divider" />
                     <Menu theme={isThemeLightMode ? 'light' : 'dark'} onClick={handleMenuClick} mode="vertical">
                       <Menu.Item key="/privacy-policy" icon={<EyeInvisibleOutlined />}>
                         {t('menu.privacy.label')}
                       </Menu.Item>
                       <Menu.Item key="/terms-of-service" icon={<SolutionOutlined />}>
                         {t('menu.terms.label')}
                       </Menu.Item>
                     </Menu>
                     <Divider className="small-margin-h-divider" />
                     <Menu
                       theme={isThemeLightMode ? 'light' : 'dark'}
                       className="bottom-padded-menu"
                       onClick={handleMenuClick}
                       mode="vertical"
                     >
                       <Menu.Item
                         key="/hide-or-show-menu"
                         icon={isSideMenuShowing ? <CaretRightOutlined /> : <CaretLeftOutlined />}
                       >
                         {isSideMenuShowing ? t('menu.hide.label') : t('menu.show.label')}
                       </Menu.Item>
                     </Menu>
                   </Sider>
                 </Layout>
                 <BackTop visibilityHeight="100">
                   <Avatar shape="circle" className="back-top-bg" size={'large'} icon={<VerticalAlignTopOutlined />} />
                 </BackTop>
                 <Footer
                   onClick={() => {
                     setIsSideMenuShowing(false);
                   }}
                   className={`site-footer ${isThemeLightMode ? 'site-footer-light' : 'site-footer-dark'}`}
                 >
                   <Row justify="center">
                     <Col xs={24} sm={24} md={12} lg={10} xl={8}>
                       <div className="vertical-center-div">
                         <p>Super Stallion Logistics &copy;{new Date().getFullYear()}</p>
                       </div>
                     </Col>
                   </Row>
                 </Footer>
               </Layout>
             </ConfigProvider>
           </FirestoreProvider>
         );
       }
//Removed footer column on row 387
const mapStateToProps = (state) => ({
  theme: state.ui.theme,
  isSideMenuShowing: state.ui.isSideMenuShowing,
  isLoadingNewPage: state.ui.isLoadingNewPage,
  isLoggedIn: state.user.isLoggedIn,
  isAdmin: state.user.isAdmin,
  isManager: state.user.isManager,
  isDriver: state.user.isDriver,
  isShippingAgent: state.user.isShippingAgent,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeTheme: bindActionCreators(changeTheme, dispatch),
    setIsSideMenuShowing: bindActionCreators(setIsSideMenuShowing, dispatch),
    userLoggedOut: bindActionCreators(userLoggedOut, dispatch),
    setIsLoadingNewPage: bindActionCreators(setIsLoadingNewPage, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(BaseLayout));