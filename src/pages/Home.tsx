import { Link } from "react-router-dom";
import HeroCarousel from "@/components/HeroCarousel";
import ComicCard from "@/components/ComicCard";
import { Button } from "@/components/ui/button";
import { comics } from "@/data/comics";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const newReleases = comics.slice(0, 4);
  const popularSeries = comics.slice(4, 8);

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      {/* New Releases Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">New Releases</h2>
            <p className="text-muted-foreground">The latest comics hot off the press</p>
          </div>
          <Link to="/browse">
            <Button variant="ghost" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newReleases.map((comic) => (
            <div key={comic.id} className="animate-fade-in">
              <ComicCard comic={comic} />
            </div>
          ))}
        </div>
      </section>

      {/* Popular Series Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Popular Series</h2>
            <p className="text-muted-foreground">Fan favorites and bestsellers</p>
          </div>
          <Link to="/browse">
            <Button variant="ghost" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularSeries.map((comic) => (
            <div key={comic.id} className="animate-fade-in">
              <ComicCard comic={comic} />
            </div>
          ))}
        </div>
      </section>

      {/* Publisher Spotlights */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Browse by Publisher</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Marvel", "DC", "Image"].map((publisher) => (
            <Link
              key={publisher}
              to={`/browse?publisher=${publisher}`}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 hover-lift"
            >
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                  {publisher}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Explore {publisher} comics
                </p>
                <Button variant="outline" className="gap-2">
                  Browse
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
