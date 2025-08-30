
import React from 'react';
import type { UserProfile } from '../types';

interface UserProfileSelectorProps {
  profiles: UserProfile[];
  onProfileSelect: (profile: UserProfile) => void;
}

const UserProfileSelector: React.FC<UserProfileSelectorProps> = ({ profiles, onProfileSelect }) => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome to FinPal!</h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">To get started, please tell me a little about yourself.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => onProfileSelect(profile)}
            className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <profile.icon className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{profile.name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{profile.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserProfileSelector;
