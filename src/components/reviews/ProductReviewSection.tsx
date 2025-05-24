
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star, ThumbsUp, ThumbsDown, MessageCircle, User } from "lucide-react";
import { useProductReviews, type ProductReview } from "@/hooks/useProductReviews";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { WriteReviewForm } from "./WriteReviewForm";

interface ProductReviewSectionProps {
  productId: string;
}

export function ProductReviewSection({ productId }: ProductReviewSectionProps) {
  const { reviews, loading, submitting, submitReview, markHelpful, markUnhelpful } = useProductReviews(productId);
  const { user } = useAuth();
  const [showWriteReview, setShowWriteReview] = useState(false);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map(rating => 
    reviews.filter(review => review.rating === rating).length
  );

  const handleSubmitReview = async (rating: number, comment: string) => {
    await submitReview(rating, comment);
    setShowWriteReview(false);
  };

  const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
    const starSize = size === "lg" ? "h-5 w-5" : "h-4 w-4";
    
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              starSize,
              "transition-colors duration-200",
              star <= rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h3 className="text-2xl font-bold">Avaliações do Produto</h3>
          <div className="flex items-center space-x-2 mt-2">
            {renderStars(Math.round(averageRating), "lg")}
            <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
            <span className="text-gray-500">({reviews.length} avaliações)</span>
          </div>
        </div>
        
        {user && !showWriteReview && (
          <Button 
            onClick={() => setShowWriteReview(true)}
            className="bg-krecao-red hover:bg-krecao-red/90 transition-all duration-200 transform hover:scale-105"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Escrever Avaliação
          </Button>
        )}
      </div>

      {/* Rating Distribution */}
      {reviews.length > 0 && (
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <h4 className="font-semibold mb-3">Distribuição das Avaliações</h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="w-8 text-sm">{rating}</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-yellow-400 h-full transition-all duration-500 ease-out"
                    style={{ 
                      width: reviews.length > 0 ? `${(ratingCounts[index] / reviews.length) * 100}%` : '0%' 
                    }}
                  />
                </div>
                <span className="w-8 text-sm text-gray-600">{ratingCounts[index]}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Write Review Form */}
      {showWriteReview && (
        <div className="animate-scale-in">
          <WriteReviewForm
            productId={productId}
            onSubmit={handleSubmitReview}
            onCancel={() => setShowWriteReview(false)}
            isSubmitting={submitting}
          />
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card className="p-8 text-center animate-fade-in">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-600 mb-2">
              Seja o primeiro a avaliar!
            </h4>
            <p className="text-gray-500">
              Compartilhe sua experiência com este produto
            </p>
          </Card>
        ) : (
          reviews.map((review, index) => (
            <Card 
              key={review.id} 
              className="p-4 transition-all duration-200 hover:shadow-md hover:border-krecao-yellow/20 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex space-x-4">
                <Avatar className="transition-transform duration-200 hover:scale-110">
                  <AvatarImage src={review.avatar_url} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{review.user_name}</span>
                      {review.verified_purchase && (
                        <Badge variant="secondary" className="text-xs">
                          Compra Verificada
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  
                  {renderStars(review.rating)}
                  
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  
                  <div className="flex items-center space-x-4 pt-2">
                    <button 
                      onClick={() => markHelpful(review.id)}
                      className="flex items-center space-x-1 text-sm text-gray-500 hover:text-green-600 transition-colors duration-200"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>Útil ({review.helpful_count || 0})</span>
                    </button>
                    
                    <button 
                      onClick={() => markUnhelpful(review.id)}
                      className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-600 transition-colors duration-200"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span>Não útil ({review.unhelpful_count || 0})</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
