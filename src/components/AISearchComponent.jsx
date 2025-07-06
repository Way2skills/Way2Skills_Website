import { useState, useEffect } from "react";
import axios from "axios";

const AISearchComponent = ({ 
  searchType = "reviews", 
  placeholder = "Search...", 
  onResults = () => {},
  className = ""
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMode, setSearchMode] = useState("hybrid");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const AI_SEARCH_API = "http://localhost:5000/api";

  // Debounced search function
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.length >= 2) {
        performSearch();
        getSuggestions();
      } else {
        setResults([]);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, searchMode]);

  const performSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(`${AI_SEARCH_API}/search/${searchType}`, {
        params: {
          q: query,
          type: searchMode,
          limit: 20
        }
      });

      setResults(response.data.results);
      onResults(response.data.results);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestions = async () => {
    if (query.length < 2) return;

    try {
      const response = await axios.get(`${AI_SEARCH_API}/suggestions`, {
        params: {
          q: query,
          table: searchType
        }
      });

      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Suggestions error:", error);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  return (
    <div className={`ai-search-component ${className}`}>
      {/* Search Input with Options */}
      <div className="search-container relative mb-4">
        <div className="flex gap-2 mb-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder={placeholder}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Mode Selector */}
          <select
            value={searchMode}
            onChange={(e) => setSearchMode(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="hybrid">🔍 Hybrid Search</option>
            <option value="semantic">🧠 AI Semantic</option>
            <option value="keyword">📝 Keyword</option>
          </select>
        </div>

        {/* Search Info */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            {loading ? (
              "Searching..."
            ) : (
              `${results.length} results found`
            )}
          </span>
          <span className="flex items-center gap-1">
            {searchMode === "semantic" && "🧠 AI-powered semantic search"}
            {searchMode === "hybrid" && "🔍 Smart hybrid search"}
            {searchMode === "keyword" && "📝 Traditional keyword search"}
          </span>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Searching with AI...</span>
        </div>
      )}

      {/* Search Results */}
      {!loading && results.length > 0 && (
        <div className="search-results">
          <h3 className="text-lg font-semibold mb-3">Search Results</h3>
          <div className="space-y-3">
            {results.map((result, index) => (
              <div key={result.id || index} className="result-item p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                {searchType === "reviews" && (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{result.name}</h4>
                      {result.rating && (
                        <div className="flex items-center">
                          {"⭐".repeat(result.rating)}
                          <span className="ml-1 text-sm text-gray-600">({result.rating}/5)</span>
                        </div>
                      )}
                    </div>
                    <p 
                      className="text-gray-700 mb-2"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(result.comment, query)
                      }}
                    />
                    {result.similarity && (
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{new Date(result.created_at).toLocaleDateString()}</span>
                        <span>Relevance: {(result.similarity * 100).toFixed(1)}%</span>
                      </div>
                    )}
                  </div>
                )}

                {searchType === "registrations" && (
                  <div>
                    <h4 className="font-semibold text-lg">{result.name}</h4>
                    <p className="text-gray-600">{result.email}</p>
                    {result.course && <p className="text-blue-600 font-medium">Course: {result.course}</p>}
                    {result.phone_no && <p className="text-gray-500">Phone: {result.phone_no}</p>}
                    {result.similarity && (
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>{new Date(result.created_at).toLocaleDateString()}</span>
                        <span>Relevance: {(result.similarity * 100).toFixed(1)}%</span>
                      </div>
                    )}
                  </div>
                )}

                {searchType === "courses" && (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{result.title}</h4>
                      {result.discount_price && (
                        <div className="text-right">
                          <span className="text-lg font-bold text-green-600">₹{result.discount_price}</span>
                          {result.actual_price && (
                            <span className="text-sm text-gray-500 line-through ml-2">₹{result.actual_price}</span>
                          )}
                        </div>
                      )}
                    </div>
                    {result.description && (
                      <p 
                        className="text-gray-700 mb-2"
                        dangerouslySetInnerHTML={{
                          __html: highlightText(result.description, query)
                        }}
                      />
                    )}
                    {result.features && result.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {result.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                    {result.similarity && (
                      <div className="text-sm text-gray-500">
                        Relevance: {(result.similarity * 100).toFixed(1)}%
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && query && results.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No results found</h3>
          <p className="text-gray-500">
            Try different keywords or switch to a different search mode
          </p>
        </div>
      )}
    </div>
  );
};

export default AISearchComponent;