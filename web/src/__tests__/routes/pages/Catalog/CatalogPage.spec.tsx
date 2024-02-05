import CatalogPage from "@/routes/pages/Catalog/CatalogPage";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

test("Renders the CatalogPage component", () => {
  render(<CatalogPage />);

  expect(true).toBeTruthy();
});
