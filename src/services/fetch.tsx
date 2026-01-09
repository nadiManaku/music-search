import type { IMusicItem } from "../types";

interface MusicResponse {
  results: IMusicItem[];
}
/** This is a description of the fetchMusic function. */
const fetchMusic: (query: string, entity?: string | '') => Promise<MusicResponse> = (query, entity) => {
  const apiUrl = `https://itunes.apple.com/search?term=${query} ${entity ? `&entity=${entity}` : ``}`;
  const result = fetch(apiUrl).then((response) => response.json());

  if (!result) {
    throw new Error('Failed to fetch music data');
  }

  return result;
};

export default fetchMusic;
