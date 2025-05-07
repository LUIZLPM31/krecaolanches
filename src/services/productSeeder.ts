
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";

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
      image_url: "/lovable-uploads/c7c76be9-f6aa-4af8-9787-3ba84363461b.png",
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
      name: "Xis K-recão",
      description: "O xis especial da casa com hambúrguer duplo, queijo, bacon, ovo e molho K-recão. Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
      price: "36.90",
      image_url: "/lovable-uploads/6d4d9c64-03db-4cb5-a0d4-598ba5b8f318.png",
      category: "Xis"
    },
    {
      name: "Cobertura de Strogonoff com Batata Palha",
      description: "Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo. Serve 2 pessoas (1100g).",
      price: "68.00",
      image_url: "/lovable-uploads/f4ef723c-4098-49f8-a54c-ad4af8303f1f.png",
      category: "Porções"
    },
    {
      name: "Batata Frita K-recão",
      description: "Porção de batata frita crocante com queijo cheddar e bacon.",
      price: "19.90",
      image_url: "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Porções"
    },
    {
      name: "Bauru De Alcatra Com Fritas",
      description: "Pão Cervejinha, Bife De Alcatra, Maionese, Tomate Em Rodelas, Folhas De Alface, Queijo, Ovo E Fritas. Serve 2 pessoas.",
      price: "59.00",
      image_url: "/lovable-uploads/a5f32f77-8219-4d5b-beb5-b163c604f4e5.png",
      category: "Lanches"
    },
    {
      name: "Dog Simples",
      description: "1 Salsicha, Maionese, Tomate, Alface, Milho, Mostarda, Catchup, Molho, Queijo Mussarela. Serve 1 pessoa.",
      price: "23.00",
      image_url: "/lovable-uploads/abd68998-91bc-4cb4-a7a2-dbb5366adcf2.png",
      category: "Lanches"
    },
    {
      name: "Ala Minuta De Bife Na Chapa Promo",
      description: "Bife (Coxão De Dentro), arroz, ovo e batatas fritas. Serve 1 pessoa.",
      price: "36.50",
      image_url: "/lovable-uploads/9b68fa7a-09c7-457c-bbe8-d6c68da3dff5.png",
      category: "Pratos"
    },
    {
      name: "Iscas De Tilápia",
      description: "Iscas De Tilápia Empanadas 500g, Acompanha Ovos De Codorna, Pepino Conserva, Azeitonas, Limão",
      price: "75.00",
      image_url: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Porções"
    },
    {
      name: "Prensado",
      description: "Maionese, tomate, alface, presunto, queijo e ovo. Serve 1 pessoa.",
      price: "22.60",
      image_url: "/lovable-uploads/67740c08-faea-4884-a10e-2bca132fd95c.png",
      category: "Lanches"
    }
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
