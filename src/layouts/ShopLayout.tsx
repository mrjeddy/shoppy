import { Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function ShopLayout() {
  return (
    <Fragment>
      <TopBar />
      <Outlet />
    </Fragment>
  );
}
