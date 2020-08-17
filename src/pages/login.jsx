import BaseLayout from '../components/layout';
import { i18n, Link, withTranslation } from '../utilities/i18n';
import PropTypes from 'prop-types';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Spin } from 'antd';
import { setIsLoggedIn, setIsPhoneLinked, setUsername, setIsLoading, setName, setPhone, setEmail, setUid, setIsEmailVerified, setPhotoURL, setRefreshToken, setIsAdmin, setIsShopOwner } from '../state/user/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router } from '../utilities/i18n';

export function LoginPage({
         t,
         setIsLoggedIn,
         setIsPhoneLinked,
         setUsername,
         setIsLoading,
         setName,
         setPhone,
         setEmail,
         setUid,
         setIsEmailVerified,
         setPhotoURL,
         setRefreshToken,
         setIsAdmin,
         setIsShopOwner,
       }) {
         // FirebaseUI config.
         const uiConfig = {
           signInFlow: 'popup',
           signInSuccessUrl: '/',
           signInOptions: [
             // Allowed Login Providers
             firebase.auth.PhoneAuthProvider.PROVIDER_ID,
             firebase.auth.EmailAuthProvider.PROVIDER_ID,
             firebase.auth.GoogleAuthProvider.PROVIDER_ID,
             firebase.auth.FacebookAuthProvider.PROVIDER_ID,
             firebase.auth.TwitterAuthProvider.PROVIDER_ID,
           ],
           // Terms of service url/callback.
           tosUrl: '/terms-of-service',
           // Privacy policy url/callback.
           privacyPolicyUrl: '/privacy-policy',

           callbacks: {
             signInSuccess: function (currentUser, credential, redirectUrl) {
               
               setIsLoading(true);
               setIsLoggedIn(true);
               setIsPhoneLinked(!!currentUser.phoneNumber);
               setUsername(currentUser.email || currentUser.phoneNumber);
               setName(currentUser.displayName);
               setPhone(currentUser.phoneNumber);
               setEmail(currentUser.email);
               setUid(currentUser.uid);
               setIsEmailVerified(currentUser.emailVerified);
               setPhotoURL(currentUser.photoURL);
               setRefreshToken(currentUser.refreshToken);
               
               currentUser.getIdTokenResult().then(token => {
                  setIsAdmin(token.claims.admin);
                  setIsShopOwner(token.claims.shopOwner);
                  setIsLoading(false);
                }).catch(error => {
                  setIsLoading(false);
                });
               
                Router.back();
               return false;
             },
           },
         };

         return (
           <BaseLayout>
             <div className="vertical-center-div">
               {!firebase.apps.length ? (
                 <Spin loading={'Loading...'}></Spin>
               ) : (
                 <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
               )}
             </div>
           </BaseLayout>
         );
       }

LoginPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

LoginPage.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoggedIn: bindActionCreators(setIsLoggedIn, dispatch),
    setIsPhoneLinked: bindActionCreators(setIsPhoneLinked, dispatch),
    setUsername: bindActionCreators(setUsername, dispatch),
    setIsLoading: bindActionCreators(setIsLoading, dispatch),
    setName: bindActionCreators(setName, dispatch),
    setPhone: bindActionCreators(setPhone, dispatch),
    setEmail: bindActionCreators(setEmail, dispatch),
    setUid: bindActionCreators(setUid, dispatch),
    setIsEmailVerified: bindActionCreators(setIsEmailVerified, dispatch),
    setPhotoURL: bindActionCreators(setPhotoURL, dispatch),
    setRefreshToken: bindActionCreators(setRefreshToken, dispatch),
    setIsAdmin: bindActionCreators(setIsAdmin, dispatch),
    setIsShopOwner: bindActionCreators(setIsShopOwner, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(LoginPage));
