import { Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { setCartItems } from '../state/cart/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export function CartItemCount({ cartItems, index, setCartItems }) {
  const increaseItemCountInCart = () => {
    cartItems[index].count++;
    setCartItems(cartItems);
  };

  const decreaseItemCountInCart = () => {
    if (cartItems[index].count > 1) {
      cartItems[index].count--;
      setCartItems(cartItems);
    }
  };

  return (
    <div className="center-col-content">
      <Button onClick={decreaseItemCountInCart} type="primary" size="small" shape="circle" icon={<MinusOutlined />} />
      &nbsp;
      <span className="cart-item-count-sm">{cartItems[index].count}</span>
      &nbsp;
      <Button onClick={increaseItemCountInCart} type="primary" size="small" shape="circle" icon={<PlusOutlined />} />
    </div>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCartItems: bindActionCreators(setCartItems, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItemCount);
