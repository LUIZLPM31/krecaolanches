
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  helpful_count: number;
  unhelpful_count: number;
  verified_purchase: boolean;
  created_at: string;
  user_name: string;
  avatar_url: string;
}

interface AddReviewParams {
  rating: number;
  comment: string;
}

export const useProductReviews = (productId: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Query para buscar avaliações
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_reviews")
        .select(`
          *,
          profiles:user_id(name, avatar_url)
        `)
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);

      const formattedData = data.map((review) => ({
        ...review,
        user_name: review.profiles?.name || "Usuário Anônimo",
        avatar_url: review.profiles?.avatar_url || "",
      }));

      return formattedData;
    },
  });

  // Mutation para adicionar uma avaliação
  const addReviewMutation = useMutation({
    mutationFn: async (reviewData: AddReviewParams) => {
      if (!user) throw new Error("Usuário não autenticado");

      const newReview = {
        user_id: user.id,
        product_id: productId,
        rating: reviewData.rating,
        comment: reviewData.comment,
        helpful_count: 0,
        unhelpful_count: 0,
        verified_purchase: false,
      };

      const { data, error } = await supabase
        .from("product_reviews")
        .insert(newReview)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
  });

  // Mutation para marcar avaliação como útil
  const addHelpfulMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      const { data, error } = await supabase.rpc("increment_review_helpful", {
        review_id: reviewId,
      });

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
  });

  // Mutation para marcar avaliação como não útil
  const addUnhelpfulMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      const { data, error } = await supabase.rpc("increment_review_unhelpful", {
        review_id: reviewId,
      });

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
  });

  // Mutation para excluir uma avaliação
  const deleteReviewMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      const { error } = await supabase
        .from("product_reviews")
        .delete()
        .eq("id", reviewId)
        .eq("user_id", user?.id || "");

      if (error) throw new Error(error.message);
      return reviewId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
  });

  return {
    reviews: data || [],
    isLoading,
    isError,
    refetch,
    addReview: addReviewMutation.mutate,
    addReviewHelpful: addHelpfulMutation.mutate,
    addReviewUnhelpful: addUnhelpfulMutation.mutate,
    deleteReview: deleteReviewMutation.mutate,
  };
};
