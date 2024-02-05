import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppContextProvider from "./contexts";
import Root from "./routes/Root";
import ErrorPage from "./routes/pages/ErrorPage";
import CatalogPage from "./routes/pages/Catalog";
import OrdersPage from "./routes/pages/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/catalog",
        element: <CatalogPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />;
    </AppContextProvider>
  );
}

export default App;
