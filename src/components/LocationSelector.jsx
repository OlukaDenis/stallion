import { FirestoreCollection } from "@react-firebase/firestore";
import { Form, Input, Row, Col, Select } from "antd";

export default class LocationSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { county: null, subcounty: null, ward: null };
    this.onCountySelected = this.onCountySelected.bind(this);
    this.onSubCountySelected = this.onSubCountySelected.bind(this);
  }

  onCountySelected(selectedOptionValue, selectedOption) {
    this.setState({ county: selectedOption.children });
  }

  onSubCountySelected(selectedOptionValue, selectedOption) {
    this.setState({ subcounty: selectedOption.children });
  }

  render() {
    return (
      <>
        <Row gutter={[8, 8]}>
          <Col xs={22} sm={22} md={12} lg={12} xl={12}>

              <FirestoreCollection path="/counties/">
                {(d) => {
                  return d.isLoading ? (
                    <Form.Item
                      name="county"
                      rules={[
                        {
                          required: true,
                          message: 'Select your county of permanent residence.',
                        },
                      ]}
                    >
                      <Select placeholder="County *">
                        <Select.Option disabled value="loading">
                          Loading...
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  ) : (
                    <Form.Item
                      name="county"
                      rules={[
                        {
                          required: true,
                          message: 'Select your county of permanent residence.',
                        },
                      ]}
                    >
                      <Select placeholder="County *" onSelect={this.onCountySelected}>
                        {d.value.map((county) => (
                          <Select.Option key={county.code} value={county.code}>
                            {county.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  );
                }}
              </FirestoreCollection>
          </Col>
          <Col xs={22} sm={22} md={12} lg={12} xl={12}>

              <FirestoreCollection
                path={"/counties/" + this.state.county + "/subcounties/"}
              >
                {(d) => {
                  return d.isLoading ? (
                                <Form.Item
              name="constituency"
              rules={[
                {
                  required: true,
                  message: "Select your constituency of permanent residence.",
                },
              ]}
            >
                    <Select
                      placeholder="Constituency *"
                      onSelect={this.onSubCountySelected}
                    >
                      <Select.Option disabled value="loading">
                        Loading...
                      </Select.Option>
                    </Select>
                    </Form.Item>
                  ) : (
                                <Form.Item
              name="constituency"
              rules={[
                {
                  required: true,
                  message: "Select your constituency of permanent residence.",
                },
              ]}
            >
                    <Select
                      placeholder="Constituency *"
                      onSelect={this.onSubCountySelected}
                    >
                      {d.value.map((subcounty) => (
                        <Select.Option
                          key={subcounty.code}
                          value={subcounty.code}
                        >
                          {subcounty.name}
                        </Select.Option>
                      ))}
                    </Select>
                    </Form.Item>
                  );
                }}
              </FirestoreCollection>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col xs={22} sm={22} md={12} lg={12} xl={12}>
           
              <FirestoreCollection
                path={
                  "/counties/" +
                  this.state.county +
                  "/subcounties/" +
                  this.state.subcounty +
                  "/wards/"
                }
              >
                {(d) => {
                  return d.isLoading ? (
                    <Form.Item
                      name="ward"
                      rules={[
                        {
                          required: true,
                          message: 'Select your ward of permanent residence.',
                        },
                      ]}
                    >
                      <Select placeholder="Ward *">
                        <Select.Option disabled value="loading">
                          Loading...
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  ) : (
                    <Form.Item
                      name="ward"
                      rules={[
                        {
                          required: true,
                          message: 'Select your ward of permanent residence.',
                        },
                      ]}
                    >
                      <Select placeholder="Ward *">
                        {d.value.map((ward) => (
                          <Select.Option key={ward.code} value={ward.code}>
                            {ward.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  );
                }}
              </FirestoreCollection>
          </Col>
          <Col xs={22} sm={22} md={12} lg={12} xl={12}>
            <Form.Item
              name="location"
              rules={[
                {
                  message: "Select your village/estate of permanent residence.",
                },
              ]}
            >
              <Input placeholder="Village/Estate" />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  }
}
