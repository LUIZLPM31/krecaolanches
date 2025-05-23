
export interface ProductReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  user_name?: string;
}

export interface OrderCustomization {
  id: string;
  order_item_id: string;
  customization_type: 'adicionar' | 'remover';
  item_description: string;
  price_adjustment: number;
  created_at: string;
}
