type CreateOrderControlsProps = {
  fetching?: boolean;
  onCreate: () => void;
};

export default function CreateOrderControls({
  fetching = false,
  onCreate,
}: CreateOrderControlsProps) {
  return (
    <button
      type="button"
      title="Empty Cart"
      className={[
        "text-md flex items-center rounded bg-green-700 p-2 text-center font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300",
        fetching && "disabled:opacity-50",
      ].join(" ")}
      disabled={fetching}
      onClick={() => onCreate()}
    >
      Create Order
    </button>
  );
}
