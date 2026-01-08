export interface IMusicItem {
    trackName: string;
    releaseDate: string;
    kind: string;
    artworkUrl100: string;
    trackViewUrl: string;
    artistId: number;
    artistName: string;
    collectionName: string;
    trackId: number;
    collectionId: number;
}

export interface IResultList {
    artist: IMusicItem[];
    collection: IMusicItem[];
    track: IMusicItem[];
}

export const MusicKind = {
    ARTIST: "musicArtist",
    SONG: "song",
    ALBUM: "album",
  } as const;