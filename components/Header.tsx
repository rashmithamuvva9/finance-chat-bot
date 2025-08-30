
import React from 'react';
import type { UserProfile } from '../types';
import { FinanceIcon, BackIcon } from './IconComponents';

interface HeaderProps {
  selectedProfile: UserProfile | null;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ selectedProfile, onBack }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FinanceIcon className="h-8 w-8 text-blue-500" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Personal Finance Chatbot
          </h1>
        </div>
        {selectedProfile && (
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{selectedProfile.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Mode</p>
            </div>
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
              aria-label="Change Profile"
            >
              <BackIcon className="h-4 w-4" />
              <span>Change</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
