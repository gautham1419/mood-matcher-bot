import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
  audioUrl?: string;
  celebrity?: string;
  emotion?: string;
}

export const ChatMessage = ({ message, isUser, timestamp, imageUrl, audioUrl, celebrity, emotion }: ChatMessageProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className={cn(
      "flex w-full",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] sm:max-w-[70%] rounded-lg px-3 py-2 shadow-sm transition-all duration-200",
        isUser 
          ? "bg-user-bubble text-primary-foreground" 
          : "bg-bot-bubble text-foreground border border-border"
      )}>
        {/* Celebrity Image with Talking Effect */}
        {!isUser && imageUrl && (
          <div className="mb-4 flex items-center gap-4 p-3 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl border border-white/20 animate-cloud-float">
            <div className="relative">
              <img 
                src={imageUrl} 
                alt={celebrity || 'Celebrity'} 
                className="w-16 h-16 rounded-full object-cover border-4 border-primary shadow-xl"
                onError={(e) => {
                  console.log('Image failed to load:', imageUrl);
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${celebrity}&background=random&color=fff&size=128&rounded=true&bold=true`;
                }}
              />
              {/* Talking indicator */}
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white animate-pulse shadow-lg"></div>
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-foreground capitalize">
                {celebrity?.replace('_', ' ')}
              </p>
              <p className="text-sm text-muted-foreground capitalize">
                {emotion} • {timestamp.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        )}

        {/* Message Text with Cloud Animation */}
        <div className="relative animate-message-pop">
          <p className="text-lg font-bold leading-relaxed bg-white/95 backdrop-blur-sm rounded-3xl px-6 py-4 shadow-xl border border-white/30 text-gray-800">
            {message}
          </p>
          {/* Cloud effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/60 to-purple-100/60 rounded-3xl blur-md -z-10 animate-cloud-float"></div>
        </div>

        {/* Audio Player */}
        {!isUser && audioUrl && (
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handlePlayAudio}
              className="flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 text-primary" />
              ) : (
                <Play className="h-4 w-4 text-primary" />
              )}
              <span className="text-sm font-medium text-primary">
                {isPlaying ? 'Pause Audio' : 'Play Audio'}
              </span>
            </button>
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={handleAudioEnded}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              preload="metadata"
            />
          </div>
        )}

        {/* Timestamp for user messages */}
        {isUser && (
          <span className="text-xs mt-1 block opacity-70 text-white/70">
            {timestamp.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        )}
      </div>
    </div>
  );
};