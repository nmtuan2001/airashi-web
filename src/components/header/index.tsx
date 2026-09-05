import Link from "next/link";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import useOnClickOutside from "use-onclickoutside";

import type { RootState } from "@/store";

import Logo from "../../assets/icons/logo";

type HeaderType = {
  isErrorPage?: boolean;
};

const HEADER_TRANSPARENT_PATHS = ["/"];

const Header = ({ isErrorPage }: HeaderType) => {
  const router = useRouter();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const [onTop, setOnTop] = useState(
    !(!HEADER_TRANSPARENT_PATHS.includes(router.pathname) || isErrorPage),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);
  const intl = useIntl();
  const [cookie, setCookie] = useCookies(["NEXT_LOCALE"]);
  const { locale } = router;

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    if (!HEADER_TRANSPARENT_PATHS.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, [isErrorPage, router.pathname]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  const switchLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    router.push(router.asPath, router.asPath, { locale: nextLocale });
    if (cookie.NEXT_LOCALE !== nextLocale) {
      setCookie("NEXT_LOCALE", nextLocale, { path: "/" });
    }
  };

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <Link href="/">
          <h1 className="site-logo">
            <Logo />
            Airashi Silk
          </h1>
        </Link>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <Link href="/products">
            <FormattedMessage id="products" />
          </Link>
          <a href="#">
            <FormattedMessage id="women" />
          </a>
          <a href="#">
            <FormattedMessage id="men" />
          </a>
          <button className="site-nav__btn">
            <p>Account</p>
          </button>
        </nav>

        <div className="site-header__actions">
          <button
            ref={searchRef}
            className={`search-form-wrapper ${searchOpen ? "search-form--active" : ""}`}
          >
            <form className="search-form">
              <i
                className="icon-cancel"
                onClick={() => setSearchOpen(!searchOpen)}
              />
              <input
                type="text"
                name="search"
                placeholder={intl.formatMessage({ id: "search" })}
              />
            </form>
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            />
          </button>
          <div className="select-wrapper">
            <select onChange={switchLanguage} defaultValue={locale}>
              <option value="vi">VI</option>
              <option value="en">EN</option>
            </select>
          </div>
          <Link href="/cart" legacyBehavior>
            <button className="btn-cart">
              <i className="icon-cart" />
              {cartItems.length > 0 && (
                <span className="btn-cart__count">{cartItems.length}</span>
              )}
            </button>
          </Link>
          <Link href="/login" legacyBehavior>
            <button className="site-header__btn-avatar">
              <i className="icon-avatar" />
            </button>
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span />
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
