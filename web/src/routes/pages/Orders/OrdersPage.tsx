import { useEffect } from "react";
import Page from "../../../components/layout/Page";
import { useOrdersContext } from "../../../contexts/orders";

export default function OrdersPage() {
  const {
    listing: { data },
    onLoadOrders,
    onDeleteOrder,
  } = useOrdersContext();

  useEffect(() => {
    onLoadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page id="orders" title="Orders" subtitle="List of Orders">
      <div className="m-5 flex justify-center text-center">
        <div className="w-full">
          {data?.map((order) => (
            <div
              key={order.id}
              className="mb-10 border border-teal-700 text-left hover:bg-teal-50"
            >
              <div className="border-b bg-teal-700 px-4 py-2 text-right text-white">
                Order: <span className="font-semibold">#{order.id}</span>
              </div>
              <div className="px-4 py-2">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="h-10 border-b">
                      <th>Product Name</th>
                      <th>Product Id</th>
                      <th className="text-right">Quantity</th>
                      <th className="text-right">Price</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product) => (
                      <tr key={product.id}>
                        <td className="py-2">{product.name}</td>
                        <td className="py-2">{product.id}</td>
                        <td className="py-2 text-right">1</td>
                        <td className="py-2 text-right">149</td>
                        <td className="py-2 text-right">149</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t">
                    <tr>
                      <td colSpan={2}></td>
                      <td colSpan={3}>
                        <div className="pt-2">
                          <div className="border-b py-2 font-semibold">
                            Total of Order
                          </div>
                          <div className="flex justify-between py-1">
                            <span>Items:</span>{" "}
                            <span className="font-semibold">2</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span>Value:</span>{" "}
                            <span className="font-semibold">298</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div>
                <button
                  type="button"
                  title="Delete Order"
                  className="text-md flex items-center rounded bg-red-700 p-2 text-center font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
                  onClick={() => onDeleteOrder()}
                >
                  Delete Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
