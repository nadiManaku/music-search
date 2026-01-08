import { memo } from "react";
import { type IMusicItem } from "../../types";
import Section from "../Section";

interface SuggestionsProps {
  artist: IMusicItem[];
  track: IMusicItem[];
  collection: IMusicItem[];
  emptyMessage: string;
  onSelect: (query: string) => void;
}

const Suggestions = ({
  artist,
  track,
  collection,
  emptyMessage,
  onSelect,
}: SuggestionsProps) => {
  return (
    <>
      <Section
        title="ARTIST"
        items={artist}
        emptyMessage={emptyMessage}
        renderItem={(item) => (
          <button
            type="button"
            key={item.artistId}
            onClick={() => onSelect(item.artistName)}
          >
            {item.artistName}
          </button>
        )}
      />

      <Section
        title="SONG"
        items={track}
        emptyMessage={emptyMessage}
        renderItem={(item) => (
          <span key={item.trackId}>{item.trackName}</span>
        )}
      />

      <Section
        title="ALBUM"
        items={collection}
        emptyMessage={emptyMessage}
        renderItem={(item) => (
          <span key={item.collectionId}>{item.collectionName}</span>
        )}
      />
    </>
  );
};

export default memo(Suggestions);
