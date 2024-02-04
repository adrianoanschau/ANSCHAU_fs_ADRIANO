type ItemCartControlsProps = {
  onIncreaseItem: () => void;
  onDecreaseItem: () => void;
  onRemoveItem: () => void;
};

export default function ItemCartControls({
  onIncreaseItem,
  onDecreaseItem,
  onRemoveItem,
}: ItemCartControlsProps) {
  return (
    <>
      <button
        type="button"
        title="Increase Item"
        className="me-2 inline-flex items-center rounded-full bg-blue-700 p-1 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={() => onIncreaseItem()}
      >
        <svg
          className="h-4 w-4 text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14m-7 7V5"
          />
        </svg>
      </button>

      <button
        type="button"
        title="Decrease Item"
        className="me-2 inline-flex items-center rounded-full bg-blue-700 p-1 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={() => onDecreaseItem()}
      >
        <svg
          className="h-4 w-4 text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14"
          />
        </svg>
      </button>

      <button
        type="button"
        title="Remove Item"
        className="me-2 inline-flex items-center rounded-full bg-red-700 p-1 text-center text-xs font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
        onClick={() => onRemoveItem()}
      >
        <svg
          className="h-4 w-4 text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18 18 6m0 12L6 6"
          />
        </svg>
      </button>
    </>
  );
}
