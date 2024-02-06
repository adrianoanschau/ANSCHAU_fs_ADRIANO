import "@testing-library/jest-dom";
import { Server } from "miragejs";
import { render, screen } from "@testing-library/react";
import CatalogPage from "../../../../routes/pages/Catalog/CatalogPage";
import { makeServer } from "../../../../test/__mocks__/server";

describe("CatalogPage", () => {
  let server: Server;

  beforeEach(() => {
    render(<CatalogPage />);
    server = makeServer();
  });

  afterEach(() => {
    server.shutdown();
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
