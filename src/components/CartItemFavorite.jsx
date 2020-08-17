import { Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconText from '../components/IconText';
import { setFavoriteItems } from '../state/user/action';
import { StarOutlined, StarFilled } from '@ant-design/icons';

export function CartItemFavorite({ text, favoriteItems, cartItem, setFavoriteItems }) {
  const addItemToFavorites = (item) => {
    favoriteItems.push(item.id);
    setFavoriteItems(favoriteItems);
  };

  const removeItemFromFavorites = (item) => {
    favoriteItems.pop(item.id);
    setFavoriteItems(favoriteItems);
  };

  return favoriteItems && favoriteItems.includes(cartItem.id) ? (
    <Popconfirm
      placement="topLeft"
      title={'Remove item from favorites?'}
      onConfirm={() => {
        removeItemFromFavorites(cartItem);
      }}
      okText="Yes"
      cancelText="No"
    >
      <IconText icon={StarFilled} text={text ? 'Remove in Favorites' : ''} key="list-vertical-delete" />
    </Popconfirm>
  ) : (
    <IconText
      onClick={() => {
        addItemToFavorites(cartItem);
      }}
      icon={StarOutlined}
      text={text ? text : ''}
      key="list-vertical-star"
    />
  );
}

const mapStateToProps = (state) => ({
  favoriteItems: state.user.favoriteItems,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setFavoriteItems: bindActionCreators(setFavoriteItems, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItemFavorite);
