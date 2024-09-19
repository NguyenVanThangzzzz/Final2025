import axios from "axios";
import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.scss";

const cx = classNames.bind(styles);

function LoginPage() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={cx("login_container")}>
      <div className={cx("login_form_container")}>
        <div className={cx("left")}>
          <form className={cx("form_container")} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={cx("input")}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={cx("input")}
            />
            {error && <div className={cx("error_msg")}>{error}</div>}
            <button type="submit" className={cx("green_btn")}>
              Sign In
            </button>
          </form>
        </div>
        <div className={cx("right")}>
          <h1>New Here?</h1>
          <Link to="/signup">
            <button type="button" className={cx("white_btn")}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
