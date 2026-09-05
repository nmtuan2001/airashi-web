import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";

import type { RootState } from "@/store";

import CheckoutStatus from "../checkout-status";
import Item from "./item";

const ShoppingCart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const intl = useIntl();

  const priceTotal = () => {
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((item) => (totalPrice += item.price * item.count));
    }

    return totalPrice;
  };

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">
            <FormattedMessage id="cart" />
          </h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {cartItems.length > 0 && (
            <table>
              <tbody>
                <tr>
                  <th style={{ textAlign: "left" }}>
                    <FormattedMessage id="products" />
                  </th>
                  <th>
                    <FormattedMessage id="color" />
                  </th>
                  <th>
                    <FormattedMessage id="size" />
                  </th>
                  <th>
                    <FormattedMessage id="amount" />
                  </th>
                  <th>
                    <FormattedMessage id="price" />
                  </th>
                  <th />
                </tr>

                {cartItems.map((item) => (
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
          )}

          {cartItems.length === 0 && (
            <p>
              <FormattedMessage id="no_item" />
            </p>
          )}
        </div>

        <div className="cart-actions">
          <Link href="/products" className="cart__btn-back">
            <i className="icon-left" /> <FormattedMessage id="continue" />
          </Link>
          <input
            type="text"
            placeholder={intl.formatMessage({ id: "promo" })}
            className="cart__promo-code"
          />

          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">
              <FormattedMessage id="total" />{" "}
              <strong>${priceTotal().toFixed(2)}</strong>
            </p>
            <Link
              href="/cart/checkout"
              className="btn btn--rounded btn--yellow"
            >
              <FormattedMessage id="checkout" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
