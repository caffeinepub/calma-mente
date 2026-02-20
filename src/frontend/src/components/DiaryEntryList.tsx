import { useGetMyEntries } from '../hooks/useQueries';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Loader2, BookOpen } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const moodEmojis: Record<string, string> = {
  peaceful: '😌',
  happy: '😊',
  grateful: '🙏',
  calm: '😇',
  anxious: '😰',
  sad: '😢',
  stressed: '😫',
  neutral: '😐'
};

export default function DiaryEntryList() {
  const { data: entries, isLoading, error } = useGetMyEntries();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error.message.includes('No entries found') 
            ? 'No entries yet. Start by creating your first reflection!' 
            : 'Failed to load entries'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="text-center py-8">
        <BookOpen className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
        <p className="text-muted-foreground">
          No entries yet. Start your mindfulness journey!
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-4">
        {entries.slice().reverse().map((entry, index) => (
          <Card key={index} className="bg-muted/30">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3 mb-2">
                <span className="text-2xl">{moodEmojis[entry.mood] || '😐'}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold capitalize">{entry.mood}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {entry.reflection}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
