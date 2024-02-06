import { Outlet } from "react-router-dom";
import { Header } from "../components/layout";

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
