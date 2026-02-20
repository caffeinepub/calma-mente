import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { DiaryEntry } from '../backend';

export function useGetMyEntries() {
  const { actor, isFetching } = useActor();

  return useQuery<DiaryEntry[]>({
    queryKey: ['diaryEntries'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getMyEntries();
      } catch (error) {
        // If no entries found, return empty array instead of throwing
        console.log('No diary entries found or error fetching entries:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddDiaryEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ date, mood, reflection }: { date: string; mood: string; reflection: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.addDiaryEntry(date, mood, reflection);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diaryEntries'] });
    },
  });
}

export function useGetMotivationalMessages() {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['motivationalMessages'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllMotivationalMessages();
      } catch (error) {
        console.error('Error fetching motivational messages:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour since messages don't change often
  });
}
