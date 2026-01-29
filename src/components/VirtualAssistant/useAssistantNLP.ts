import { useCallback } from 'react';
import { categories } from '@/data/problems';
import { AssistantIntent, QuickSuggestion, Message } from './types';

// Keyword mappings for intent detection
const intentKeywords = {
  problem: ['problema', 'erro', 'não funciona', 'não liga', 'travou', 'lento', 'quebrou', 'danificado', 'parou'],
  search: ['buscar', 'procurar', 'encontrar', 'onde', 'como acho'],
  tutorial: ['como', 'tutorial', 'passo a passo', 'ensinar', 'aprender', 'explicar'],
  question: ['o que é', 'para que serve', 'qual', 'porque', 'por que'],
  navigation: ['ir para', 'abrir', 'mostrar', 'ver', 'quero ver'],
  greeting: ['oi', 'olá', 'bom dia', 'boa tarde', 'boa noite', 'hey', 'eai', 'e aí'],
};

const categoryKeywords = {
  hardware: ['hardware', 'pc', 'computador', 'fonte', 'placa', 'cooler', 'usb', 'pendrive', 'hd', 'ssd', 'monitor', 'teclado', 'mouse', 'memória', 'ram', 'processador', 'cpu', 'gabinete'],
  software: ['software', 'programa', 'sistema', 'windows', 'antivírus', 'vírus', 'backup', 'firewall', 'atualização', 'driver', 'instalação', 'aplicativo', 'app'],
};

// Synonym mappings
const synonyms: Record<string, string[]> = {
  'computador': ['pc', 'máquina', 'desktop', 'notebook', 'laptop'],
  'lento': ['devagar', 'travando', 'demorado', 'lerdo'],
  'não liga': ['não inicia', 'não funciona', 'desligado', 'morto'],
  'vírus': ['malware', 'infectado', 'trojan', 'ransomware'],
};

export const useAssistantNLP = () => {
  const detectIntent = useCallback((input: string): AssistantIntent => {
    const normalizedInput = input.toLowerCase().trim();
    let detectedType: AssistantIntent['type'] = 'unknown';
    let category: 'hardware' | 'software' | undefined;
    let problemId: string | undefined;
    const keywords: string[] = [];
    let maxConfidence = 0;

    // Detect intent type
    for (const [intent, words] of Object.entries(intentKeywords)) {
      for (const word of words) {
        if (normalizedInput.includes(word)) {
          keywords.push(word);
          const confidence = word.length / normalizedInput.length;
          if (confidence > maxConfidence) {
            maxConfidence = confidence;
            detectedType = intent as AssistantIntent['type'];
          }
        }
      }
    }

    // Detect category
    for (const [cat, words] of Object.entries(categoryKeywords)) {
      for (const word of words) {
        if (normalizedInput.includes(word)) {
          category = cat as 'hardware' | 'software';
          keywords.push(word);
          break;
        }
      }
    }

    // Try to match specific problem
    for (const cat of categories) {
      for (const problem of cat.problemas) {
        const titleMatch = problem.titulo.toLowerCase();
        const tagMatches = problem.tags.filter(tag => normalizedInput.includes(tag));
        
        if (normalizedInput.includes(titleMatch) || tagMatches.length >= 2) {
          problemId = problem.id;
          category = cat.id as 'hardware' | 'software';
          keywords.push(...tagMatches);
          maxConfidence = Math.max(maxConfidence, 0.8);
          break;
        }
      }
    }

    return {
      type: detectedType,
      category,
      problemId,
      keywords,
      confidence: Math.min(maxConfidence + (keywords.length * 0.1), 1),
    };
  }, []);

  const generateResponse = useCallback((intent: AssistantIntent, input: string): { 
    response: string; 
    suggestions: QuickSuggestion[] 
  } => {
    const suggestions: QuickSuggestion[] = [];

    // Greeting response
    if (intent.type === 'greeting') {
      return {
        response: 'Olá! 👋 Sou o assistente virtual do KB_TOTEM. Estou aqui para ajudar você a resolver problemas técnicos de hardware e software. Como posso ajudar?',
        suggestions: [
          { id: '1', label: 'Tenho um problema', icon: '🔧', action: 'problem' },
          { id: '2', label: 'Quero buscar algo', icon: '🔍', action: 'search' },
          { id: '3', label: 'Preciso de um tutorial', icon: '📖', action: 'tutorial' },
          { id: '4', label: 'Tenho uma dúvida', icon: '❓', action: 'question' },
        ],
      };
    }

    // Problem detection with category
    if (intent.type === 'problem' && intent.category) {
      const cat = categories.find(c => c.id === intent.category);
      if (cat) {
        const relatedProblems = cat.problemas.filter(p => 
          intent.keywords.some(k => p.tags.includes(k) || p.titulo.toLowerCase().includes(k))
        ).slice(0, 4);

        if (relatedProblems.length > 0) {
          return {
            response: `Entendi que você está tendo um problema com ${intent.category}. Encontrei algumas soluções que podem ajudar:`,
            suggestions: relatedProblems.map((p, i) => ({
              id: p.id,
              label: p.titulo,
              icon: intent.category === 'hardware' ? '💻' : '⚙️',
              action: `navigate:/categoria/${intent.category}/problema/${p.id}`,
            })),
          };
        }
      }
    }

    // General problem without category
    if (intent.type === 'problem') {
      return {
        response: 'Vou te ajudar a resolver isso! 🚀 Para encontrar a melhor solução, me diga: o problema é relacionado ao hardware (parte física) ou software (programas)?',
        suggestions: [
          { id: 'hw', label: 'Hardware', icon: '💻', action: 'category:hardware' },
          { id: 'sw', label: 'Software', icon: '⚙️', action: 'category:software' },
          { id: 'dk', label: 'Não sei', icon: '❓', action: 'help' },
        ],
      };
    }

    // Tutorial/Question intent
    if (intent.type === 'tutorial' || intent.type === 'question') {
      const allProblems = categories.flatMap(c => c.problemas);
      const matchedProblems = allProblems.filter(p =>
        intent.keywords.some(k => p.tags.includes(k) || p.titulo.toLowerCase().includes(k))
      ).slice(0, 4);

      if (matchedProblems.length > 0) {
        return {
          response: 'Encontrei alguns conteúdos que podem responder sua dúvida:',
          suggestions: matchedProblems.map(p => {
            const cat = categories.find(c => c.problemas.some(prob => prob.id === p.id));
            return {
              id: p.id,
              label: p.titulo,
              icon: '📖',
              action: `navigate:/categoria/${cat?.id}/problema/${p.id}`,
            };
          }),
        };
      }
    }

    // Navigation intent
    if (intent.type === 'navigation') {
      if (intent.category) {
        return {
          response: `Claro! Vou te levar para a seção de ${intent.category}.`,
          suggestions: [
            { id: 'go', label: `Ver ${intent.category}`, icon: intent.category === 'hardware' ? '💻' : '⚙️', action: `navigate:/categoria/${intent.category}` },
          ],
        };
      }
      return {
        response: 'Para onde você gostaria de ir?',
        suggestions: [
          { id: 'hw', label: 'Hardware', icon: '💻', action: 'navigate:/categoria/hardware' },
          { id: 'sw', label: 'Software', icon: '⚙️', action: 'navigate:/categoria/software' },
          { id: 'home', label: 'Início', icon: '🏠', action: 'navigate:/' },
        ],
      };
    }

    // Search intent
    if (intent.type === 'search') {
      return {
        response: 'O que você gostaria de buscar? Posso ajudar a encontrar soluções para problemas de hardware e software.',
        suggestions: [
          { id: 'hw', label: 'Buscar em Hardware', icon: '💻', action: 'search:hardware' },
          { id: 'sw', label: 'Buscar em Software', icon: '⚙️', action: 'search:software' },
        ],
      };
    }

    // Default/Unknown response
    return {
      response: 'Não entendi completamente, mas posso ajudar! Escolha uma das opções abaixo ou tente descrever seu problema de outra forma.',
      suggestions: [
        { id: '1', label: 'Resolver um problema', icon: '🔧', action: 'problem' },
        { id: '2', label: 'Ver Hardware', icon: '💻', action: 'navigate:/categoria/hardware' },
        { id: '3', label: 'Ver Software', icon: '⚙️', action: 'navigate:/categoria/software' },
        { id: '4', label: 'Voltar ao início', icon: '🏠', action: 'navigate:/' },
      ],
    };
  }, []);

  const getInitialSuggestions = useCallback((): QuickSuggestion[] => {
    return [
      { id: '1', label: 'Resolver um problema', icon: '🔧', action: 'problem' },
      { id: '2', label: 'Conhecer hardware', icon: '💻', action: 'navigate:/categoria/hardware' },
      { id: '3', label: 'Aprender sobre software', icon: '📖', action: 'navigate:/categoria/software' },
      { id: '4', label: 'Tirar uma dúvida', icon: '❓', action: 'question' },
    ];
  }, []);

  const processMessage = useCallback((userMessage: string): { response: string; suggestions: QuickSuggestion[] } => {
    const intent = detectIntent(userMessage);
    return generateResponse(intent, userMessage);
  }, [detectIntent, generateResponse]);

  return {
    detectIntent,
    generateResponse,
    processMessage,
    getInitialSuggestions,
  };
};
