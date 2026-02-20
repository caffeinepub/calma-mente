import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetMotivationalMessages } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Wind, BookHeart, Sparkles } from 'lucide-react';
import MotivationalMessageCard from '../components/MotivationalMessageCard';

export default function HomePage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  
  const { data: messages, isLoading: messagesLoading } = useGetMotivationalMessages();
  const [currentMessage, setCurrentMessage] = useState<string>('');

  // Get a random message from the collection
  const getRandomMessage = () => {
    if (messages && messages.length > 0) {
      const randomIndex = Math.floor(Math.random() * messages.length);
      return messages[randomIndex];
    }
    return '';
  };

  // Set initial message when messages are loaded
  useEffect(() => {
    if (messages && messages.length > 0 && !currentMessage) {
      setCurrentMessage(getRandomMessage());
    }
  }, [messages, currentMessage]);

  const handleRefresh = () => {
    setCurrentMessage(getRandomMessage());
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12 text-center animate-fade-in">
        <h1 className="text-4xl font-display font-bold text-foreground mb-3">
          Welcome Back
        </h1>
        <p className="text-lg text-muted-foreground">
          {isAuthenticated 
            ? 'Your mindfulness journey continues...' 
            : 'Login to save your progress and diary entries'}
        </p>
      </div>

      {currentMessage && (
        <MotivationalMessageCard 
          message={currentMessage}
          onRefresh={handleRefresh}
          isLoading={messagesLoading}
        />
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="hover:shadow-soft transition-all duration-300 border-2 hover:border-accent/50">
          <CardHeader>
            <div className="w-20 h-20 mb-4 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
              <img 
                src="/assets/generated/breathing-icon.dim_256x256.png" 
                alt="Breathing" 
                className="w-16 h-16"
              />
            </div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Wind className="w-6 h-6 text-accent" />
              Breathing Exercises
            </CardTitle>
            <CardDescription className="text-base">
              Practice guided breathing techniques to reduce stress and find calm. 
              Follow the visual rhythm to center yourself.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate({ to: '/breathing' })}
              className="w-full"
              size="lg"
            >
              Start Breathing
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-soft transition-all duration-300 border-2 hover:border-secondary/50">
          <CardHeader>
            <div className="w-20 h-20 mb-4 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
              <img 
                src="/assets/generated/diary-icon.dim_256x256.png" 
                alt="Diary" 
                className="w-16 h-16"
              />
            </div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <BookHeart className="w-6 h-6 text-secondary" />
              Mindfulness Diary
            </CardTitle>
            <CardDescription className="text-base">
              Record your thoughts, feelings, and reflections. 
              Track your emotional journey over time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate({ to: '/diary' })}
              variant="secondary"
              className="w-full"
              size="lg"
            >
              Open Diary
            </Button>
          </CardContent>
        </Card>
      </div>

      {!isAuthenticated && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Login to Save Your Progress</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with Internet Identity to securely save your diary entries and track your mindfulness journey over time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
