import { Outlet } from "react-router";

function Root() {
  return (
    <main id="main">
      <Outlet />
    </main>
  );
}

export default Root;
