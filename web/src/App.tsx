import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/pages/ErrorPage";
import CatalogPage from "./routes/pages/Catalog";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
