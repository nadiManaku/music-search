import { type IMusicItem } from '../../types';
import './styles/index.scss';

interface IResultItem {
  musicItemList: IMusicItem[];
}

const ResultItem = ({ musicItemList }: IResultItem) => (
  <>
    {musicItemList.slice(0, 10).map((item: IMusicItem, index: number) => (
      <li className="musicItem" key={item.trackName + index}>
        <img src={item.artworkUrl100} alt={`${item.trackName}_thumbnail`} />
        <div className="musicItem__content">
          <h3>{item.trackName}</h3>
          <p>{`Released on: ${new Date(item.releaseDate).getUTCFullYear()} on Album: ${item.collectionName}`}</p>
          <a href={item.trackViewUrl} target="_blank" rel="noopener noreferrer">
            view in iTunes
          </a>
        </div>
      </li>
    ))}
  </>
);

export default ResultItem;
