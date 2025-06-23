import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export function Header({ title, onMenuClick }: HeaderProps) {
  const { state } = useApp();
  
  // Calculate low stock alerts
  const lowStockItems = state.products.filter(p => p.stock <= p.minStock);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100 relative transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              {lowStockItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {lowStockItems.length}
                </span>
              )}
            </button>
          </div>

          {state.user?.avatar && (
            <img
              src={state.user.avatar}
              alt={state.user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
        </div>
      </div>
    </header>
  );
}