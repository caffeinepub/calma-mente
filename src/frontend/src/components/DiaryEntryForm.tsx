import { useState } from 'react';
import { useAddDiaryEntry } from '../hooks/useQueries';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const moods = [
  { value: 'peaceful', label: '😌 Peaceful', emoji: '😌' },
  { value: 'happy', label: '😊 Happy', emoji: '😊' },
  { value: 'grateful', label: '🙏 Grateful', emoji: '🙏' },
  { value: 'calm', label: '😇 Calm', emoji: '😇' },
  { value: 'anxious', label: '😰 Anxious', emoji: '😰' },
  { value: 'sad', label: '😢 Sad', emoji: '😢' },
  { value: 'stressed', label: '😫 Stressed', emoji: '😫' },
  { value: 'neutral', label: '😐 Neutral', emoji: '😐' }
];

export default function DiaryEntryForm() {
  const [mood, setMood] = useState('');
  const [reflection, setReflection] = useState('');
  const { mutate: addEntry, isPending } = useAddDiaryEntry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mood || !reflection.trim()) {
      toast.error('Please select a mood and write your reflection');
      return;
    }

    const date = new Date().toISOString();
    
    addEntry(
      { date, mood, reflection },
      {
        onSuccess: () => {
          toast.success('Entry saved successfully');
          setMood('');
          setReflection('');
        },
        onError: (error) => {
          toast.error('Failed to save entry: ' + error.message);
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="mood">How are you feeling?</Label>
        <Select value={mood} onValueChange={setMood}>
          <SelectTrigger id="mood">
            <SelectValue placeholder="Select your mood" />
          </SelectTrigger>
          <SelectContent>
            {moods.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reflection">Your Reflection</Label>
        <Textarea
          id="reflection"
          placeholder="Write about your thoughts, feelings, or experiences today..."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={6}
          className="resize-none"
        />
      </div>

      <Button 
        type="submit" 
        disabled={isPending}
        className="w-full"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          'Save Entry'
        )}
      </Button>
    </form>
  );
}
