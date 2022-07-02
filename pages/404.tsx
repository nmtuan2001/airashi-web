import LayoutError from '../layouts/404';
import { FormattedMessage } from 'react-intl';

const ErrorPage = () => (
  <LayoutError>
    <section className="error-page">
      <div className="container">
        <h1><FormattedMessage id="error_code"></FormattedMessage></h1>
        <p><FormattedMessage id="error_message"></FormattedMessage></p>
        <a href="#" className="btn btn--rounded btn--yellow"><FormattedMessage id="home"></FormattedMessage></a>
      </div>
    </section>
  </LayoutError>
)

export default ErrorPage