import { useCallback, useState } from "react";
import { type IMusicItem, type IResultList } from "../../types";
import ResultItem from "../ResultItem";
import "./styles/index.scss";
import fetchMusic from "../../services/fetch";
import Suggestions from "../Suggestions";

interface ResultListProps {
  searchResults: IResultList
  emptyMessage: string
}

const ResultList = ({ searchResults, emptyMessage }: ResultListProps) => {
  const { artist, collection, track } = searchResults;
  const [preferredResults, setPreferredResult] = useState<IMusicItem[]>([]);
  //const showResultsItems = preferredResults.length > 0;
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const fetchPreferredResults = useCallback(async (query: string) => {
    setStatus('loading');
    try {
      const aggregatedResults = await fetchMusic(query);
      setPreferredResult(aggregatedResults.results);
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  }, []);

  if (status === 'error') {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="resultList">
      {preferredResults.length === 0 ? (
        <div className="resultList__suggestions">
        <Suggestions
          artist={artist}
          track={track}
          collection={collection}
          emptyMessage={emptyMessage}
          onSelect={fetchPreferredResults}
        />
        </div>
      ) : (
        <ResultItem musicItemList={preferredResults} />
      )}
    </div>
  );
};

export default ResultList;
