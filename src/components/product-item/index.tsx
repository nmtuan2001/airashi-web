import { some } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/store";
import { toggleFavProduct } from "@/store/reducers/user";
import type { ProductTypeList } from "@/types";

const ProductItem = ({
  discount,
  images,
  id,
  name,
  price,
  currentPrice,
}: ProductTypeList) => {
  const dispatch = useDispatch();
  const { favProducts } = useSelector((state: RootState) => state.user);
  const { locale } = useRouter();

  const isFavourite = some(favProducts, (productId) => productId === id);

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id,
      }),
    );
  };

  const priceFormatter = (value?: number) => {
    if (value === undefined) return "";
    return locale === "vi" ? `${value}₫` : `$${Math.round(value / 23315)}`;
  };

  const displayName = Array.isArray(name)
    ? name[locale === "vi" ? 1 : 0]
    : name;

  return (
    <div className="product-item">
      <div className="product__image">
        <button
          type="button"
          onClick={toggleFav}
          className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
        >
          <i className="icon-heart" />
        </button>

        <Link href={`/product/${id}`}>
          <img src={images ? images[0] : ""} alt="product" />
          {discount && <span className="product__discount">{discount}%</span>}
        </Link>
      </div>
      <div className="product__description">
        <h3>{displayName}</h3>
        <div
          className={`product__price ${discount ? "product__price--discount" : ""}`}
        >
          <h4>{priceFormatter(currentPrice)}</h4>

          {discount && (
            <span>
              <del>{priceFormatter(price)}</del>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
