import { useSelector } from 'react-redux';
import CheckoutStatus from '../../components/checkout-status';
import Item from './item';
import { RootState } from 'store';
import { FormattedMessage, useIntl } from 'react-intl';

const ShoppingCart = () => {
  const { cartItems } = useSelector((state: RootState)  => state.cart);
  const intl = useIntl();

  const priceTotal = () => {
    let totalPrice = 0;
    if(cartItems.length > 0) {
      cartItems.map(item => totalPrice += item.price * item.count);
    }

    return totalPrice;
  }

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title"><FormattedMessage id="cart"></FormattedMessage></h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {cartItems.length > 0 &&
            <table>
              <tbody>
                <tr>
                  <th style={{textAlign: 'left'}}><FormattedMessage id="products"></FormattedMessage></th>
                  <th><FormattedMessage id="color"></FormattedMessage></th>
                  <th><FormattedMessage id="size"></FormattedMessage></th>
                  <th><FormattedMessage id="amount"></FormattedMessage></th>
                  <th><FormattedMessage id="price"></FormattedMessage></th>
                  <th></th>
                </tr>

                {cartItems.map(item => (
                  <Item 
                    key={item.id}
                    id={item.id}
                    thumb={item.thumb}
                    name={item.name}
                    color={item.color}
                    price={item.price}
                    size={item.size}
                    count={item.count}
                  />
                ))}
              </tbody>
            </table> 
          } 
          
          {cartItems.length === 0 && 
            <p><FormattedMessage id="no_item"></FormattedMessage></p>
          }
        </div>
      
        <div className="cart-actions">
          <a href="/products" className="cart__btn-back"><i className="icon-left"></i> <FormattedMessage id="continue"></FormattedMessage></a>
          <input type="text" placeholder={intl.formatMessage({id: "promo"})} className="cart__promo-code" />

          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total"><FormattedMessage id="total"></FormattedMessage> <strong>${priceTotal().toFixed(2)}</strong></p>
            <a href="/cart/checkout" className="btn btn--rounded btn--yellow"><FormattedMessage id="checkout"></FormattedMessage></a>
          </div>
        </div>
      </div>
    </section>
  )
};

  
export default ShoppingCart