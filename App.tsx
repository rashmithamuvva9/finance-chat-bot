
import React, { useState } from 'react';
import type { UserProfile } from './types';
import { USER_PROFILES } from './constants';
import ChatView from './components/ChatView';
import UserProfileSelector from './components/UserProfileSelector';
import Header from './components/Header';

const App: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);

  const handleProfileSelect = (profile: UserProfile) => {
    setSelectedProfile(profile);
  };
  
  const handleBackToProfiles = () => {
    setSelectedProfile(null);
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header selectedProfile={selectedProfile} onBack={handleBackToProfiles} />
      <main className="flex-grow container mx-auto p-4 flex flex-col">
        {selectedProfile ? (
          <ChatView userProfile={selectedProfile} />
        ) : (
          <UserProfileSelector profiles={USER_PROFILES} onProfileSelect={handleProfileSelect} />
        )}
      </main>
      <footer className="text-center p-4 text-xs text-gray-500 dark:text-gray-400">
        <p>Disclaimer: This chatbot provides financial information for educational purposes only. It is not a substitute for professional financial advice. All conversations are stateless and not saved.</p>
      </footer>
    </div>
  );
};

export default App;
