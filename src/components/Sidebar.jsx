import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Transaction', href: '/transaction' },
  { name: 'Income', href: '/income' },
  { name: 'Investment', href: '/investment' },
  { name: 'News', href: '/news' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex">
      <Disclosure as="nav" className="bg-gray-800 w-64 min-h-screen">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center p-4">
            <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8 w-auto"
            />
          </div>
          <div className="flex flex-1 flex-col space-y-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                aria-current={item.href === currentPath ? 'page' : undefined}
                className={classNames(
                  item.href === currentPath ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-center p-4">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </Menu.Button>
              </div>
              <Menu.Items
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <Menu.Item>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}


