import { useState, useEffect, useCallback } from 'react';
import fetchMusic from '../services/fetch';
import { type IResultList, MusicKind } from '../types';

const EMPTY_RESULTS: IResultList = {
  artist: [],
  collection: [],
  track: [],
};

export function useMusicSearch(searchQuery: string) {
  const [results, setResults] = useState<IResultList>(EMPTY_RESULTS);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const searchMusic = useCallback(async () => {
    if (searchQuery.length <= 2) {
      setResults(EMPTY_RESULTS);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      const responses = await Promise.all([
        fetchMusic(searchQuery, MusicKind.ARTIST),
        fetchMusic(searchQuery, MusicKind.SONG),
        fetchMusic(searchQuery, MusicKind.ALBUM),
      ]);

      const aggregatedResults = responses.reduce(function (allResults, item) {
        return { ...allResults, [item.results[0].wrapperType]: item.results };
      }, {} as IResultList);

      setResults(aggregatedResults);
    } catch (error) {
      console.error('Music search failed:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  // Debounce user input
  useEffect(() => {
    const timeout = setTimeout(searchMusic, 400);
    return () => clearTimeout(timeout);
  }, [searchMusic]);

  return {
    results,
    isLoading,
    hasError,
  };
}
