import config from "~/config";
//Layout
import { HeaderOnly } from "~/layouts";
//Pages

import EmailVerication from "~/pages/EmailVerication";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import Signup from "~/pages/Signup";
//////////////////////////////////////////////////////////////
import Profile from "~/pages/Profile";
import Search from "~/pages/Search";
import Showtime from "~/pages/Showtime";
import Upload from "~/pages/Upload";

//publicRoutes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Login, layout: HeaderOnly },
  { path: config.routes.signup, component: Signup, layout: HeaderOnly },
  { path: config.routes.profile, component: Profile, layout: HeaderOnly },
  {
    path: config.routes.emailVerication,
    component: EmailVerication,
    layout: HeaderOnly,
  },

  //////////////////////////////////////////////////////////////
  { path: "/showtime", component: Showtime },
  { path: "/upload", component: Upload, layout: HeaderOnly },
  { path: "/search", component: Search, layout: null },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
