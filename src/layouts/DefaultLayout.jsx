import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header/Header";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
