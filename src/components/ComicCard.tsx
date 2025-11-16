import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Comic } from "@/data/comics";
import { addToCart } from "@/utils/cart";
import { toast } from "sonner";

interface ComicCardProps {
  comic: Comic;
}

const ComicCard = ({ comic }: ComicCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(comic);
    toast.success(`${comic.title} added to cart!`);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <Link to={`/comic/${comic.id}`}>
      <Card className="group overflow-hidden hover-lift gradient-card border-border/50 h-full">
        <div className="aspect-[2/3] overflow-hidden bg-muted">
          <img
            src={comic.coverImage}
            alt={comic.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-bold line-clamp-1 group-hover:text-primary transition-colors">
              {comic.title}
            </h3>
            <p className="text-sm text-muted-foreground">{comic.publisher}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">${comic.price.toFixed(2)}</span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ComicCard;
