type CartResetControlsProps = {
  onReset: () => void;
};

export default function CartResetControls({ onReset }: CartResetControlsProps) {
  return (
    <button
      type="button"
      title="Reset Cart"
      className="text-md flex items-center rounded bg-red-700 p-2 text-center font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
      onClick={() => onReset()}
    >
      Reset Cart
    </button>
  );
}
