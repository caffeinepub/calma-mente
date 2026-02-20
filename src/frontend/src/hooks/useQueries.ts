import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { DiaryEntry } from '../backend';

export function useGetMyEntries() {
  const { actor, isFetching } = useActor();

  return useQuery<DiaryEntry[]>({
    queryKey: ['diaryEntries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyEntries();
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
      return actor.addDiaryEntry(date, mood, reflection);
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
      return actor.getAllMotivationalMessages();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour since messages don't change often
  });
}
