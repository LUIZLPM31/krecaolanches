
// Corrigindo os erros relatados

import { useState } from "react";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/hooks/useAuth";
import { useProductReviews } from "@/hooks/useProductReviews";
import { toast } from "@/hooks/use-toast";
import { WriteReviewForm } from "./WriteReviewForm";

export function ProductReviewSection({ productId }: { productId: string }) {
  const { reviews, isLoading, refetch, addReviewHelpful, addReviewUnhelpful, addReview, deleteReview } = useProductReviews(productId);
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);

  if (isLoading) {
    return <div className="flex justify-center items-center my-8">Carregando avaliações...</div>;
  }

  const handleReviewSubmit = async (data: { rating: number; comment: string }) => {
    if (!user) {
      toast({
        title: "Você precisa estar logado",
        description: "Faça login para deixar uma avaliação",
        variant: "destructive",
      });
      return;
    }

    try {
      await addReview({
        rating: data.rating,
        comment: data.comment,
      });
      
      toast({
        title: "Avaliação enviada",
        description: "Sua avaliação foi enviada com sucesso",
      });
      
      setShowForm(false);
      void refetch();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar sua avaliação",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">
          Avaliações dos clientes ({reviews.length})
        </h2>
        {user && !showForm && (
          <Button onClick={() => setShowForm(true)} variant="outline">
            Avaliar produto
          </Button>
        )}
      </div>

      {showForm && (
        <div className="mt-4">
          <WriteReviewForm onSubmit={handleReviewSubmit} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <div className="space-y-4 mt-6">
        {reviews.length === 0 ? (
          <p className="text-center py-6 text-gray-500 dark:text-gray-400">
            Este produto ainda não possui avaliações. Seja o primeiro a avaliar!
          </p>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="border dark:border-gray-800 dark:bg-gray-900">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.avatar_url} alt={review.user_name} />
                  <AvatarFallback className="bg-krecao-red text-white">
                    {review.user_name[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg font-medium dark:text-white">
                    {review.user_name}
                  </CardTitle>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      {formatDistanceToNow(new Date(review.created_at), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </span>
                    {user?.id === review.user_id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 ml-auto"
                        onClick={() => {
                          if (window.confirm("Tem certeza que deseja excluir esta avaliação?")) {
                            deleteReview(review.id);
                          }
                        }}
                      >
                        Excluir
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{review.comment}</p>
                <div className="flex items-center mt-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => addReviewHelpful(review.id)}
                  >
                    <ThumbsUp size={14} />
                    <span>{review.helpful_count}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => addReviewUnhelpful(review.id)}
                  >
                    <ThumbsDown size={14} />
                    <span>{review.unhelpful_count}</span>
                  </Button>
                  {review.verified_purchase && (
                    <Badge variant="outline" className="ml-auto bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Compra verificada
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
