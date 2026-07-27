import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Upload,
  Bot,
  User,
  Sparkles,
  ExternalLink,
  Image as ImageIcon,
  Trash2,
} from 'lucide-react';
import { ChatMessage } from '../types';

interface BotChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const BotChatModal: React.FC<BotChatModalProps> = ({ isOpen, onClose, initialQuery }) => {
  const [languageMode, setLanguageMode] = useState<'auto' | 'sinhala'>('auto');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'ආයුබෝවන්! Hello! I am your AI Master Bot for Advanced Level (A/L) Physics.\n\nඔබට ඕනෑම A/L භෞතික විද්‍යා ප්‍රශ්නයක්, ගණනක්, හෝ සිද්ධාන්තයක් සිංහලෙන් හෝ ඉංග්‍රීසියෙන් විමසිය හැක. ඔබ සිංහලෙන් අසන සෑම ප්‍රශ්නයකටම සම්පූර්ණ විස්තරාත්මක විසඳුම් සහ පැහැදිලි කිරීම් සිංහලෙන්ම ලබා දෙනු ඇත!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState(initialQuery || '');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sinhalaQuickPrompts = [
    'ඩොප්ලර් ආචරණය සිංහලෙන් පැහැදිලි කරන්න',
    'මීටර් සේතුවේ ප්‍රතිරෝධ ගණනය කිරීම සහ සිද්ධාන්තය',
    'සරල අනුකම්පී චලිතයේ (SHM) ශක්ති සංස්ථිතිය පැහැදිලි කරන්න',
    'බර්නූලි ප්‍රමේයය සහ යෙදීම් සිංහලෙන්',
  ];

  useEffect(() => {
    if (initialQuery) {
      setInput(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: input,
      imageUrl: selectedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currInput = input;
    const currImg = selectedImage;
    setInput('');
    setSelectedImage(null);
    setIsSending(true);

    try {
      const isSinhalaInput = /[\u0D80-\u0DFF]/.test(currInput);
      const languageToUse = languageMode === 'sinhala' || isSinhalaInput ? 'sinhala' : 'english';

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currInput,
          imageBase64: currImg,
          language: languageToUse,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Chat request failed');
      }

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundingSources: data.groundingSources,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: `Sorry, I encountered an issue: ${err.message || 'Server error'}. Please try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-slate-950/80 backdrop-blur-2xl rounded-2xl w-full max-w-2xl h-[85vh] flex flex-col shadow-2xl border border-white/10 overflow-hidden text-white">
        {/* Modal Header */}
        <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/80 border border-blue-400/30 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Bot className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                <span>Gemini A/L Physics Tutor Bot</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </h3>
              <p className="text-[11px] text-white/50">Full Sinhala (සිංහල) & English step-by-step solutions</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Mode Selector */}
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setLanguageMode('auto')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  languageMode === 'auto' ? 'bg-blue-600/80 text-white font-bold border border-blue-400/30' : 'text-white/60 hover:text-white'
                }`}
              >
                Auto / EN
              </button>
              <button
                onClick={() => setLanguageMode('sinhala')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  languageMode === 'sinhala' ? 'bg-emerald-600/80 text-white font-bold border border-emerald-400/30' : 'text-white/60 hover:text-white'
                }`}
              >
                සිංහල
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  msg.role === 'user' ? 'bg-blue-600/80 text-white border border-blue-400/30' : 'bg-white/10 text-cyan-300 border border-white/10'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[82%] space-y-1.5 ${msg.role === 'user' ? 'items-end' : ''}`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600/80 border border-blue-400/30 text-white rounded-tr-none shadow-lg shadow-blue-500/10'
                      : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none whitespace-pre-wrap'
                  }`}
                >
                  {msg.imageUrl && (
                    <img src={msg.imageUrl} alt="Uploaded problem" className="max-h-40 rounded-lg mb-2 object-contain border border-white/20" />
                  )}
                  <p>{msg.content}</p>

                  {/* Grounding Sources if present */}
                  {msg.groundingSources && msg.groundingSources.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-white/10 text-[11px]">
                      <span className="font-bold text-white/40 block mb-1">Search Grounded References:</span>
                      <div className="space-y-1">
                        {msg.groundingSources.map((src, i) => (
                          <a
                            key={i}
                            href={src.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-300 hover:underline flex items-center space-x-1"
                          >
                            <ExternalLink className="w-3 h-3 shrink-0" />
                            <span className="truncate">{src.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-white/40 px-1">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex items-center space-x-2 text-xs text-white/70 p-2 bg-white/5 rounded-xl border border-white/10 w-max">
              <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <span>Physics Bot is reasoning and searching...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="p-3 bg-white/5 border-t border-white/10 space-y-2">
          {/* Sinhala Quick Prompt Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[10px] uppercase font-bold text-emerald-400 shrink-0 mr-1">සිංහල Prompts:</span>
            {sinhalaQuickPrompts.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(sp);
                  setLanguageMode('sinhala');
                }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-300 font-medium whitespace-nowrap shrink-0 transition-all"
              >
                {sp}
              </button>
            ))}
          </div>

          {selectedImage && (
            <div className="flex items-center justify-between p-2 bg-blue-500/20 rounded-xl text-xs text-blue-200 border border-blue-400/30">
              <div className="flex items-center space-x-2 truncate">
                <ImageIcon className="w-4 h-4 text-blue-300 shrink-0" />
                <span className="truncate font-medium">Image attached</span>
              </div>
              <button onClick={() => setSelectedImage(null)} className="text-rose-400 hover:text-rose-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <label className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 cursor-pointer transition-all border border-white/10">
              <Upload className="w-4 h-4" />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask a question or request step-by-step physics solution..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 focus:border-blue-500/50 text-xs sm:text-sm text-white placeholder:text-white/30 outline-none"
            />

            <button
              onClick={handleSendMessage}
              disabled={isSending || (!input.trim() && !selectedImage)}
              className="p-2.5 rounded-xl bg-blue-600/80 hover:bg-blue-500 text-white font-bold transition-all border border-blue-400/30 shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
