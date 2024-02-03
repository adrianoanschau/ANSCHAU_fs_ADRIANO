export default function DesktopNav() {
  return (
    <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
      <div className="text-sm lg:flex-grow">
        <a
          href="#responsive-header"
          className="mr-4 mt-4 block text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
        >
          Catalog
        </a>
      </div>
      <div>
        <a
          href="#"
          className="mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-teal-500 lg:mt-0"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}
