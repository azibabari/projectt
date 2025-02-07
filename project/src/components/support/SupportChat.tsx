import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Loader, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supportAI } from '@/lib/support-ai';
import { AIResponse } from '@/types/support';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  response?: AIResponse;
}

const SupportChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await supportAI.getInstantResponse(input);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.answer,
        sender: 'ai',
        timestamp: new Date(),
        response,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 bg-white rounded-full shadow-xl p-4 cursor-pointer"
           onClick={() => setIsMinimized(false)}>
        <Bot className="h-6 w-6 text-primary" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Bot className="h-6 w-6 text-primary mr-2" />
          <h3 className="font-semibold">AI Support Assistant</h3>
        </div>
        <button 
          onClick={() => setIsMinimized(true)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <Minimize2 className="h-4 w-4" />
        </button>
      </div>

      <div className="h-96 overflow-y-auto p-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p>{message.text}</p>
              {message.response?.suggestedActions && (
                <div className="mt-2 text-sm">
                  {message.response.suggestedActions.map((action, index) => (
                    <button
                      key={index}
                      className={`block mt-1 px-2 py-1 rounded ${
                        message.sender === 'user'
                          ? 'bg-white text-primary'
                          : 'bg-white text-primary'
                      }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader className="h-5 w-5 animate-spin text-primary" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button
            onClick={handleSend}
            disabled={isLoading}
            className="flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;