import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { useBreathingTimer } from '../hooks/useBreathingTimer';
import { useGetMotivationalMessages } from '../hooks/useQueries';

export default function BreathingExercisePage() {
  const { phase, isActive, start, pause, reset, cycleCount } = useBreathingTimer();
  const { data: messages } = useGetMotivationalMessages();
  const [showMessage, setShowMessage] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [lastCycleShown, setLastCycleShown] = useState(0);

  const handleStart = () => {
    start();
  };

  const handleReset = () => {
    reset();
    setShowMessage(false);
    setLastCycleShown(0);
  };

  // Show motivational message after completing a cycle
  useEffect(() => {
    if (cycleCount > 0 && cycleCount > lastCycleShown && messages && messages.length > 0) {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setMotivationalMessage(messages[randomIndex]);
      setShowMessage(true);
      setLastCycleShown(cycleCount);
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [cycleCount, messages, lastCycleShown]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      default:
        return 'Ready';
    }
  };

  const getPhaseClass = () => {
    switch (phase) {
      case 'inhale':
        return 'breathe-in';
      case 'hold':
        return 'breathe-hold';
      case 'exhale':
        return 'breathe-out';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-display font-bold text-foreground mb-3">
          Breathing Exercise
        </h1>
        <p className="text-lg text-muted-foreground">
          Follow the rhythm to calm your mind and body
        </p>
      </div>

      {showMessage && motivationalMessage && (
        <div className="mb-6 animate-fade-in">
          <Card className="bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10 border-accent/30 shadow-soft">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <p className="text-base font-medium text-foreground italic flex-1">
                  "{motivationalMessage}"
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMessage(false)}
                  className="flex-shrink-0"
                >
                  ✕
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Guided Breathing</CardTitle>
          <CardDescription>
            Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
              <div 
                className={`absolute inset-0 rounded-full bg-gradient-to-br from-accent/40 to-primary/40 backdrop-blur-sm ${getPhaseClass()}`}
                style={{
                  boxShadow: '0 0 60px rgba(100, 180, 150, 0.4)',
                  transition: 'transform 4s ease-in-out, opacity 4s ease-in-out'
                }}
              />
              <div className="relative z-10 text-center">
                <p className="text-3xl font-bold text-foreground mb-2">
                  {getPhaseText()}
                </p>
                {isActive && (
                  <p className="text-sm text-muted-foreground">
                    Cycle {cycleCount}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              {!isActive ? (
                <Button 
                  onClick={handleStart}
                  size="lg"
                  className="gap-2 px-8"
                >
                  <Play className="w-5 h-5" />
                  Start
                </Button>
              ) : (
                <Button 
                  onClick={pause}
                  size="lg"
                  variant="secondary"
                  className="gap-2 px-8"
                >
                  <Pause className="w-5 h-5" />
                  Pause
                </Button>
              )}
              <Button 
                onClick={handleReset}
                size="lg"
                variant="outline"
                className="gap-2 px-8"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-lg mb-3">Benefits of Breathing Exercises</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Reduces stress and anxiety levels</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Improves focus and mental clarity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Lowers blood pressure and heart rate</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Promotes better sleep quality</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
