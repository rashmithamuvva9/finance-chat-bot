
import React from 'react';
import type { Message } from '../types';
import { ChatRole } from '../types';
import { UserIcon, BotIcon } from './IconComponents';
import LoadingSpinner from './LoadingSpinner';

interface ChatMessageProps {
  message: Message;
  isLoading: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading }) => {
  const isUser = message.role === ChatRole.USER;

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <BotIcon className="h-6 w-6 text-gray-500 dark:text-gray-300" />
        </div>
      )}
      
      <div className={`max-w-xl p-4 rounded-2xl ${isUser 
        ? 'bg-blue-500 text-white rounded-br-lg' 
        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-lg'}`
      }>
        {isLoading && message.text === '' ? (
          <LoadingSpinner />
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{__html: message.text.replace(/\n/g, '<br />')}}></div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <UserIcon className="h-6 w-6 text-gray-500 dark:text-gray-300" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
