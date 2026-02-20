import { useNavigate } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Wind, BookHeart, Home } from 'lucide-react';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12 animate-fade-in">
        <img 
          src="/assets/generated/logo.dim_512x512.png" 
          alt="Calma-Mente Logo" 
          className="w-32 h-32 mx-auto mb-6 rounded-full shadow-soft"
        />
        <h1 className="text-5xl font-display font-bold text-foreground mb-4">
          Welcome to Calma-Mente
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Your personal sanctuary for mindfulness, breathing exercises, and emotional reflection. 
          Take a moment to breathe, reflect, and find your inner peace.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-soft transition-all duration-300 cursor-pointer" onClick={() => navigate({ to: '/home' })}>
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Home className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Home</h3>
            <p className="text-sm text-muted-foreground">
              Your personal dashboard for mindfulness
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-soft transition-all duration-300 cursor-pointer" onClick={() => navigate({ to: '/breathing' })}>
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
              <Wind className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Breathing</h3>
            <p className="text-sm text-muted-foreground">
              Guided breathing exercises for calm
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-soft transition-all duration-300 cursor-pointer" onClick={() => navigate({ to: '/diary' })}>
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
              <BookHeart className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Diary</h3>
            <p className="text-sm text-muted-foreground">
              Track your mood and reflections
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button 
          size="lg" 
          onClick={() => navigate({ to: '/home' })}
          className="px-8 py-6 text-lg shadow-soft hover:shadow-glow transition-all duration-300"
        >
          Begin Your Journey
        </Button>
      </div>
    </div>
  );
}
