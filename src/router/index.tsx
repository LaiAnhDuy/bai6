import { Route, Routes } from "react-router-dom";
import ROUTE from "../constants/route";
import HomePage from "../page/Home";
import PublicRoute from "../components/PublicRoute";
import ProductDetail from "../page/ProductDetailPage";
import Shop from "../page/Shop";
import Login from "../page/Login";
import Register from "../page/Register";
import AuthLayout from "../components/AuthLayout";
import Cart from "../page/Cart";

export type RouteType = {
  path: ROUTE | string;
  title?: string;
  isPrivate?: boolean;
  element: () => JSX.Element;
};

const routes: RouteType[] = [
  { path: ROUTE.HOME, title: "HomePage", element: HomePage },
  {
    path: ROUTE.PRODUCT_DETAIL,
    title: "Product Detail",
    element: ProductDetail,
  },
  { path: ROUTE.SHOP, title: "Shop", element: Shop },
  { path: ROUTE.LOGIN, title: "Login", element: Login },
  { path: ROUTE.REGISTER, title: "Register", element: Register },
  { path: ROUTE.CART, title: "Cart", element: Cart },
];

export default function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => {
        const { element: Component } = route;
        const RouteWrapper =
          route.path === ROUTE.LOGIN || route.path === ROUTE.REGISTER
            ? AuthLayout
            : PublicRoute;
        return (
          <Route
            key={route.path}
            {...route}
            element={
              <RouteWrapper>
                <Component />
              </RouteWrapper>
            }
          ></Route>
        );
      })}
    </Routes>
  );
}
