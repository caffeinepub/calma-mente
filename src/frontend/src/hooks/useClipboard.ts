import { useState } from 'react';

export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setError(null);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      setError(err as Error);
      setIsCopied(false);
    }
  };

  return { copyToClipboard, isCopied, error };
}
