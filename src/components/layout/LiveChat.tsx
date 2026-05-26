import React, { useState, useEffect, useRef } from 'react';
import {
    MessageCircle,
    X,
    Send,
    Minus,
    User,
    Bot,
    Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    isError?: boolean;
}

const LiveChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! Welcome to StartupKart. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Get user from localStorage safely
    const getUserContext = () => {
        try {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                return `User: ${user.email} (${user.full_name})`;
            }
        } catch (e) {
            console.error("Error parsing user context", e);
        }
        return "User: Guest";
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const userMsg: Message = {
            id: Date.now(),
            text: message,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setMessage('');
        setIsTyping(true);

        try {
            // api.post returns the parsed JSON body directly (not axios { data: ... })
            const response = await api.post('/ai/query', {
                prompt: userMsg.text,
                context: getUserContext()
            });

            const botMsg: Message = {
                id: Date.now() + 1,
                text: response.response || "I couldn't generate a response. Please try again.",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (err: any) {
            console.error('KartBot Error:', err);
            const errMsg = err?.message || '';

            // Friendly messages based on error type
            let botText = "I'm having trouble connecting right now. Please try again later.";
            if (errMsg.includes('session') || errMsg.includes('log in') || errMsg.includes('401')) {
                botText = "Please log in to chat with me! I can help you track orders and find products once you're signed in.";
            } else if (errMsg.includes('Ollama') || errMsg.includes('11434') || errMsg.includes('connect')) {
                botText = "My AI engine (Ollama) isn't running right now. Please ask the admin to start Ollama, or try again later.";
            }

            const errorMsg: Message = {
                id: Date.now() + 1,
                text: botText,
                sender: 'bot',
                timestamp: new Date(),
                isError: true
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };


    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-primary rounded-full shadow-glow-orange flex items-center justify-center text-black hover:scale-110 transition-transform z-50 animate-bounce"
            >
                <MessageCircle className="w-8 h-8" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white" />
            </button>
        );
    }

    return (
        <div className={cn(
            "fixed bottom-6 right-6 w-80 md:w-96 glass-card border border-white/10 shadow-2xl rounded-3xl overflow-hidden z-50 flex flex-col transition-all duration-300",
            isMinimized ? "h-16" : "h-[500px]"
        )}>
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between text-black">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Bot className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">KartBot</h4>
                        <p className="text-[10px] opacity-70">Always online</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-black/10 rounded">
                        <Minus className="w-4 h-4" />
                    </button>
                    <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-black/10 rounded">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    {/* Messages Area */}
                    <div
                        ref={scrollRef}
                        className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/20"
                    >
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex flex-col max-w-[80%]",
                                    msg.sender === 'user' ? "ml-auto items-end" : "items-start"
                                )}
                            >
                                <div className={cn(
                                    "p-3 rounded-2xl text-sm",
                                    msg.sender === 'user'
                                        ? "bg-primary text-black rounded-tr-none"
                                        : "bg-white/10 text-white rounded-tl-none border border-white/5"
                                )}>
                                    {msg.text}
                                </div>
                                {msg.isError && (
                                    <span className="text-[10px] text-red-400 mt-1">Network Error</span>
                                )}
                                <span className="text-[10px] text-white/40 mt-1">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex items-center gap-2 text-primary/60 text-xs italic">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Bot is thinking...
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-white/5 flex gap-2">
                        <Input
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl"
                        />
                        <Button
                            variant="premium"
                            size="icon"
                            className="rounded-xl flex-shrink-0"
                            onClick={handleSendMessage}
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default LiveChat;
