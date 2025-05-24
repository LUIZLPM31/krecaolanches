
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface WriteReviewFormProps {
  productId: string;
  onSubmit: (rating: number, comment: string) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function WriteReviewForm({ productId, onSubmit, onCancel, isSubmitting }: WriteReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && comment.trim()) {
      onSubmit(rating, comment);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-card animate-fade-in">
      <h3 className="text-lg font-semibold">Escrever Avaliação</h3>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Avaliação:</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-all duration-200 hover:scale-110"
            >
              <Star
                className={cn(
                  "h-6 w-6 transition-colors duration-200",
                  star <= (hoveredRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Comentário:</label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Compartilhe sua experiência com este produto..."
          className="min-h-20 transition-all duration-200 focus:ring-2 focus:ring-krecao-yellow"
        />
      </div>

      <div className="flex space-x-2">
        <Button
          type="submit"
          disabled={rating === 0 || !comment.trim() || isSubmitting}
          className="bg-krecao-red hover:bg-krecao-red/90 transition-all duration-200 transform hover:scale-105"
        >
          {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="transition-all duration-200 hover:bg-gray-100"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
