import BaseLayout from '../components/layout';
import { Row, Col, List, Divider, Popconfirm, Button } from 'antd';
import { withTranslation } from 'react-i18next';
import { Card } from 'antd';
import { DeleteOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { setCartItems } from '../state/cart/action';
import { setIsLoadingNewPage } from '../state/ui/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CartItemCount from '../components/CartItemCount';
import IconText from '../components/IconText';
import CartItemFavorite from '../components/CartItemFavorite';
import { Router } from '../utilities/i18n';

const { Meta } = Card;
export function CartPage({ t, i18n, setCartItems, setIsLoadingNewPage, cartItems, theme }) {
  const removeItemFromCart = (item) => {
    console.log('remove from cart');
    delete cartItems[item.id];
    setCartItems(cartItems);
  };

  const goToPage = async (link) => {
    setIsLoadingNewPage(true);
    await Router.push(link);
    setIsLoadingNewPage(false);
  }

  return (
    <BaseLayout>
      <section className="items-section">
        <Row gutter={[8, 8]} justify="center">
          <Col xs={22} sm={20} md={11} lg={5} xl={5}>
            <h1 className="cart-heading">
              Cart - {Object.keys(cartItems).reduce((total, key) => total + cartItems[key].count, 0)} Item(s)
            </h1>
          </Col>
          <Col xs={0} sm={0} md={0} lg={5} xl={5}></Col>
          <Col xs={0} sm={0} md={0} lg={5} xl={5}></Col>
          <Col xs={0} sm={0} md={0} lg={5} xl={5}></Col>
        </Row>

        <Row gutter={[24, 32]} justify="center" className="items-row">
          <Col xs={22} sm={20} md={20} lg={20} xl={20}>
            <List
              // bordered
              header={
                <>
                  <Row gutter={[8, 8]} justify="center">
                    <Col xs={0} sm={0} md={0} lg={11} xl={11}>
                      <span className="cart-list-header center-col-content">ITEM</span>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={4} xl={4}>
                      <span className="cart-list-header center-col-content">QUANTITY</span>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={4} xl={4}>
                      <span className="cart-list-header center-col-content">UNIT PRICE</span>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={4} xl={4}>
                      <span className="cart-list-header center-col-content">SUBTOTAL</span>
                    </Col>
                  </Row>
                  <Divider className="header-divider small-margin-h-divider" />
                </>
              }
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log('page', page);
                },
                pageSize: 4,
              }}
              dataSource={Object.keys(cartItems)}
              renderItem={(index) => (
                <Card hoverable className="list-item-card">
                  <List.Item key={cartItems[index].id}>
                    <Row gutter={[8, 8]} justify="center" className="items-row">
                      <Col xs={0} sm={0} md={0} lg={11} xl={11}>
                        <div className="cart-item-details center-col-content">
                          <div className="item-img">
                            <img src={cartItems[index].image} />
                          </div>
                          <div className="item-info">
                            Seller: Leo Fresh <br />
                            <b>{cartItems[index].name}</b> <br />
                            Size: {cartItems[index].size}
                            <div className="cart-item-actions">
                              <CartItemFavorite text="ADD TO FAVORITES" cartItem={cartItems[index]} />
                              <Divider type="vertical" />
                              <Popconfirm
                                placement="top"
                                title={'Remove item from cart?'}
                                onConfirm={() => {
                                  removeItemFromCart(cartItems[index]);
                                }}
                                okText="Yes"
                                cancelText="No"
                              >
                                <IconText
                                  onClick={() => {
                                    // removeItemFromCart(cartItems[index]);
                                  }}
                                  icon={DeleteOutlined}
                                  text="DELETE"
                                />
                              </Popconfirm>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={22} sm={22} md={20} lg={0} xl={0}>
                        <div className="cart-item-details ">
                          <div className="item-img">
                            <img src={cartItems[index].image} />
                          </div>
                          <div className="item-info">
                            <span className="secondary-text">Seller: Leo Fresh</span> <br />
                            <b>{cartItems[index].name}</b>
                            <span className="secondary-text">Size: {cartItems[index].size}</span>
                            <br />
                            <span className="primary-color-font bold-text">
                              KES. {Number(cartItems[index].price * cartItems[index].count).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <Divider className="small-margin-h-divider" />
                        <div className="cart-item-actions">
                          <div>
                            <CartItemFavorite text="" cartItem={cartItems[index]} />
                            <Divider type="vertical vertical-divider-margin" />

                            <Popconfirm
                              placement="topLeft"
                              title={'Remove item from cart?'}
                              onConfirm={() => {
                                removeItemFromCart(cartItems[index]);
                              }}
                              okText="Yes"
                              cancelText="No"
                            >
                              <IconText icon={DeleteOutlined} text="" key="list-vertical-delete" />
                            </Popconfirm>
                          </div>

                          <CartItemCount cartItems={cartItems} index={index} />
                        </div>
                      </Col>
                      <Col xs={0} sm={0} md={0} lg={4} xl={4}>
                        <CartItemCount cartItems={cartItems} index={index} />
                      </Col>
                      <Col xs={0} sm={0} md={0} lg={4} xl={4}>
                        <div className="center-col-content">KES. {Number(cartItems[index].price).toFixed(2)}</div>
                      </Col>
                      <Col xs={0} sm={0} md={0} lg={4} xl={4}>
                        <div className="primary-color-font bold-text center-col-content">
                          KES. {Number(cartItems[index].price * cartItems[index].count).toFixed(2)}
                        </div>
                      </Col>
                    </Row>
                  </List.Item>
                </Card>
              )}
              footer={
                <Row gutter={[8, 8]} justify="right" className="items-row">
                  <Col xs={22} sm={22} md={11} lg={9} xl={10}></Col>
                  <Col xs={22} sm={20} md={11} lg={3} xl={3}></Col>
                  <Col xs={22} sm={20} md={11} lg={3} xl={3}></Col>
                  <Col xs={22} sm={20} md={11} lg={9} xl={8} dir="rtl">
                    <span className="bold-text cart-total-label">Total:</span>
                    <span className="primary-color-font bold-text cart-total-value">
                      KES.{' '}
                      {Number(
                        Object.keys(cartItems).length > 0
                          ? Object.keys(cartItems).reduce((sum, key) => {
                              return sum + cartItems[key].price * cartItems[key].count;
                            }, 0)
                          : 0
                      ).toFixed(2)}
                    </span>
                    <br />
                    <span className="secondary-text">Local Delivery Fees not included yet</span>
                    <br />
                    <span className="secondary-text">International Shipping & Customs Fees not included yet</span>
                  </Col>
                </Row>
              }
            />
          </Col>
        </Row>

        <Row gutter={[24, 32]} justify="center" className="items-row">
          <Col xs={22} sm={20} md={20} lg={20} xl={20}>
            <Row gutter={[24, 32]} justify="center" className="items-row">
              <Col xs={0} sm={0} md={2} lg={4} xl={7}></Col>
              <Col xs={0} sm={0} md={2} lg={4} xl={7}></Col>
              <Col xs={24} sm={12} md={10} lg={8} xl={5}>
                <Button
                  onClick={() => {
                    goToPage('/');
                  }}
                  type={Object.keys(cartItems).length < 1 ? 'primary' : "secondary"}
                  shape="round"
                  size="large"
                  className="float-right"
                >
                  <LeftOutlined />
                  {t('button.continue_shopping')}
                </Button>
              </Col>
              <Col xs={24} sm={12} md={10} lg={8} xl={5}>
                <Button
                  disabled={Object.keys(cartItems).length < 1}
                  onClick={() => {
                    goToPage('/delivery');
                  }}
                  type="primary"
                  shape="round"
                  size="large"
                  className="float-right"
                >
                  {t('button.proceed_to_checkout')} <RightOutlined />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </BaseLayout>
  );
}

CartPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
  cartItems: state.cart.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCartItems: bindActionCreators(setCartItems, dispatch),
    setIsLoadingNewPage: bindActionCreators(setIsLoadingNewPage, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(CartPage));
