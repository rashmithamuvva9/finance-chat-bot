
import { GoogleGenAI, Chat } from "@google/genai";
import type { UserProfile } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const createChatSession = (userProfile: UserProfile): Chat => {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: userProfile.systemInstruction,
    },
  });
  return chat;
};
