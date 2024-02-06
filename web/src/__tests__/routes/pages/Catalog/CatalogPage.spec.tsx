import "@testing-library/jest-dom";
import CatalogPage from "@/routes/pages/Catalog/CatalogPage";
import { render, screen } from "@testing-library/react";

describe("CatalogPage", () => {
  beforeEach(() => {
    render(<CatalogPage />);
  });

  it("Renders the CatalogPage component", async () => {
    const titleElement = await screen.findByText("Catalog");

    expect(titleElement).toBeInTheDocument();
  });

  it("loads and display list of products", async () => {
    const catalogProductsList = await screen.findByTestId("catalog-products");

    expect(catalogProductsList).toBeInTheDocument();
  });
});
