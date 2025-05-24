
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export interface ProductReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_name: string;
  avatar_url?: string;
  helpful_count?: number;
  unhelpful_count?: number;
  verified_purchase?: boolean;
}

export function useProductReviews(productId: string) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  const fetchReviews = async () => {
    try {
      // First get the reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError);
        return;
      }

      if (!reviewsData || reviewsData.length === 0) {
        setReviews([]);
        return;
      }

      // Get unique user IDs from reviews
      const userIds = [...new Set(reviewsData.map(review => review.user_id))];

      // Fetch profiles for these users
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .in('id', userIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      // Create a map of user profiles for quick lookup
      const profilesMap = new Map();
      if (profilesData) {
        profilesData.forEach(profile => {
          profilesMap.set(profile.id, profile);
        });
      }

      // Combine reviews with profile data
      const formattedReviews: ProductReview[] = reviewsData.map(review => {
        const profile = profilesMap.get(review.user_id);
        return {
          id: review.id,
          product_id: review.product_id,
          user_id: review.user_id,
          rating: review.rating,
          comment: review.comment || '',
          created_at: review.created_at,
          user_name: profile?.name || 'Usuário',
          avatar_url: profile?.avatar_url || undefined,
          helpful_count: 0,
          unhelpful_count: 0,
          verified_purchase: false
        };
      });

      setReviews(formattedReviews);
    } catch (error) {
      console.error('Error in fetchReviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const submitReview = async (rating: number, comment: string) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para avaliar produtos",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('product_reviews')
        .insert({
          product_id: productId,
          user_id: user.id,
          rating,
          comment
        });

      if (error) {
        console.error('Error submitting review:', error);
        toast({
          title: "Erro ao enviar avaliação",
          description: "Tente novamente mais tarde",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Avaliação enviada!",
        description: "Obrigado por sua avaliação"
      });

      // Refresh reviews
      await fetchReviews();
    } catch (error) {
      console.error('Error in submitReview:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const markHelpful = async (reviewId: string) => {
    // Placeholder implementation - would need helpfulness tracking table
    console.log('Mark helpful:', reviewId);
  };

  const markUnhelpful = async (reviewId: string) => {
    // Placeholder implementation - would need helpfulness tracking table
    console.log('Mark unhelpful:', reviewId);
  };

  return {
    reviews,
    loading,
    submitting,
    submitReview,
    markHelpful,
    markUnhelpful,
    refreshReviews: fetchReviews
  };
}
