import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { comics } from "@/data/comics";
import { Link } from "react-router-dom";

const HeroCarousel = () => {
  const featuredComics = comics.filter((comic) => comic.featured);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredComics.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredComics.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredComics.length) % featuredComics.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredComics.length);
  };

  const currentComic = featuredComics[currentIndex];

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden gradient-hero">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-10" />
      
      <div className="absolute inset-0 animate-fade-in">
        <img
          src={currentComic.coverImage}
          alt={currentComic.title}
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6 animate-slide-in">
          <div className="inline-block px-3 py-1 bg-primary/20 border border-primary/50 rounded-full text-sm font-semibold text-primary">
            Featured Release
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {currentComic.title}
          </h1>
          <p className="text-lg text-muted-foreground line-clamp-3">
            {currentComic.description}
          </p>
          <div className="flex gap-4">
            <Link to={`/comic/${currentComic.id}`}>
              <Button size="lg" className="shadow-glow">
                Read More
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" variant="outline">
                Browse All
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-background/80 hover:bg-background p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-background/80 hover:bg-background p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {featuredComics.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
