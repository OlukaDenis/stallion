import BaseLayout from '../components/layout';
import { withTranslation } from '../utilities/i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router } from '../utilities/i18n';
import { Card, Skeleton } from 'antd';
import { Row, Col, List, Divider, Popconfirm, Button } from 'antd';
import { DeleteOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';

export function PrivacyPolicyPage({ t }) {
  const { Meta } = Card;

  return (
    <BaseLayout> 
    <Row justify="center" style={{paddingTop: 50}}>
      <Card style={{width: '90%'}}>
        <Row gutter={[16, 16]} justify="center">

          <Col xs={22} sm={22} md={22} lg={22} xl={22}> 
            <section className="privacy-section">
              <div> 
                <h1>Super Stallion Logistics Privacy Policy</h1>
                <Divider />

                <p>
                Super Stallion Logistics (“Super Stallion”) understands that your privacy is important to you and to us. As part of the normal operation of Super Stallion’s services, we collect and, in some cases, disclose information about you to third parties. This privacy policy (“Privacy Policy”) shows you what information we gather from you and how we protect it. By using this website and the content contained therein (“Site”) and our services, you consent to the terms described in the most recent version of this Privacy Policy. You should also read our Terms of Use to understand the general rules about your use of this Site, and any additional terms that may apply when you access particular services or materials on certain areas of this Site. “We,” “our” means Super Stallion and its affiliates. “You,” “your,” visitor,” or “user” means the individual accessing this site and our services. This Privacy Policy is incorporated into and subject to the terms of the Super Stallion’s Site Terms of Use.
                </p>
                
                <h3>Minors</h3>
                <p>
                This Site is not directed towards children. If you are a minor (under the age of 18), you can use this service only with the consent of your parents or legal guardians. If you are a minor, please do not submit any personal information to this Site. IF YOU ARE 13 YEARS OR YOUNGER, PLEASE DO NOT USE THIS SITE OR ANY OF ITS SERVICES FOR ANY PURPOSE AT ANY TIME. This Site is not intended for any children under the age of 13.
                </p>
              </div>    

              <div>
                <h2>Types of data we collect</h2>
                <h3>Your Personal Information</h3>
                <p>Personal Data is data that identifies you as an individual or relate to an identifiable individual such as your name, address, email address or other information you provide to us when booking our services.</p>
                <h3>Your Usage of Our Site</h3>
                <p>We automatically track certain information about you based upon your use of our Site. We use this information to conduct internal research on our users' demographics, interests, and behavior to better understand and serve our users. This information is compiled and analyzed on an aggregate (anonymized) basis. This information may include the URL that you just came from, which URL you next go to, what browser you are using, and your IP address, among other things.</p>
                <h3>Your Posts</h3>
                <p>If you choose to post messages on our Site, we will collect such information about you as you may choose to disclose pursuant to your activities on the Site.</p>
                <h3>Your Correspondence</h3>
                <p>If you send us e-mails, letters or other personal correspondence, or if other users or third parties send us correspondence about your activities or postings on the Site, we may collect such information into a file specific to you.</p>
                <h3>Your Payment Information</h3>
                <p>If you establish a credit account with us or purchase any of our services, we collect your payment information and some additional information, including billing address, credit card number, and credit card expiration date.</p>
                <h3>Log Information</h3>
                <p>We also collect log information when you use our Site. That information includes, among other things:</p>
                <ul>
                  <li>details about how you’ve used our services</li>
                  <li>device information, such as your web browser type and language</li>
                  <li>access times</li>
                  <li>IP address</li>
                  <li>identifiers associated with cookies or other technologies that may uniquely identify your device or browser</li>
                  <li>pages you visited before or after navigating to our Site</li>
                </ul>

                <h3>Cookies</h3>
                <p>In addition, we use Cookies on certain pages of our Site. A Cookie is a small piece of data that is stored on your device to help websites and mobile apps remember things about you. Cookies can be used to track a user's steps or automatically generate a user's password. Some features of our Site may only be available through the use of a Cookie. Among other things, cookies allow you to enter your password less frequently during a session. Cookies can also help us provide information which is targeted to your interests. Cookies are stored on your hard drive, not on our Site. Most, but not all, cookies are automatically deleted at the end of a session. You may decline our cookies if your browser permits, although your use of the Site may then be restricted (as noted above).</p>

                <h3>How We Use Cookies</h3>
                <p>Like most providers of online services, Super Stallion uses cookies for a number of reasons, like protecting your data and account, helping us see which features are most popular, counting visitors to a page, improving our users’ experience, keeping our services secure, and just generally providing you with a better, more intuitive, and satisfying experience.</p>
              
                <h3>Your Choices</h3>
                <p>Your browser or device may allow you to block or otherwise limit the use of cookies. But cookies are an important part of how our services work, so removing, rejecting, or limiting the use of them could affect the availability and functionality of our services.</p>

                <h3>Browser Cookies</h3>
                <p>Your browser may provide you with the option to refuse some or all browser cookies. You may also be able to remove cookies from your browser. For more information about how to manage browser cookies, please follow the instructions provided by your browser.</p>

                <h3>Mobile Device Identifiers</h3>
                <p>Your mobile operating system may let you opt-out from having certain device identifiers used for interest-based advertising. You should refer to the instructions provided by your mobile device’s manufacturer; this information is typically available under the “settings” function of your mobile device. If your mobile device offers an uninstall process, you can always stop us from collecting information through the app by uninstalling our app.</p>
              </div>  

              <div>
                <h2>What do we do with your Information</h2>
                <h3>To provide services to you</h3>
                <p>The data Super Stallion owns is our internal information and information related to our business customers. Super Stallion uses this data only for normal operating procedures and will not sell or publicly release this information. If you do not provide the data that we request, or prohibit us from collecting such data, we may not be able to provide the requested services.</p>
              
                <h3>Administrative Notices</h3>
                <p>We use your e-mail address, your mailing address, and phone number to contact you regarding administrative notices, new product offerings, and communications relevant to your use of the Site. If you do not wish to receive these communications, you may opt out of receiving these notices by emailing Super Stallion at privacy@superstallion.com.</p>

                <h3>Billing and Support</h3>
                <p>If you open a credit account with our Site, we use your address and billing information to bill you and provide associated support.</p>

                <h3>Dispute Resolution</h3>
                <p>We use information in the file we maintain about you, and other information we obtain from your current and past activities on the Site, to resolve disputes, troubleshoot problems, and enforce our Site Terms of Use.</p>

                <h3>Our Disclosure to Third Parties</h3>
                <p>We value privacy and use practices that are consistent with standards in our industry to protect your privacy. We do not sell or rent any personally identifiable information about you to any third party. The following describes some of the ways that your personally identifiable information may be disclosed:</p>

                <ul><li><p>We will not share your personal information with any third parties without notice and approval</p></li><li><p>You can access your personal data by contacting us via the contact us page at privacy@superstallion.com.</p></li><li><p>You may limit the use of your information by opting in or opting out of communications and sharing when your information is collected.</p></li><li><p>We are subject to the investigatory and enforcement powers of the US Federal Trade Commission.</p></li><li><p>We are required to disclose personal information in response to lawful requests by public authorities, including to meet national security or law enforcement requirements</p></li><li><p>In the case of onward transfers to a third party, we will notify you at the time your data is collected and/or before we use such information for a purpose other than that for which it was originally collected, processed or disclosed for the first time to a third party</p></li></ul>
              
                <h3>Law Enforcement</h3>
                <p>We may disclose any information about you to law enforcement or other government officials as we, in our sole discretion, believe necessary or appropriate, in connection with an investigation of fraud, intellectual property infringements, or other activity that is illegal or may expose us to legal liability.</p>

                <h3>Advertisers</h3>
                <p>We may disclose aggregate information about our users to advertisers and for other marketing and promotional purposes. However, we do not disclose any personally identifying information to any of these entities.</p>

                <h3>No Spam</h3>
                <p>Super Stallion and our users do not tolerate spam. Therefore, without limiting the foregoing, you are not licensed to add a Super Stallion user to your mail list (e-mail or physical mail) without their express consent after adequate disclosure.</p>

                <h3>Disclosures You Make to Third Parties</h3>
                <p>Super Stallion is not responsible for the privacy policies of third parties or other Sites, even if they are linked to our Site. Super Stallion includes these links solely as a convenience to you, and the presence of such a link does not imply a responsibility for the linked site or an endorsement of the linked site, its operator, or its contents. Please make sure you read their privacy policy before using those sites when you leave our Site.</p>

                <h3>International transfer of Personal Data</h3>
                <p>Super Stallion is not responsible for the privacy policies of third parties or other Sites, even if they are linked to our Site. Super Stallion includes these links solely as a convenience to you, and the presence of such a link does not imply a responsibility for the linked site or an endorsement of the linked site, its operator, or its contents. Please make sure you read their privacy policy before using those sites when you leave our Site.</p>

                <div>
                  <h2>How We Protect Your Personal Information</h2>
                  <p>When Super Stallion is creating, maintaining, using or disseminating personal information we will take reasonable and appropriate measures to protect it from loss, misuse and unauthorized access, disclosure, alteration and destruction, taking into due account the risks involved in the processing and the nature of the personal data. Super Stallion cannot and does not guarantee absolute protection, and assumes no liability for any disclosure or loss of data in any case, especially due to transmission errors, unauthorized or bad actions of third parties such as hackers, or through no fault of ours. We cannot guarantee or promise that your personally identifiable information or private communications will remain private. For example, hackers or third parties may unlawfully intercept or access transmissions or private communications on our Site.</p>
                </div>

                <div>
                  <h2>What You Can Do About Your Personal Information</h2>

                  <h3>Your Rights</h3>
                  <p>You have certain rights relating to your personal data, subject to local data protection laws. Depending on the applicable laws and, in particular, if you are located in the EEA, these rights may include:</p>

                  <ul class="privacy__list"><li><p>To access your Personal Data held by us (right to access);</p></li><li><p>To rectify inaccurate Personal Data and, taking into account the purpose of processing the Personal Data, ensure it is complete (right to rectification);</p></li><li><p>To erase/delete your Personal Data, to the extent permitted by applicable data protection laws (right to erasure; right to be forgotten);</p></li><li><p>To restrict our processing of your Personal Data, to the extent permitted by law (right to restriction of processing);</p></li><li><p>To transfer your Personal Data to another controller, to the extent possible (right to data portability);</p></li><li><p>To object to any processing of your Personal Data carried out on the basis of our legitimate interests (right to object). Where we process your Personal Data for direct marketing purposes or share it with third parties for their own direct marketing purposes, you can exercise your right to object at any time to such processing without having to provide any specific reason for such objection;</p></li><li><p>Not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects ("Automated Decision-Making"). Automated Decision-Making currently does not take place on our Sites;</p></li><li><p>To the extent we base the collection, processing and sharing of your Personal Data on your consent, to withdraw your consent at any time, without affecting the lawfulness of the processing based on such consent before its withdrawal.</p></li></ul>

                  <p>If you are a resident of California, under the age of 18 and have registered for an account with us, you may ask us to remove content or information that you have posted to our Sites. Please note that your request does not ensure complete or comprehensive removal of the content or information, because, for example, some of your content may have been reposted by another visitor to our Sites. At any time you may submit a written request inquiring about what personal information we have collected about you in order to: (i) edit such information; or (ii) request its deletion. We will timely respond to any such requests and use all commercially practicable efforts to comply with your demands, unless not legally or otherwise permissible. Inquiries and requests can be provided to privacy@superstallion.com.</p>

                  <h3>Governing Law</h3>
                  <p>This Privacy Policy shall be governed by the laws of the State of New York without regard to its conflict of laws principles.</p>

                  <h3>Changes to Privacy Policy</h3>
                  <p>Super Stallion reserves the exclusive right to make changes, modifications, alterations and/or additions to this Privacy Policy at any time. Any such changes will be effective when posted.</p>
                </div>
              </div>
            </section>
          </Col>
        
        </Row>
      </Card> 
      </Row>
      <style jsx>
        {
          `
            .privacy-section div > h1 {
              font-size: 2.2rem;
              font-weight: 900;
            }

            .privacy-section div > h2 {
              font-weight: 900;
            }
          `
        }
      </style>
    </BaseLayout>
  );
}

PrivacyPolicyPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

PrivacyPolicyPage.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    // setIsLoggedIn: bindActionCreators(setIsLoggedIn, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(PrivacyPolicyPage));
