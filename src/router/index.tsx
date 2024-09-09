import { Route, Routes } from "react-router-dom";
import ROUTE from "../constants/route";
import HomePage from "../page/Home";
import PublicRoute from "../components/PublicRoute";

export type RouteType = {
  path: ROUTE | string;
  title?: string;
  isPrivate?: boolean;
  element: () => JSX.Element;
};

const routes: RouteType[] = [
  { path: ROUTE.HOME, title: "HomePage", element: HomePage },
];

export default function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => {
        const { element: Component } = route;
        const RouteWrapper = PublicRoute;
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
