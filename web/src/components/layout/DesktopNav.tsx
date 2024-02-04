import { Link } from "react-router-dom";

export default function DesktopNav() {
  return (
    <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
      <div className="text-sm lg:flex-grow">
        <Link
          to="catalog"
          className="mr-4 mt-4 block text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
        >
          Catalog
        </Link>
      </div>
      <div>{/* cart icons */}</div>
    </div>
  );
}
