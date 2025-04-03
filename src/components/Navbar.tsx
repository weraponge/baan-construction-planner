
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, CalendarCheck, Calculator, Package2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Projects', href: '/projects', icon: <CalendarCheck className="h-5 w-5" /> },
    { name: 'Cost Estimator', href: '/estimator', icon: <Calculator className="h-5 w-5" /> },
    { name: 'Inventory', href: '/inventory', icon: <Package2 className="h-5 w-5" /> },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-construction-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-construction-yellow font-bold text-xl">BAAN</span>
              <span className="text-white font-medium ml-1">Construction</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'bg-construction-blue text-construction-yellow'
                        : 'text-gray-200 hover:bg-opacity-75 hover:text-white'
                    } px-3 py-2 rounded-md text-sm font-medium flex items-center`}
                  >
                    <span className="mr-1.5">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Button className="bg-construction-yellow text-construction-blue hover:bg-opacity-90">
              New Project
            </Button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-construction-yellow focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-construction-blue">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive(item.href)
                    ? 'bg-opacity-25 text-construction-yellow'
                    : 'text-gray-200 hover:bg-opacity-25 hover:text-white'
                } block px-3 py-2 rounded-md text-base font-medium flex items-center`}
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <Button className="w-full bg-construction-yellow text-construction-blue hover:bg-opacity-90">
                New Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
