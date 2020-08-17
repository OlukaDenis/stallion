import FinanceDonation from "./finance_donation";
import ServicesDonation from "./services_donation";
import GoodsDonation from "./goods_donations";
import DonorPersonalDetails from "./donor_personal_details";

import { FirestoreMutation } from "@react-firebase/firestore";

import { useState } from "react";
import { useRouter } from "next/router";

import { DollarOutlined, GiftOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Tabs } from "antd";
const { TabPane } = Tabs;

export default function Donation({ dbRefKey }) {
  const router = useRouter();

  const donationType = {
    finances: { key: "finances", name: "Finacial Donation" },
    goods: { key: "goods", name: "Physical Goods Donation" },
    services: { key: "services", name: "Services Donation" },
  };

  const [selectedDonationType, setSelectedDonationType] = useState(
    donationType.finances.key
  );

  const [savingToFirebase, setSavingToFirebase] = useState(false);

  let saveDataToFirestore = (values, firestoreMutation) => {
    if (savingToFirebase) return;

    for (let index in values) {
      values[index] = values[index] ? values[index] : false;
    }

    values.donationType = selectedDonationType;
    
    setSavingToFirebase(isCurrentlySaving => {
      console.log("isCurrentlySaving: ", isCurrentlySaving);
      firestoreMutation(values).then((res) => {
        console.log("Successfully saved relief details ", res);
        setSavingToFirebase(false);
        router.push({
          pathname: "/success",
        });
      });
      return true;
    });

  };

  let onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <FirestoreMutation
      loading={savingToFirebase}
      type="set"
      path={"/donations/" + selectedDonationType + "_" + dbRefKey}
    >
      {({ runMutation }) => {
        
        return (
          <Form
            onFinish={(vals) => saveDataToFirestore(vals, runMutation)}
            onFinishFailed={onFinishFailed}
          >
            <Row justify="center">
              <Col xs={22} sm={22} md={16} lg={16} xl={16}>
                <h4 style={{ marginTop: "3em" }}>
                  What do you want to donate?
                </h4>
                <Tabs
                  defaultActiveKey="1"
                  onChange={setSelectedDonationType}
                  type="card"
                  size="default"
                  style={{ marginTop: "1.5em" }}
                >
                  <TabPane
                    tab={
                      <span>
                        <DollarOutlined />
                        Finances
                      </span>
                    }
                    key="finances"
                  >
                    <h1>Donate Cash</h1>
                    {selectedDonationType === "finances" ? (
                      <>
                        <DonorPersonalDetails></DonorPersonalDetails>
                        <FinanceDonation></FinanceDonation>
                      </>
                    ) : (
                      <></>
                    )}
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <GiftOutlined />
                        Goods
                      </span>
                    }
                    key="goods"
                  >
                    <h1>Donate Physical Goods</h1>
                    {selectedDonationType === "goods" ? (
                      <>
                        <DonorPersonalDetails></DonorPersonalDetails>
                        <GoodsDonation></GoodsDonation>
                      </>
                    ) : (
                      <></>
                    )}
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <TeamOutlined />
                        Services
                      </span>
                    }
                    key="services"
                  >
                    <h1>Donate Your Services</h1>
                    {selectedDonationType === "services" ? (
                      <>
                        <DonorPersonalDetails></DonorPersonalDetails>
                        <ServicesDonation></ServicesDonation>
                      </>
                    ) : (
                      <></>
                    )}
                  </TabPane>
                </Tabs>
                <Form.Item style={{ float: "right" }}>
                  <Button
                    loading={savingToFirebase}
                    type="primary"
                    shape="round"
                    size="large"
                    htmlType="submit"
                    className="next-step-button"
                  >
                    Donate
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        );
      }}
    </FirestoreMutation>
  );
}
