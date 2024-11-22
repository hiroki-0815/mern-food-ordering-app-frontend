import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(city);

  if (isLoading) {
    <span>Loading...</span>;
  }

  if (!results && !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr]">
      <div id="cuisines-list">insert cuisines here :)</div>
      <div id="main-content" className="flex flex-col gap-5">
        {city && (
          <SearchResultsInfo
            total={results?.pagination.total ?? 0}
            city={city}
          />
        )}
        {results?.data.map((restaurant) => (
          <SearchResultsCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
