import ShoppingCart from "./components/ShoppingCart";
import FetchData from "./components/FetchData";
import Home from "./components/Home";
import LoginPage from "./components/Authorization/LoginPage";
import RegisterPage from "./components/Authorization/RegisterPage";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/shopping-cart',
    element: <ShoppingCart />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
];

export default AppRoutes;
