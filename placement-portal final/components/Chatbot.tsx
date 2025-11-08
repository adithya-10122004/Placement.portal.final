import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from './MainApp';
import { ChatBubbleOvalLeftEllipsisIcon } from './icons/ChatBubbleOvalLeftEllipsisIcon';
import { XIcon } from './icons/XIcon';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle, messages, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const chatWindowClasses = `
    fixed bottom-24 right-4 sm:right-8 w-[calc(100%-2rem)] sm:w-96 h-[70vh] sm:h-[600px] 
    bg-white rounded-2xl shadow-2xl flex flex-col transition-transform transform-gpu duration-300 ease-in-out
    ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}
  `;

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 sm:right-8 w-16 h-16 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-transform hover:scale-110"
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <XIcon className="w-8 h-8"/> : <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8" />}
      </button>

      <div className={chatWindowClasses}>
        <header className="p-4 border-b border-slate-200 flex items-center space-x-3 bg-slate-50/80 backdrop-blur-md rounded-t-2xl">
            <div className="p-2 bg-primary-100 rounded-lg">
                <SparklesIcon className="w-6 h-6 text-primary-600"/>
            </div>
            <div>
                <h2 className="font-bold text-slate-800 text-lg">AI Assistant</h2>
                <p className="text-sm text-slate-500">Your personal job guide</p>
            </div>
        </header>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-white ${msg.role === 'user' ? 'bg-primary-600 rounded-br-none' : 'bg-slate-700 rounded-bl-none'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex items-end gap-2 justify-start">
              <div className="max-w-[80%] p-3 rounded-2xl bg-slate-200 rounded-bl-none">
                <div className="flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 bg-slate-50/80 backdrop-blur-md rounded-b-2xl">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about jobs..."
              className="w-full pl-4 pr-12 py-3 bg-white border border-slate-300 rounded-full shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
