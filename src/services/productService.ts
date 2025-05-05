
import { supabase } from "@/integrations/supabase/client";
import { menuItems } from "@/components/MenuHighlights";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

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
      const uniqueCategories = Array.from(
        new Set(products.map((product) => product.category))
      ).filter(Boolean);
      
      return {
        products,
        categories: ["Todos", ...uniqueCategories]
      };
    } else {
      // Convert menuItems to Product format
      const convertedMenuItems = menuItems.map((item, index) => ({
        id: `menu-item-${index}`,
        name: item.name,
        description: item.description,
        price: parseFloat(item.price.replace('R$ ', '').replace(',', '.')),
        image_url: item.image,
        category: item.category || "Outros"
      }));
      
      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(convertedMenuItems.map((product) => product.category))
      ).filter(Boolean);
      
      // Save to Supabase
      seedProductsToSupabase(convertedMenuItems);
      
      return {
        products: convertedMenuItems,
        categories: ["Todos", ...uniqueCategories]
      };
    }
  } catch (error: any) {
    // Fallback to menuItems if Supabase fails
    const convertedMenuItems = menuItems.map((item, index) => ({
      id: `menu-item-${index}`,
      name: item.name,
      description: item.description,
      price: parseFloat(item.price.replace('R$ ', '').replace(',', '.')),
      image_url: item.image,
      category: item.category || "Outros"
    }));
    
    // Extract unique categories
    const uniqueCategories = Array.from(
      new Set(convertedMenuItems.map((product) => product.category))
    ).filter(Boolean);
    
    return {
      products: convertedMenuItems,
      categories: ["Todos", ...uniqueCategories],
      error: `Error fetching products: ${error.message || error}`
    };
  }
};

export const seedProductsToSupabase = async (products: Product[]) => {
  try {
    for (const product of products) {
      const { error } = await supabase.from("products").insert([
        {
          name: product.name,
          description: product.description,
          price: product.price,
          image_url: product.image_url,
          category: product.category
        }
      ]);
      
      if (error) {
        console.error("Error seeding product:", error);
      }
    }
  } catch (error) {
    console.error("Failed to seed products:", error);
  }
};

// Seed specific products (used in backup seeding flow)
export const seedSpecificProducts = async () => {
  const menuItems = [
    {
      name: "Xis Salada",
      description: "Hambúrguer artesanal, queijo cheddar, bacon crocante, alface e tomate. Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
      price: "29.90",
      image_url: "/lovable-uploads/d936da9b-59e0-4c24-9293-8e6340fe127a.png",
      category: "Xis"
    },
    {
      name: "Xis Calabresa",
      description: "Dois hambúrgueres artesanais, queijo duplo, calabresa e molho especial. Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
      price: "34.90",
      image_url: "/lovable-uploads/e8979a79-1dfc-4ed6-ae36-59940dc39802.png",
      category: "Xis"
    },
    {
      name: "Xis Frango",
      description: "Filé de frango grelhado, queijo, bacon, cebola caramelizada e molho da casa. Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
      price: "32.90",
      image_url: "/lovable-uploads/237a70a4-42a7-450d-8a50-41b539516fea.png",
      category: "Xis"
    },
    {
      name: "Batata Frita K-recão",
      description: "Porção de batata frita crocante com queijo cheddar e bacon.",
      price: "19.90",
      image_url: "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Porções"
    },
  ];

  try {
    for (const item of menuItems) {
      const { error } = await supabase.from("products").insert([
        {
          name: item.name,
          description: item.description,
          price: parseFloat(item.price),
          image_url: item.image_url,
          category: item.category
        }
      ]);
      
      if (error) throw error;
    }
    return true;
  } catch (error: any) {
    console.error("Failed to seed products:", error);
    return false;
  }
};
