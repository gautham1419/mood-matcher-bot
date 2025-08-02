import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Brain, Sparkles } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
  audioUrl?: string;
  celebrity?: string;
  emotion?: string;
}

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    // Clean and validate input
    const cleanText = messageText.trim().toLowerCase();
    if (!cleanText) return;
    
    // Enhanced emotion mapping for better responses
    const emotionMap: { [key: string]: string } = {
      // Sad emotions
      'im sad': 'sad',
      'i am sad': 'sad',
      'i\'m sad': 'sad',
      'sad': 'sad',
      'feeling sad': 'sad',
      'depressed': 'sad',
      'unhappy': 'sad',
      
      // Happy emotions
      'im happy': 'happy',
      'i am happy': 'happy',
      'i\'m happy': 'happy',
      'happy': 'happy',
      'feeling great': 'happy',
      'excited': 'happy',
      'joyful': 'happy',
      
      // Angry emotions
      'im angry': 'angry',
      'i am angry': 'angry',
      'i\'m angry': 'angry',
      'angry': 'angry',
      'mad': 'angry',
      'furious': 'angry',
      
      // Scared emotions
      'im scared': 'scared',
      'i am scared': 'scared',
      'i\'m scared': 'scared',
      'scared': 'scared',
      'afraid': 'scared',
      'fear': 'scared',
      
      // Romantic emotions
      'im in love': 'romantic',
      'i am in love': 'romantic',
      'i\'m in love': 'romantic',
      'love': 'romantic',
      'romantic': 'romantic',
      
      // Confused emotions
      'im confused': 'confused',
      'i am confused': 'confused',
      'i\'m confused': 'confused',
      'confused': 'confused',
      'doubt': 'confused',
      
      // Curious emotions
      'im curious': 'curious',
      'i am curious': 'curious',
      'i\'m curious': 'curious',
      'curious': 'curious',
      'wonder': 'curious',
      
      // Confident emotions
      'im confident': 'confident',
      'i am confident': 'confident',
      'i\'m confident': 'confident',
      'confident': 'confident',
      'sure': 'confident',
    };
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    // Check if we have a direct mapping for this input
    const directMatch = emotionMap[cleanText];
    if (directMatch) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: directMatch,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage, botMessage]);
      return;
    }

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: cleanText }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Debug log
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.dialogue_text || 'No response',
        isUser: false,
        timestamp: new Date(),
        imageUrl: data.image_url,
        audioUrl: data.audio_url,
        celebrity: data.celebrity,
        emotion: data.predicted_emotion,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      console.error('Error details:', error.message);
      toast({
        title: "Connection Error",
        description: "Failed to connect to the Malayalam quote service. Please check if the backend is running.",
        variant: "destructive",
      });

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Sorry, there was an error processing your message. The server returned: ${error.message}`,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-chat-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-card-foreground">മലയാളം Quote Bot</h1>
              <p className="text-xs text-muted-foreground">Famous Malayalam movie dialogues based on your emotions</p>
            </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-4">
        <div className="space-y-3 max-w-4xl mx-auto">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-base font-medium text-card-foreground mb-2">Welcome!</h2>
              <p className="text-sm text-muted-foreground">Share your feelings and I'll respond with a famous Malayalam movie dialogue!</p>
            </div>
          )}
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
              imageUrl={message.imageUrl}
              audioUrl={message.audioUrl}
              celebrity={message.celebrity}
              emotion={message.emotion}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-muted-foreground">Finding the perfect quote...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};