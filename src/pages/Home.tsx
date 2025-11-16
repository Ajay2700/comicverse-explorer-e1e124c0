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
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h2 className="text-4xl font-bold mb-2 text-gradient">New Releases</h2>
            <p className="text-muted-foreground text-lg">The latest comics hot off the press</p>
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
      <section className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="flex items-center justify-between mb-8 animate-fade-in relative z-10">
          <div>
            <h2 className="text-4xl font-bold mb-2 text-gradient">Popular Series</h2>
            <p className="text-muted-foreground text-lg">Fan favorites and bestsellers</p>
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
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center text-gradient animate-fade-in">Browse by Publisher</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Marvel", "DC", "Image"].map((publisher, index) => (
            <Link
              key={publisher}
              to={`/browse?publisher=${publisher}`}
              className="group relative overflow-hidden rounded-xl comic-panel p-10 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="text-center space-y-4 relative z-10">
                <h3 className="text-3xl font-bold group-hover:text-gradient transition-all duration-300">
                  {publisher}
                </h3>
                <p className="text-base text-muted-foreground group-hover:text-foreground transition-colors">
                  Explore {publisher} comics
                </p>
                <Button variant="outline" className="gap-2 shadow-glow border-primary/30 group-hover:border-primary group-hover:shadow-neon transition-all">
                  Browse
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
