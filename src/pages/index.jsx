import BaseLayout from '../components/layout';
import { Button, Row, Col } from 'antd';

import { withTranslation, Router } from '../utilities/i18n';
import { Skeleton, Card } from 'antd';
import { PlusCircleOutlined, ShoppingCartOutlined, RightOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { Menu, Dropdown } from 'antd';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { setCartItems } from '../state/cart/action';
import { setIsLoadingNewPage } from '../state/ui/action';
import { connect } from 'react-redux';

const { Meta } = Card;

const products = [
  {
    size: '20L',
    id: '20l',
    image: '/images/20L.jpg',
    webpImage: '/images/webp/20L.webp',
    name: '20-Litre Bottle',
    price: '200',
    description: 'KES. 200',
  },
  {
    size: '10L',
    id: '10l',
    image: '/images/10L.jpg',
    webpImage: '/images/webp/10L.webp',
    name: '10-Litre Bottle',
    price: '100',
    description: 'KES. 100',
  },
  {
    size: '5L',
    id: '5l',
    image: '/images/5L.jpg',
    webpImage: '/images/webp/5L.webp',
    name: '5-Litre Bottle',
    price: '50',
    description: 'KES. 50',
  },
  {
    size: '1L',
    id: '1l',
    image: '/images/1L.jpg',
    webpImage: '/images/webp/1L.webp',
    name: '1-Litre Bottle',
    price: '10',
    description: 'KES. 10',
  },
];
export function HomePage({ t, cartItems, setCartItems, setIsLoadingNewPage, theme: themeMode }) {
  const [isItemLoading, setIsItemLoading] = useState(false);

  const addItemToCart = (item) => {
    if (cartItems.hasOwnProperty(item.id)) {
      cartItems[item.id].count++;
      setCartItems(cartItems);
    } else {
      item.count = 1;
      cartItems[item.id] = item;
      setCartItems(cartItems);
    }
    cartItems[item.id] = item;
  };

  const addItemToCartAndGoToCart = async (item) => {
    addItemToCart(item);
    setIsLoadingNewPage(true);
    await Router.push('/cart');
    setIsLoadingNewPage(false);
  };

  const removeItemFromCart = (item) => {
    delete cartItems[item.id];
    setCartItems(cartItems);
  };

  const menu = (
    <Menu>
      {products.map((item) => (
        <Menu.Item
          onClick={() => {
            addItemToCartAndGoToCart(item);
          }}
          key={item.id}
        >
          {item.name} for {item.description}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <BaseLayout>
      <section className="top-section">
        <div className="top-section-overlay"></div>
        <div className="top-section-content vertical-center-div">
          <div>
            <h1 className={`${themeMode == 'light' ? 'white-text' : 'off-white-text'} intro-text`}>
              {t('page.home.title')}
            </h1>
            <h3 className={`${themeMode == 'light' ? 'white-text' : 'off-white-text'} intro-sub-text`}>
              {t('page.home.subtitle')}
            </h3>

            <Dropdown overlay={menu} placement="bottomRight">
              <Button type="primary" shape="round" size="large">
                {t('button.quick_order')} <RightOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
      </section>

      <section className="items-section">
        <Row gutter={[24, 32]} justify="center" className="items-row">
          {products.map((item) => (
            <Col key={item.id} xs={22} sm={20} md={10} lg={8} xl={6}>
              <Card
                cover={
                  <Skeleton loading={false} active>
                    <picture className="card-cover-picture">
                      <source srcSet={item.webpImage} type="image/webp"></source>
                      <img onLoad={() => {}} onError={() => {}} alt={`Image of ${item.name}`} src={item.image} />
                    </picture>
                  </Skeleton>
                }
                hoverable
                actions={[
                  <Button
                    onClick={() => addItemToCartAndGoToCart(item)}
                    key="order"
                    size="small"
                    shape="round"
                    icon={<ShoppingCartOutlined />}
                  >
                    {t('button.quick_order')}
                  </Button>,
                  cartItems.hasOwnProperty(item.id) ? (
                    <Button
                      onClick={() => removeItemFromCart(item)}
                      key="remove-cart"
                      size="small"
                      type="danger"
                      shape="round"
                      icon={<MinusCircleOutlined />}
                    >
                      {t('button.remove_in_cart')}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => addItemToCart(item)}
                      key="cart"
                      size="small"
                      type="primary"
                      shape="round"
                      icon={<PlusCircleOutlined />}
                    >
                      {t('button.add_to_cart')}
                    </Button>
                  ),
                ]}
              >
                <Skeleton loading={isItemLoading} avatar active>
                  <Meta title={item.name} description={item.description} />
                </Skeleton>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <style jsx>
        {`
          .top-section {
            min-height: 400px;
            width: 100%;
            background-color: rgba(1.6, 0.8, 0.8, 0);
            background-position: bottom center;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
          }
          .top-section-content {
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            position: absolute;
            text-align: center;
            padding: 1em;
            padding-right: 80px;
          }
          @media only screen and (max-width: 576px) {
            .top-section-content {
              padding-right: 1em;
            }
          }
          .items-section {
            margin-top: 20px;
            padding: 20px;
          }
          @media only screen and (min-width: 576px) and (max-width: 720px) {
            .items-section {
              padding-right: 100px;
            }
          }
          .top-section-overlay {
            background-color: #04081d;
            opacity: 0.68;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            position: absolute;
          }
          .intro-text {
            font-size: 5em;
            margin-bottom: 0em;
          }
          .intro-sub-text {
            font-size: 2em;
            margin-bottom: 2em;
            font-weight: 300;
          }
          .principles,
          .services {
            background-color: white;
          }
          .principles h2,
          .services h2 {
            padding: 10px;
          }
          .principles-text {
            font-weight: 300;
            font-size: 18px;
            line-height: 1.5em;
            padding: 10px;
          }

          .principles img {
            height: 96%;
            padding: 2%;
          }

          .card-cover-picture img {
            max-width: 100%;
          }

          @media only screen and (max-width: 410px) {
            .intro-text {
              font-size: 3em;
              margin-bottom: 0em;
            }
            .intro-sub-text {
              font-size: 1.6em;
              margin-bottom: 2em;
              font-weight: 300;
            }
          }
        `}
      </style>
    </BaseLayout>
  );
}

HomePage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

HomePage.propTypes = {
  t: PropTypes.func.isRequired,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(HomePage));
