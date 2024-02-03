import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import CatalogPage from "./routes/pages/CatalogPage";
import ErrorPage from "./routes/pages/ErrorPage";

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
