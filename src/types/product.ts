
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  category?: string;
  ifoodUrl?: string;
}
