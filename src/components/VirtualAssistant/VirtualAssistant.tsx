import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  X, Mic, MicOff, Send, Volume2, VolumeX, 
  Settings, Trash2, MessageCircle, ChevronDown 
} from 'lucide-react';
import { AnimatedAvatar } from './AnimatedAvatar';
import { ChatMessage, TypingIndicator } from './ChatMessage';
import { QuickSuggestions } from './QuickSuggestions';
import { useSpeechRecognition } from './useSpeechRecognition';
import { useAssistantNLP } from './useAssistantNLP';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { Message, QuickSuggestion, AvatarState } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: 'Olá! 👋 Sou o assistente virtual do KB_TOTEM. Como posso ajudar você hoje?',
  timestamp: new Date(),
};

export const VirtualAssistant = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<QuickSuggestion[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { processMessage, getInitialSuggestions } = useAssistantNLP();
  const { speak, stop: stopSpeaking, isSpeaking, rate, setRate } = useTextToSpeech();

  const handleSpeechResult = useCallback((transcript: string) => {
    setInputText(prev => prev + transcript + ' ');
  }, []);

  const handleSpeechEnd = useCallback(() => {
    setAvatarState('idle');
    // Auto-send if we have text
    if (inputText.trim()) {
      handleSendMessage();
    }
  }, [inputText]);

  const { 
    isListening, 
    isSupported: speechSupported,
    interimTranscript,
    startListening, 
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    onResult: handleSpeechResult,
    onEnd: handleSpeechEnd,
    onError: (error) => {
      console.error('Speech recognition error:', error);
      setAvatarState('error');
      setTimeout(() => setAvatarState('idle'), 2000);
    },
  });

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Set initial suggestions when chat opens
  useEffect(() => {
    if (isOpen && currentSuggestions.length === 0) {
      setCurrentSuggestions(getInitialSuggestions());
    }
  }, [isOpen, currentSuggestions.length, getInitialSuggestions]);

  // Update avatar state based on listening/speaking
  useEffect(() => {
    if (isListening) {
      setAvatarState('listening');
    } else if (isSpeaking) {
      setAvatarState('speaking');
    } else if (isTyping) {
      setAvatarState('processing');
    } else {
      setAvatarState('idle');
    }
  }, [isListening, isSpeaking, isTyping]);

  const handleSendMessage = useCallback(async () => {
    const text = inputText.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    resetTranscript();
    setIsTyping(true);
    setAvatarState('processing');
    setCurrentSuggestions([]);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 500));

    // Process with NLP
    const { response, suggestions } = processMessage(text);

    // Add assistant response
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
      suggestions,
    };
    setMessages(prev => [...prev, assistantMessage]);
    setCurrentSuggestions(suggestions);
    setIsTyping(false);
    setAvatarState('idle');

    // Speak response if voice enabled
    if (voiceEnabled) {
      setAvatarState('speaking');
      speak(response);
    }
  }, [inputText, processMessage, speak, voiceEnabled, resetTranscript]);

  const handleSuggestionSelect = useCallback((suggestion: QuickSuggestion) => {
    const action = suggestion.action;

    if (action.startsWith('navigate:')) {
      const path = action.replace('navigate:', '');
      navigate(path);
      setIsOpen(false);
      return;
    }

    if (action.startsWith('category:')) {
      const category = action.replace('category:', '');
      setInputText(`Problemas de ${category}`);
      return;
    }

    // Treat other actions as text input
    setInputText(suggestion.label);
    setTimeout(() => handleSendMessage(), 100);
  }, [navigate, handleSendMessage]);

  const handleVoiceToggle = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  const handleClearChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    setCurrentSuggestions(getInitialSuggestions());
    stopSpeaking();
  }, [getInitialSuggestions, stopSpeaking]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, [handleSendMessage]);

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <AnimatedAvatar
              state={avatarState}
              size="lg"
              onClick={() => setIsOpen(true)}
            />
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full"
            >
              Ajuda
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed z-50 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden',
              'flex flex-col',
              // Mobile: full screen with padding
              'inset-4 sm:inset-auto',
              // Desktop: fixed size bottom right
              'sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[600px] sm:max-h-[80vh]'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
              <div className="flex items-center gap-3">
                <AnimatedAvatar state={avatarState} size="sm" />
                <div>
                  <h3 className="font-semibold text-sm">Assistente Virtual</h3>
                  <p className="text-xs text-muted-foreground">
                    {isListening ? 'Ouvindo...' : isSpeaking ? 'Falando...' : 'Online'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className="h-8 w-8"
                  title={voiceEnabled ? 'Desativar voz' : 'Ativar voz'}
                >
                  {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                  className="h-8 w-8"
                  title="Configurações"
                >
                  <Settings size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClearChat}
                  className="h-8 w-8"
                  title="Limpar conversa"
                >
                  <Trash2 size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                  title="Fechar"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-border bg-secondary/20 overflow-hidden"
                >
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Velocidade da voz: {rate.toFixed(1)}x</label>
                      <Slider
                        value={[rate]}
                        onValueChange={([value]) => setRate(value)}
                        min={0.5}
                        max={2}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage 
                    key={message.id} 
                    message={message}
                    isLatest={message.id === messages[messages.length - 1]?.id}
                  />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Suggestions */}
            {currentSuggestions.length > 0 && (
              <div className="px-4 py-2 border-t border-border/50">
                <QuickSuggestions
                  suggestions={currentSuggestions}
                  onSelect={handleSuggestionSelect}
                />
              </div>
            )}

            {/* Live Transcript */}
            <AnimatePresence>
              {(isListening && interimTranscript) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 py-2 bg-blue-500/10 border-t border-blue-500/20"
                >
                  <p className="text-sm text-blue-600 dark:text-blue-400 italic">
                    "{interimTranscript}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-secondary/20">
              <div className="flex items-center gap-2">
                {speechSupported && (
                  <Button
                    variant={isListening ? 'default' : 'outline'}
                    size="icon"
                    onClick={handleVoiceToggle}
                    className={cn(
                      'h-10 w-10 rounded-full shrink-0',
                      isListening && 'bg-red-500 hover:bg-red-600'
                    )}
                    title={isListening ? 'Parar de ouvir' : 'Falar'}
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </Button>
                )}
                <Input
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Digite ou fale sua mensagem..."
                  className="flex-1 rounded-full"
                  disabled={isListening}
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="h-10 w-10 rounded-full shrink-0"
                  title="Enviar"
                >
                  <Send size={18} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Pressione Enter para enviar • Espaço para falar
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
