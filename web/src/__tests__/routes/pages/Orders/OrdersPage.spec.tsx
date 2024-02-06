import "@testing-library/jest-dom";
import OrdersPage from "@/routes/pages/Orders/OrdersPage";
import { render, screen } from "@testing-library/react";

describe("OrdersPage", () => {
  it("Renders the OrdersPage component", async () => {
    render(<OrdersPage />);

    const titleElement = await screen.findByText("Orders");

    expect(titleElement).toBeInTheDocument();
  });
});
