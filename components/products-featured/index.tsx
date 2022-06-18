import ProductsCarousel from './carousel';
import useSwr from 'swr';
import { FormattedMessage } from 'react-intl';

const ProductsFeatured = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSwr('/api/products', fetcher);

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3><FormattedMessage id="featured"></FormattedMessage></h3>
          <a href="/products" className="btn btn--rounded btn--border"><FormattedMessage id="view"></FormattedMessage></a>
        </header>

        <ProductsCarousel products={data} />
      </div>
    </section>
  )
};

export default ProductsFeatured