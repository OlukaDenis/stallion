import { Form, Input, Row, Col } from "antd";
const { TextArea } = Input;

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
          <Form.Item name="donation"
          rules={[
            {
              required: true,
              message: "Which goods are you donating",
            },
          ]}>
            <Input placeholder="Goods Being Donated*" />
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
          <Form.Item name="collection_point"
          rules={[
            {
              required: true,
              message: "Where is the donation collection point",
            },
          ]}>
            <Input placeholder="Donation Collection Point*" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col span={24}>
          <Form.Item
            name="message"
            rules={[
              {
                required: true,
                message: "Provide a short message",
              },
            ]}
          >
            <TextArea
              placeholder="Other details"
              autoSize={{ minRows: 8, maxRows: 12 }}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
