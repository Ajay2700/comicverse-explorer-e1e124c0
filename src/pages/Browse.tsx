import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ComicCard from "@/components/ComicCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { comics, publishers, genres } from "@/data/comics";
import { Filter } from "lucide-react";

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPublisher, setSelectedPublisher] = useState(searchParams.get("publisher") || "All");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const publisher = searchParams.get("publisher");
    if (publisher) {
      setSelectedPublisher(publisher);
    }
  }, [searchParams]);

  const filteredAndSortedComics = useMemo(() => {
    let result = [...comics];

    // Filter by publisher
    if (selectedPublisher !== "All") {
      result = result.filter((comic) => comic.publisher === selectedPublisher);
    }

    // Filter by genre
    if (selectedGenre !== "All") {
      result = result.filter((comic) => comic.genre === selectedGenre);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "title":
          return a.title.localeCompare(b.title);
        case "date":
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [selectedPublisher, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-hero border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Comics</h1>
          <p className="text-lg text-muted-foreground">
            Discover your next favorite comic from our extensive collection
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Sort */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 md:hidden"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <div className="hidden md:flex items-center gap-4 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Publisher:</span>
                <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {publishers.map((publisher) => (
                      <SelectItem key={publisher} value={publisher}>
                        {publisher}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Genre:</span>
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low-High)</SelectItem>
                  <SelectItem value="price-high">Price (High-Low)</SelectItem>
                  <SelectItem value="date">Release Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden space-y-4 p-4 border border-border rounded-lg bg-card">
              <div className="space-y-2">
                <span className="text-sm font-medium">Publisher:</span>
                <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {publishers.map((publisher) => (
                      <SelectItem key={publisher} value={publisher}>
                        {publisher}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">Genre:</span>
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAndSortedComics.length} {filteredAndSortedComics.length === 1 ? "comic" : "comics"}
          </p>
        </div>

        {/* Comics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedComics.map((comic) => (
            <div key={comic.id} className="animate-fade-in">
              <ComicCard comic={comic} />
            </div>
          ))}
        </div>

        {filteredAndSortedComics.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No comics found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
