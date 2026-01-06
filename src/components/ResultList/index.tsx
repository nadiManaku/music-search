import { useState } from "react";
import { type IMusicItem, type IResultList } from "../../types";
import ResultItem from "../ResultItem";
import "./styles/index.scss";
import fetchMusic from "../../services/fetch";

interface ResultListProps {
  searchResults: IResultList
  emptyMessage: string
}


const ResultList = ({ searchResults, emptyMessage }: ResultListProps) => {
  const { artist, collection, track } = searchResults;
  const [preferedResult, setPreferedResult] = useState<IMusicItem[]>([]);
  const [showResultsItems, setShowResultsItems] = useState<boolean>(false);

  const setPreferedResultFunc = async (searchQuery: string) => {
   // setIsLoading(true);
   // setHasError(false);
    try {
      const aggregatedResults = await fetchMusic(searchQuery);
      setPreferedResult(aggregatedResults.results);
      setShowResultsItems(true);
     // setIsLoading(false);
    } catch {
     // setIsLoading(false);
    //  setHasError(true);
    }
  };


  return (
    <div className="resultList">
      {!showResultsItems &&
        <div className="resultList__suggestions">
          <h2>ARTIST</h2>
          {artist.slice(0, 3).map(
            (item: IMusicItem) =>
            (
              <a href="" key={item.artistId} onClick={(e) => {
                e.preventDefault();
                setPreferedResultFunc(item.artistName);
              }}>{item.artistName}</a>
            )
          )}
          {artist.length === 0 && emptyMessage}
          <h2>SONG</h2>
          {track.slice(0, 3).map(
            (item: IMusicItem, index: number) =>
            (
              <a key={`${item.artistId}_${index}`}>{item.trackName}</a>
            )
          )}
          {track.length === 0 && emptyMessage}
          <h2>ALBUM</h2>
          {collection.slice(0, 3).map(
            (item: IMusicItem, index: number) =>
            (
              <a key={`${item.artistId}_${index}`}>{item.collectionName}</a>
            )
          )}
          {collection.length === 0 && emptyMessage}
        </div>
      }
      {showResultsItems && <ResultItem musicItemList={preferedResult} />}
    </div>
  );
};

export default ResultList;
