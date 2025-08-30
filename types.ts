// Fix: Import ComponentType from React to resolve 'Cannot find namespace 'React'' error and use it for the icon property.
import type { ComponentType } from 'react';

export enum ChatRole {
  USER = 'user',
  BOT = 'bot',
}

export interface Message {
  role: ChatRole;
  text: string;
}

export interface UserProfile {
  id: string;
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  systemInstruction: string;
  initialMessage: string;
}
