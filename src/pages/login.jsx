import BaseLayout from '../components/layout';
import { i18n, Link, withTranslation } from '../utilities/i18n';
import PropTypes from 'prop-types';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Alert, Button, Card, Col, Input, Row, Spin } from 'antd';
import {
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
  setIsShippingAgent,
} from '../state/user/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router } from '../utilities/i18n';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useIsLoadingNewPage } from '../hooks/NewPageLoadingIndicator';

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
  setIsShippingAgent,
}) {

  const inputStyle = {
    height: 45,
  };
  
  const onSuccessRedirectUrl = Router.query.redirectURL || '/';
  const[isPhoneNumberSignup, setIsPhoneNumberSignup] = useState(false);
  const[isSavingDisplayName, setIsSavingDisplayName] = useState(false);
  const[currentUser, setCurrentUser] = useState({});
  const[displayName, setDisplayName] = useState('');
  const[displayNameError, setDisplayNameError] = useState(false);
  const[pageToLoad, setPageToLoad] = useState(null);

  useIsLoadingNewPage(pageToLoad);

  const saveDisplayName = async () => {
    if (!displayName) {
      setDisplayNameError(true);
      return;
    }
    setIsSavingDisplayName(true);
    await currentUser.updateProfile({
      displayName: displayName,
      photoURL: currentUser.photoURL,
    });
    await executeNewUserSignupFlow(currentUser, 'phone');
    setIsSavingDisplayName(false);
    setPageToLoad({ pathname: onSuccessRedirectUrl });
  };

  // FirebaseUI config.
  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: onSuccessRedirectUrl,
    signInOptions: [
      // Allowed Login Providers
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //  firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //  firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url/callback.
    tosUrl: '/terms-of-service',
    // Privacy policy url/callback.
    privacyPolicyUrl: '/privacy-policy',

    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        let credential = authResult.credential;
        let isNewUser = authResult.additionalUserInfo.isNewUser;
        // password | google.com | phone
        let providerId = authResult.additionalUserInfo.providerId;
        // let operationType = authResult.operationType;

        if (!isNewUser) {
          return executeExistingUserLoginFlow(authResult.user);
        } else if (isNewUser && 'phone' === providerId) {
          // get display name before redirecting
          setIsPhoneNumberSignup(true);
          setCurrentUser(authResult.user);
          return false;
        } else {
          return executeNewUserSignupFlow(authResult.user, providerId);
        }
      },
    },
  };

  const executeNewUserSignupFlow = async (currentUser, providerId) => {
    await firebase
      .firestore()
      .doc(`/users/${currentUser.uid}`)
      .set({
        phoneNumber: currentUser.phoneNumber || '',
        email: currentUser.email || '',
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
        uid: currentUser.uid || '',
        emailVerified: currentUser.emailVerified || false,
        photoURL: currentUser.photoURL || '',
        providerId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

    if ('password' === providerId) {
      await currentUser.sendEmailVerification();
    }

    return executeExistingUserLoginFlow(currentUser);
  };

  const executeExistingUserLoginFlow = async (currentUser) => {
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

    await currentUser
      .getIdTokenResult()
      .then((token) => {
        setIsAdmin(token.claims.admin);
        setIsShippingAgent(token.claims.agent);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

      return true;
  };

  return (
    <BaseLayout>
      <Row gutter={[16, 16]} style={{ paddingTop: 30 }} justify="center">
        <Col xs={22} sm={20} md={14} lg={10} xl={8}>
          <Card>
            <div className="vertical-center-div">
              {!firebase.apps.length ? (
                <Spin loading={'Loading...'}></Spin>
              ) : (
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
              )}
              {isPhoneNumberSignup && (
                <div style={{ textAlign: 'center' }}>
                  <Input
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                      setDisplayNameError(false);
                    }}
                    value={displayName}
                    placeholder="First & Last Name "
                    prefix={<UserOutlined />}
                    style={inputStyle}
                    required
                  />
                  <br />
                  {displayNameError && <Alert message="Kindly enter your first and last names." type="error" />}
                  <br />
                  <Button
                    shape="round"
                    size="large"
                    loading={isSavingDisplayName}
                    onClick={saveDisplayName}
                    type="primary"
                  >
                    Save Name
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
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
    setIsShippingAgent: bindActionCreators(setIsShippingAgent, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(LoginPage));
