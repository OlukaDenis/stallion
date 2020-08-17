import { Form, Input, Row, Select, Col } from "antd";
const { TextArea } = Input;

export default () => {
  return (
    <>
      <Row gutter={[16, 8]}>
        <Col xs={22} sm={22} md={12} lg={12} xl={12}>
          <Form.Item name="service"
          rules={[
            {
              required: true,
              message: "What are you donating?",
            },
          ]}>
            <Select placeholder="Service Being Donated*">
              <Select.Option value="Business Strategy/Advise">
                Business Strategy/Advise
              </Select.Option>
              <Select.Option value="Nursing/Medical Aid">
                Nursing/Medical Aid
              </Select.Option>
              <Select.Option value="First Aid">First Aid</Select.Option>
              <Select.Option value="Teaching">Teaching</Select.Option>
              <Select.Option value="Psychological Counselling">
                Psychological Counselling
              </Select.Option>
              <Select.Option value="Legal Advice">Legal Advice</Select.Option>
              <Select.Option value="Shopping/Home Delivery">
                Shopping/Home Delivery
              </Select.Option>
            </Select>
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
              message: "Where is the donation collection point?",
            },
          ]}>
            <Input placeholder="Donation Collection Point*" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col span={24}>
          <Form.Item name="message"
          rules={[
            {
              required: true,
              message: "Provide a short message",
            },
          ]}>
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
