import { Card, Form, Input, Row, Col, Switch, Timeline } from "antd";
import { useState } from 'react'

export default () => {

  const [showMpesaInstructions, setShowMpesaInstructions] = useState(false);
  const [showAirtelMoneyInstructions, setShowAirtelMoneyInstructions] = useState(false);

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
          <Form.Item name="amount"
            rules={[
              {
                required: true,
                message: "How much are you donating?",
              },
            ]}>
            <Input placeholder="Amount Donated*" />
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
          <Form.Item name="reference"
          rules={[
            {
              required: true,
              message: "Provide the transaction reference",
            },
          ]}>
            <Input placeholder="Transaction Reference*" />
          </Form.Item>
        </Col>
      </Row>
      <h3>Donation Instructions:</h3>
      <Row gutter={[16, 8]}>
        <Col xs={22} sm={22} md={12} lg={12} xl={12}>
          <Card
            title="Safaricom M-PESA"
            bordered={false}
            style={{ width: "100%" }}
          >
            <Switch
              defaultChecked={false}
              onChange={setShowMpesaInstructions}
            />
            {showMpesaInstructions ? (
              <>
                &nbsp;Hide instructions <br />
                <br />
                <Timeline>
                  <Timeline.Item>
                    Go to <b>M-Pesa</b>
                  </Timeline.Item>
                  <Timeline.Item>
                    Select <b>Lipa na M-PESA</b>
                  </Timeline.Item>
                  <Timeline.Item>
                    Select <b>Buy Goods and Services</b>
                  </Timeline.Item>
                  <Timeline.Item>
                    Enter Till Number: 544506
                  </Timeline.Item>
                  {/* <Timeline.Item>
                    Enter Account Number: <b>Your name</b>
                  </Timeline.Item> */}
                  <Timeline.Item>
                    Enter <b>Amount</b>
                  </Timeline.Item>
                  <Timeline.Item>
                    Enter: <b>PIN</b>
                  </Timeline.Item>
                  <Timeline.Item>Submit</Timeline.Item>
                </Timeline>
              </>
            ) : (
              <> Show instructions</>
            )}
          </Card>
        </Col>
        <Col xs={22} sm={22} md={12} lg={12} xl={12}>
          <Card title="Airtel Money" bordered={false} style={{ width: "100%" }}>
            <Switch
              defaultChecked={false}
              onChange={setShowAirtelMoneyInstructions}
            />
            {showAirtelMoneyInstructions ? (
              <>
                &nbsp;Hide instructions <br />
                <br />
                <Timeline>
                  <Timeline.Item>
                    Go to <b>Airtel Money</b>
                  </Timeline.Item>
                  <Timeline.Item>
                    Select <b>Make Payments</b>
                  </Timeline.Item>
                  <Timeline.Item>
                    Select <b>PayBill</b>
                  </Timeline.Item>
                  <Timeline.Item>
                    Enter Paybill Number: 123456
                  </Timeline.Item>
                  <Timeline.Item>
                    Enter <b>Amount</b>
                  </Timeline.Item>
                  <Timeline.Item>
                    Enter <b>PIN</b>
                  </Timeline.Item>
                  <Timeline.Item>
                    Reference Number: <b>Your name</b>
                  </Timeline.Item>
                  <Timeline.Item>Submit</Timeline.Item>
                </Timeline>
              </>
            ) : (
              <> Show instructions</>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};
