
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { 
  MessageSquare, 
  Send, 
  ArrowDown,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'coach';
  timestamp: Date;
}

const FinancialCoach = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: language === 'fr' 
        ? "Bonjour! Je suis Zamo Coach, votre conseiller financier. Comment puis-je vous aider aujourd'hui?"
        : "Hello! I'm Zamo Coach, your financial advisor. How can I help you today?",
      sender: 'coach',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const proverbs = {
    fr: [
      "Tu ne peux pas boire l'eau et oublier la calebasse.",
      "Un sou économisé est un sou gagné.",
      "L'argent est un bon serviteur, mais un mauvais maître.",
      "Même le plus grand arbre commence par une petite graine.",
      "Ne mets pas tous tes œufs dans le même panier.",
      "Petit à petit, l'oiseau fait son nid."
    ],
    en: [
      "You cannot drink the water and forget the calabash.",
      "A penny saved is a penny earned.",
      "Money is a good servant but a bad master.",
      "Even the tallest tree starts as a small seed.",
      "Don't put all your eggs in one basket.",
      "Little by little, the bird builds its nest."
    ]
  };

  const getRandomProverb = () => {
    const currentProverbs = language === 'fr' ? proverbs.fr : proverbs.en;
    const randomIndex = Math.floor(Math.random() * currentProverbs.length);
    return currentProverbs[randomIndex];
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      let responseContent = '';
      
      // Simple pattern matching to generate responses
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('save') || lowerInput.includes('économiser')) {
        responseContent = language === 'fr' 
          ? `Pour économiser efficacement, essayez le système 50/30/20: 50% pour les besoins essentiels, 30% pour les désirs, et 20% pour l'épargne. ${getRandomProverb()}`
          : `For effective saving, try the 50/30/20 system: 50% for essential needs, 30% for wants, and 20% for savings. ${getRandomProverb()}`;
      } else if (lowerInput.includes('tontine') || lowerInput.includes('group')) {
        responseContent = language === 'fr'
          ? `Les tontines sont d'excellents moyens d'épargner collectivement. Créez un groupe dans l'application pour commencer! ${getRandomProverb()}`
          : `Tontines are excellent ways to save collectively. Create a group in the app to get started! ${getRandomProverb()}`;
      } else if (lowerInput.includes('bill') || lowerInput.includes('facture')) {
        responseContent = language === 'fr'
          ? `Pour gérer vos factures familiales, utilisez notre fonction de partage des factures. Cela vous aide à diviser les coûts. ${getRandomProverb()}`
          : `To manage your family bills, use our bill sharing feature. It helps you divide costs. ${getRandomProverb()}`;
      } else {
        responseContent = language === 'fr'
          ? `Merci pour votre message. N'oubliez pas que la discipline financière est la clé du succès. ${getRandomProverb()}`
          : `Thank you for your message. Remember that financial discipline is the key to success. ${getRandomProverb()}`;
      }
      
      const coachMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        sender: 'coach',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, coachMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="flex-none">
        <h1 className="text-xl font-bold mb-2">
          Financial Coach
        </h1>
        <p className="text-sm text-muted-foreground mb-4">
          Get personalized financial advice with local wisdom
        </p>
      </div>
      
      <div className="flex-grow overflow-y-auto mb-4 pb-2">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[80%] p-3 rounded-lg
                  ${message.sender === 'user' 
                    ? 'bg-primary-blue text-white rounded-tr-none' 
                    : 'bg-secondary rounded-tl-none'
                  }
                `}
              >
                {message.sender === 'coach' && (
                  <div className="flex items-center mb-1">
                    <div className="w-5 h-5 rounded-full bg-primary-blue/20 flex items-center justify-center mr-1">
                      <Sparkles size={12} className="text-primary-blue" />
                    </div>
                    <span className="text-xs font-semibold">Zamo Coach</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 text-right mt-1">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="flex-none">
        <div className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={language === 'fr' ? "Posez votre question..." : "Ask your question..."}
            className="pr-12"
          />
          <Button 
            className="absolute right-1 top-1 h-8 w-8 p-0" 
            onClick={handleSend}
            disabled={input.trim() === ''}
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinancialCoach;
