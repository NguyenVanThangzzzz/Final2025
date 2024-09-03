import {
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn,
  faPinterestP,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "./Header.module.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("header-top-area")}>
        <div>
          <div className={cx("container-header-top")}>
            <div className={cx("header-top-social")}>
              <Button href="https://facebook.com" className={cx("social-icon")}>
                <FontAwesomeIcon icon={faFacebookF} />
              </Button>
              <Button href="/" className={cx("social-icon")}>
                <FontAwesomeIcon icon={faTwitter} />
              </Button>
              <Button
                href="https://plus.google.com"
                className={cx("social-icon")}
              >
                <FontAwesomeIcon icon={faGooglePlusG} />
              </Button>
              <Button href="https://linkedin.com" className={cx("social-icon")}>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Button>
              <Button
                href="https://pinterest.com"
                className={cx("social-icon")}
              >
                <FontAwesomeIcon icon={faPinterestP} />
              </Button>
            </div>

            <div className={cx("header-top-menu")}>
              <div className={cx("actions")}>
                <Button>Đăng nhập</Button>
              </div>
              <div className={cx("actions")}>
                <Button>Đăng Ký</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("main-header-area")}>
        <div className={cx("container-main-header")}>
          <div className={cx("row-header-main")}>
            <div className={cx("site-logo")}>
              <a href="/">
                <img src="https://starlight.vn/Content/img/logo.png" alt="" />
              </a>
            </div>
            <div className={cx("main-menu")}>
              <nav>
                <ul>
                  <li>
                    <a href="/">Trang chủ</a>
                  </li>
                  <li>
                    <a href="/san-pham">Sản phẩm</a>
                  </li>
                  <li>
                    <a href="/gioi-thieu">Giới thiệu</a>
                  </li>
                  <li>
                    <a href="/tin-tuc">Tin tức</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
