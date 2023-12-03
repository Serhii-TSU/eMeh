import ShoppingCart from "./components/ShoppingCart";
import FetchData from "./components/FetchData";
import Home from "./components/Home";

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
  }
];

export default AppRoutes;
