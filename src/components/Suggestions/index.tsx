import { memo } from 'react';
import { type IMusicItem } from '../../types';
import Section from '../Section';

interface SuggestionsProps {
  artist: IMusicItem[];
  track: IMusicItem[];
  collection: IMusicItem[];
  emptyMessage: string;
  onSelect: (query: string) => void;
}

const Suggestions = ({ artist, track, collection, emptyMessage, onSelect }: SuggestionsProps) => {
  return (
    <>
      <Section
        title="ARTIST"
        items={artist}
        emptyMessage={emptyMessage}
        renderItem={(item) => (
          <button type="button" key={item.artistId} onClick={() => onSelect(item.artistName)}>
            {item.artistName}
          </button>
        )}
      />

      <Section
        title="SONG"
        items={track}
        emptyMessage={emptyMessage}
        renderItem={(item) => (
          <button type="button" key={item.trackId} onClick={() => onSelect(item.trackName)}>
            {item.trackName}
          </button>
        )}
      />

      <Section
        title="ALBUM"
        items={collection}
        emptyMessage={emptyMessage}
        renderItem={(item) => (
          <button
            type="button"
            key={item.collectionId}
            onClick={() => onSelect(item.collectionName)}
          >
            {item.collectionName}
          </button>
        )}
      />
    </>
  );
};

export default memo(Suggestions);
