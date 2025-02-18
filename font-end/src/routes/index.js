import config from "~/config";
import { HeaderOnly } from "~/layouts";
//Pages

// User Pages
import EmailVerication from "~/pages/EmailVerication";
import Film from "~/pages/Film";
import ForgotPassword from "~/pages/ForgotPassword";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import Profile from "~/pages/Profile";
import ResetPassword from "~/pages/ResetPassword";
import Room from "~/pages/Room";
import Search from "~/pages/Search";
import Signup from "~/pages/Signup";
import Upload from "~/pages/Upload";
import Cinema from "../pages/Cinema/index";
import Contact from "../pages/Contact/index";
import Movie from "../pages/Movie/index";
import Order from "../pages/Order/index";
import PaymentCancel from "../pages/PaymentCancel/index";
import PaymentSuccess from "../pages/PaymentSuccess/index";
import Promotion from "../pages/Promotions/index";
import Showtime from "../pages/Showtime/index";

// Define routes configurations
const routes = {
  // Public routes configuration
  public: [
    { path: config.routes.home, component: Home, layout: null },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.signup, component: Signup, layout: HeaderOnly },
    {
      path: config.routes.emailVerication,
      component: EmailVerication,
      layout: HeaderOnly,
    },
    {
      path: config.routes.forgotpassword,
      component: ForgotPassword,
      layout: HeaderOnly,
    },
    {
      path: config.routes.resetpassword,
      component: ResetPassword,
      layout: HeaderOnly,
    },
    {
      path: config.routes.film,
      component: Film,
      layout: HeaderOnly,
    },
    {
      path: config.routes.showtime,
      component: Showtime,
      layout: HeaderOnly,
    },
    {
      path: config.routes.movies,
      component: Movie,
      layout: HeaderOnly,
    },
    {
      path: config.routes.promotions,
      component: Promotion,
      layout: HeaderOnly,
    },
    {
      path: config.routes.cinema,
      component: Cinema,
      layout: HeaderOnly,
    },
    {
      path: config.routes.contact,
      component: Contact,
      layout: HeaderOnly,
    },
  ],

  // Private routes configuration
  private: [
    { path: "/upload", component: Upload, layout: HeaderOnly },
    { path: "/search", component: Search },
    {
      path: config.routes.profile,
      component: Profile,
      layout: HeaderOnly,
    },
    {
      path: config.routes.room,
      component: Room,
      layout: HeaderOnly,
    },
    {
      path: config.routes.order,
      component: Order,
      layout: HeaderOnly,
    },
    {
      path: config.routes.paymentSuccess,
      component: PaymentSuccess,
      layout: HeaderOnly,
    },
    {
      path: config.routes.paymentCancel,
      component: PaymentCancel,
      layout: HeaderOnly,
    },
  ],
};

// Export the routes
export const publicRoutes = routes.public;
export const privateRoutes = routes.private;
