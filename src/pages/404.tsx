import { FormattedMessage } from "react-intl";

import LayoutError from "../layouts/404";

const ErrorPage = () => (
  <LayoutError>
    <section className="error-page">
      <div className="container">
        <h1>
          <FormattedMessage id="error_code" />
        </h1>
        <p>
          <FormattedMessage id="error_message" />
        </p>
        <a href="#" className="btn btn--rounded btn--yellow">
          <FormattedMessage id="home" />
        </a>
      </div>
    </section>
  </LayoutError>
);

export default ErrorPage;
