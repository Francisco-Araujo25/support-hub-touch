export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: QuickSuggestion[];
}

export interface QuickSuggestion {
  id: string;
  label: string;
  icon?: string;
  action: string;
}

export interface AssistantIntent {
  type: 'greeting' | 'problem' | 'search' | 'tutorial' | 'question' | 'navigation' | 'unknown';
  category?: 'hardware' | 'software';
  problemId?: string;
  keywords: string[];
  confidence: number;
}

export type AvatarState = 'idle' | 'listening' | 'processing' | 'speaking' | 'success' | 'error';

export interface ConversationContext {
  currentCategory?: string;
  currentProblem?: string;
  previousTopics: string[];
  userPreferences: {
    voiceEnabled: boolean;
    voiceGender: 'male' | 'female';
    voiceSpeed: number;
  };
}
