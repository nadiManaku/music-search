import { useState } from "react";
import "./App.css";
import Loader from "./components/Loader";
import SearchBar from "./components/Search";
import ResultList from "./components/ResultList";
import { useMusicSearch } from "./hooks/useMusicSearch";

function App() {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const { results, isLoading, hasError } = useMusicSearch(searchQuery);


  if (hasError) {
    return (
      <div className="info-container">
        <h1>Something went wrong. Please try again later!</h1>
      </div>
    );
  }

  const showResults =
    !isLoading &&
    !hasError &&
    searchQuery.length > 2 &&
    Object.values(results).some((list) => list.length > 0);

  return (
    <div className="app-container">
      <h1>MusicSearch</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isLoading && <Loader />}
      {showResults && (
        <ResultList
          searchResults={results}
          emptyMessage="No results found"
        />
      )}
    </div>
  );
}

export default App;
