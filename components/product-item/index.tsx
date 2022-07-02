import Link from 'next/link';
import { some } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavProduct } from 'store/reducers/user';
import { RootState } from 'store';
import { ProductItem } from 'types';
import { useRouter } from 'next/router';

const ProductItem = ({ discount, images, id, name, price, currentPrice }: ProductItem) => {
  const dispatch = useDispatch();
  const { favProducts } = useSelector((state: RootState) => state.user);
  const { locale } = useRouter();

  const isFavourite = some(favProducts, productId => productId === id);

  const toggleFav = () => {
    dispatch(toggleFavProduct(
      { 
        id,
      }
    ))
  }

  const dollarToVND = 23315;

  const priceFormatter = (price: number) => {
    switch (locale) {
      case "vi":
        return price + "₫";

      case "en":
        return "$" + Math.round(price / dollarToVND);

      default:
        return;
    }
  }
  
  return (
    <div className="product-item">
      <div className="product__image">
        <button type="button" onClick={toggleFav} className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>

        <Link href={`/product/${id}`}>
          <a>
            <img src={images ? images[0] : ''} alt="product" />
            {discount &&
              <span className="product__discount">{discount}%</span>
            }
          </a>
        </Link>
      </div>
      
      <div className="product__description">
        <h3>{name}</h3>
        <div className={"product__price " + (discount ? 'product__price--discount' : '')} >
          <h4>{ priceFormatter(currentPrice!) }</h4>

          {discount && price &&
            <span><del>{ priceFormatter(price) }</del></span>
          }
        </div>
      </div>
    </div>
  )
};


export default ProductItem