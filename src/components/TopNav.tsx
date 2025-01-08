import { CustomFlowbiteTheme, Navbar } from 'flowbite-react';
import { Link, useLocation } from 'react-router';
import { navRoutes } from '../util/site-routes';

const customNavBarTheme: CustomFlowbiteTheme['navbar'] = {
  root: {
    base: 'bg-pink-800 px-2 py-2 sm:px-4 lg:px-32',
  },
  collapse: {
    list: 'mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8',
  },
  link: {
    base: 'block py-2 pl-3 pr-4 md:p-0',
    active: {
      on: 'bg-orange-300 text-white hover:text-white font-semibold md:bg-transparent md:text-orange-200 md:hover:text-orange-200 md:font-semibold',
      off: 'border-b border-gray-100 text-white hover:text-black hover:bg-gray-50 md:border-0 md:text-white md:hover:bg-transparent md:hover:text-sky-200 md:font-semibold',
    },
  },
  toggle: {
    base: 'inline-flex items-center rounded-lg p-2 text-sm text-gray-500 bg-slate-100 hover:bg-slate-200 focus:outline-none md:hidden',
    icon: 'h-5 w-5 shrink-0',
  },
};

export const TopNav = () => {
  const location = useLocation();

  return (
    <Navbar fluid theme={customNavBarTheme}>
      <Navbar.Brand>
        <div className="flex relative w-16 h-10 pointer-events-none select-none text-white">
          <img
            src="/assets/stickers/2/499421868@2x.avif"
            alt="Logo"
            draggable="false"
            className="absolute w-full h-auto -translate-y-1/2 top-[14px]"
          />
          <div className="absolute inset-0 bg-transparent" />
        </div>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {navRoutes.map((route, idx) => (
          <Navbar.Link
            key={idx}
            as={Link}
            to={route.path}
            active={location.pathname === route.path}
          >
            {route.name}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};
