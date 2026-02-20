import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { RefreshCw, Sparkles } from 'lucide-react';

interface MotivationalMessageCardProps {
  message: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

export default function MotivationalMessageCard({ 
  message, 
  onRefresh, 
  isLoading = false 
}: MotivationalMessageCardProps) {
  return (
    <Card className="bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10 border-accent/30 shadow-soft mb-8 animate-fade-in">
      <CardContent className="pt-6 pb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-medium text-foreground leading-relaxed italic">
              "{message}"
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            disabled={isLoading}
            className="flex-shrink-0 hover:bg-accent/10"
            aria-label="Nova mensagem"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
