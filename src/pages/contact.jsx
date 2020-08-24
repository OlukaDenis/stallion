import BaseLayout from '../components/layout';
import { Form, Input, Avatar, Button, Row, Col } from 'antd';
import { FirestoreMutation } from '@react-firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { withTranslation } from '../utilities/i18n';

import { UserOutlined, MailOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export function Contacts(props) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [savingToFirebase, setSavingToFirebase] = useState(false);
  let uuid = Math.random().toString(36).substring(2) + new Date().getTime().toString(36);

  const handleEmailChange = (event) => {
    setEmail(event.target.value.trim());
  };

  let onFinish = (values, firestoreMutation) => {
    if (savingToFirebase) return;

    for (let index in values) {
      values[index] = values[index] ? values[index] : false;
    }
    console.log('Success:', values);

    setSavingToFirebase(true);
    firestoreMutation(values).then((res) => {
      setSavingToFirebase(false);
      console.log('Message sent successfully', res);
      router.push({
        pathname: '/success',
      });
    });
  };

  let onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <BaseLayout>
      <Row justify="center" gutter={[8, 16]}>
        <Col xs={22} sm={22} md={11} lg={11} xl={11}>
          <h1 className="_c-title">Get in touch</h1>
          <div className="company-details-layout">
            <Avatar className="user-image" size={100} icon={<UserOutlined />} />
            <div className="company-details">
              <h4>Super Stallion Logistics</h4>
              <p>superstallioncarriers@gmail.com</p>
              {/* <p> +1 15 000 554</p> */}
              <p>9545 Bauer Ave Nottingham</p>
              <p>MD 21236</p>
              <p>Baltimore, MD</p>
            </div>
          </div>
        </Col>

        <Col xs={22} sm={22} md={11} lg={11} xl={11}>
          <h1 className="_c-title">Send an Email</h1>
          <FirestoreMutation type="set" path={'/emails/' + email}>
            {({ runMutation }) => {
              return (
                <Form
                  onFinish={(vals) => onFinish(vals, runMutation)}
                  onFinishFailed={onFinishFailed}
                  name="send_email"
                  className="login-form"
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your names!',
                      },
                    ]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Your Name *" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder="Email *"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    rules={[
                      {
                        required: true,
                        message: 'Please provide a message to send',
                      },
                    ]}
                  >
                    <TextArea placeholder="Your Message *" autoSize={{ minRows: 8, maxRows: 12 }} />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      loading={savingToFirebase}
                      type="primary"
                      shape="round"
                      size="large"
                      htmlType="submit"
                      className="send-message-button"
                    >
                      Send Message
                    </Button>
                  </Form.Item>
                </Form>
              );
            }}
          </FirestoreMutation>
        </Col>
      </Row>
      <style jsx>
        {`
          .contact-layout {
            background: white;
            padding-top: 50px;
          }

          ._c-title {
            font-size: 30px;
            font-weight: 500;
            padding: 30px 0;
          }

          .get-in-touch-layout {
            padding: 0 50px;
          }

          .send-email-layout {
            width: 80%;
          }

          .get-in-touch-layout > ._c-title {
            text-align: center;
          }

          .company-details-layout {
            display: flex;
            justify-content: center;
          }

          .user-image {
            padding: 20px;
            border-radius: 50%;
            background-color: #eee;
            align-self: center;
          }

          .company-details {
            margin-left: 50px;
          }
        `}
      </style>
    </BaseLayout>
  );
}

Contacts.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Contacts);
