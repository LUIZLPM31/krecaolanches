
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import { seedProductsToSupabase, seedSpecificProducts } from "./productSeeder";
import { homeMenuItems } from "@/data/homeMenuItems";

export type { Product } from "@/types/product";

export const fetchProducts = async (): Promise<{
  products: Product[];
  categories: string[];
  error?: string;
}> => {
  try {
    const { data, error } = await supabase.from("products").select("*");
    
    if (error) throw error;
    
    // If we got data from Supabase, use it, otherwise import from menuItems
    if (data && data.length > 0) {
      const products = data as Product[];
      
      // Extract unique categories
      const uniqueCategories = extractUniqueCategories(products);
      
      return {
        products,
        categories: ["Todos", ...uniqueCategories]
      };
    } else {
      // Convert homeMenuItems to Product format for initial data
      // Note: This will only be used for initial seeding if no products in DB
      const convertedMenuItems = convertMenuItemsToProducts(homeMenuItems);
      
      // Extract unique categories
      const uniqueCategories = extractUniqueCategories(convertedMenuItems);
      
      // Save to Supabase
      seedProductsToSupabase(convertedMenuItems);
      
      return {
        products: convertedMenuItems,
        categories: ["Todos", ...uniqueCategories]
      };
    }
  } catch (error: any) {
    // Fallback to homeMenuItems if Supabase fails
    const convertedMenuItems = convertMenuItemsToProducts(homeMenuItems);
    
    // Extract unique categories
    const uniqueCategories = extractUniqueCategories(convertedMenuItems);
    
    return {
      products: convertedMenuItems,
      categories: ["Todos", ...uniqueCategories],
      error: `Error fetching products: ${error.message || error}`
    };
  }
};

// Helper function to extract unique categories
const extractUniqueCategories = (products: Product[]): string[] => {
  return Array.from(
    new Set(products.map((product) => product.category))
  ).filter(Boolean);
};

// Helper function to convert menu items to product format
const convertMenuItemsToProducts = (items: typeof homeMenuItems): Product[] => {
  return items.map((item, index) => ({
    id: `menu-item-${index}`,
    name: item.name,
    description: item.description,
    price: parseFloat(item.price.replace('R$ ', '').replace(',', '.')),
    image_url: item.image,
    category: item.category || "Outros"
  }));
};

// Re-export seeding functions
export { seedProductsToSupabase, seedSpecificProducts };
