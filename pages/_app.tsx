// @ts-nocheck

import React, { Fragment } from 'react';
import Router from 'next/router';
import {wrapper} from '../store';
import { IntlProvider } from 'react-intl';
import { useRouter } from "next/router"

// types
import type { AppProps } from 'next/app';

// global styles
import 'swiper/swiper.scss';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import '../assets/css/styles.scss';

import * as gtag from './../utils/gtag';

const isProduction = process.env.NODE_ENV === 'production';

// only events on production
if(isProduction) {
  
  // Notice how we track pageview when route is changed
  Router.events.on('routeChangeComplete', (url: string) => gtag.pageview(url));
}

const languages = {
  vi: require('../public/locales/vi.json'),
  en: require('../public/locales/en.json'),
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { locale, defaultLocale } = useRouter();
  return <Fragment>
    <IntlProvider messages={languages[locale]} locale={locale} defaultLocale={defaultLocale}>
      <Component {...pageProps} />
    </IntlProvider>
  </Fragment>
};

export default wrapper.withRedux(MyApp);