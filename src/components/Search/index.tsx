import './styles/index.scss';

interface ISearchBar {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

const SearchBar = ({searchQuery, setSearchQuery}: ISearchBar) => (
    <div className="search-bar">
        <input
            className="search-bar__input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search Music"
        />
     </div>
);

export default SearchBar;