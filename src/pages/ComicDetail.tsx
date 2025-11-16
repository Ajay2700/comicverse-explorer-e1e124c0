import { useParams, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Calendar, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { comics } from "@/data/comics";
import { addToCart } from "@/utils/cart";
import { toast } from "sonner";

const ComicDetail = () => {
  const { id } = useParams();
  const comic = comics.find((c) => c.id === id);

  if (!comic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Comic Not Found</h1>
          <p className="text-muted-foreground">The comic you're looking for doesn't exist.</p>
          <Link to="/browse">
            <Button>Browse Comics</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(comic);
    toast.success(`${comic.title} added to cart!`);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/browse">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Browse
          </Button>
        </Link>
      </div>

      {/* Comic Details */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cover Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg shadow-card group">
              <img
                src={comic.coverImage}
                alt={comic.title}
                className="w-full aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 shadow-glow">{comic.publisher}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">{comic.title}</h1>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-gradient animate-glow-pulse">₹{comic.price}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">
                  <strong>Creators:</strong> {comic.creators.join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm">
                  <strong>Genre:</strong> {comic.genre}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  <strong>Release Date:</strong> {new Date(comic.releaseDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm">
                  <strong>Pages:</strong> {comic.pages}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold">Synopsis</h2>
              <p className="text-muted-foreground leading-relaxed">{comic.description}</p>
            </div>

            <Button
              size="lg"
              onClick={handleAddToCart}
              className="w-full md:w-auto gap-2 shadow-glow"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicDetail;
