import {
  Form,
  Input,
  Row,
  Col,
} from "antd";

export default () => {

  return (
    <>
      <Row gutter={[16, 8]}>
        <Col
          xs={22}
          sm={22}
          md={12}
          lg={12}
          xl={12}
          style={{ textAlign: "center" }}
        >
          <Form.Item name="first_name"
          rules={[
            {
              required: true,
              message: "Please provide your name",
            },
          ]}>
            <Input placeholder="First Name*" />
          </Form.Item>
        </Col>
        <Col
          xs={22}
          sm={22}
          md={12}
          lg={12}
          xl={12}
          style={{ textAlign: "center" }}
        >
          <Form.Item name="last_name"
          rules={[
            {
              required: true,
              message: "Please provide your name",
            },
          ]}>
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col
          xs={22}
          sm={22}
          md={12}
          lg={12}
          xl={12}
          style={{ textAlign: "center" }}
        >
          <Form.Item name="phone"
          rules={[
            {
              required: true,
              message: "Please provide your phone number",
            },
          ]}>
            <Input placeholder="Phone Number*" />
          </Form.Item>
        </Col>
        <Col
          xs={22}
          sm={22}
          md={12}
          lg={12}
          xl={12}
          style={{ textAlign: "center" }}
        >
          <Form.Item name="email"
          rules={[
            {
              required: true,
              message: "Please provide your email",
            },
          ]}>
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
