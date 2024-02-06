import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import OrdersPage from "../../../../routes/pages/Orders/OrdersPage";

describe("OrdersPage", () => {
  it("Renders the OrdersPage component", async () => {
    render(<OrdersPage />);

    const titleElement = await screen.findByText("Orders");

    expect(titleElement).toBeInTheDocument();
  });
});
