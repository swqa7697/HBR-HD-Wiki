import { CustomFlowbiteTheme, Navbar } from 'flowbite-react';
import { Link, useLocation } from 'react-router';

const routes = [
  { title: '主页', path: '/' },
  { title: '历史卡池', path: '/gacha-history' },
  { title: '打分顶分记录', path: '/score-attack' },
  { title: 'Hell钟楼解法', path: '/clock-tower' },
  { title: '异时层解法', path: '/hard' },
];

const customNavBarTheme: CustomFlowbiteTheme['navbar'] = {
  root: {
    base: 'bg-pink-800 px-2 py-2 sm:px-4',
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
        <img
          src="assets/logo.webp"
          alt="Logo"
          draggable="false"
          className="h-10 pointer-events-none select-none text-white"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {routes.map((route, idx) => (
          <Navbar.Link
            key={idx}
            as={Link}
            to={route.path}
            active={location.pathname === route.path}
          >
            {route.title}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};
