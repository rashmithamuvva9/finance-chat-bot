
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Message, UserProfile } from '../types';
import { ChatRole } from '../types';
import { createChatSession } from '../services/geminiService';
import type { Chat } from '@google/genai';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface ChatViewProps {
  userProfile: UserProfile;
}

const ChatView: React.FC<ChatViewProps> = ({ userProfile }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const initializeChat = useCallback(() => {
    chatRef.current = createChatSession(userProfile);
    setMessages([{ role: ChatRole.BOT, text: userProfile.initialMessage }]);
  }, [userProfile]);
  
  useEffect(() => {
    initializeChat();
  }, [initializeChat]);


  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: ChatRole.USER, text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const botMessage: Message = { role: ChatRole.BOT, text: '' };
    setMessages(prev => [...prev, botMessage]);

    try {
      if (!chatRef.current) {
        throw new Error("Chat session not initialized");
      }
      
      const stream = await chatRef.current.sendMessageStream({ message: text });

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === ChatRole.BOT) {
            lastMessage.text += chunkText;
          }
          return newMessages;
        });
      }

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.role === ChatRole.BOT) {
          lastMessage.text = "Sorry, I encountered an error. Please try again.";
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full">
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} isLoading={isLoading && index === messages.length - 1} />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatView;
