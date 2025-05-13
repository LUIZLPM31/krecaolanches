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
    },
    
    // Add new drinks category
    {
      name: "Refrigerante Lata",
      description: "Coca-Cola, Guaraná Antarctica, Sprite, Fanta ou Pepsi.",
      price: 6.50,
      image_url: "https://images.unsplash.com/photo-1581098365948-6061a61ff396?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Bebidas"
    },
    {
      name: "Refrigerante 2L",
      description: "Coca-Cola, Guaraná Antarctica, Sprite, Fanta ou Pepsi.",
      price: 15.00,
      image_url: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Bebidas"
    },
    {
      name: "Suco Natural",
      description: "Suco natural de laranja, abacaxi, morango ou uva.",
      price: 8.50,
      image_url: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Bebidas"
    },
    {
      name: "Água Mineral",
      description: "Água mineral sem gás ou com gás.",
      price: 4.00,
      image_url: "https://images.unsplash.com/photo-1566724356302-cda1a94d139f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Bebidas"
    },
    
    // Add new add-ons category
    {
      name: "Catupiry",
      description: "Porção adicional de catupiry para o seu lanche.",
      price: 3.50,
      image_url: "https://images.unsplash.com/photo-1626078690577-a493cf14f282?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Adicionais"
    },
    {
      name: "Cheddar",
      description: "Porção adicional de cheddar para o seu lanche.",
      price: 3.50,
      image_url: "https://images.unsplash.com/photo-1625084560240-905f6ddac523?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Adicionais"
    },
    {
      name: "Cebola Grelhada",
      description: "Porção adicional de cebola grelhada para o seu lanche.",
      price: 2.50,
      image_url: "https://images.unsplash.com/photo-1580996378027-23040f16f157?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Adicionais"
    },
    {
      name: "Picles",
      description: "Porção adicional de picles para o seu lanche.",
      price: 2.00,
      image_url: "https://images.unsplash.com/photo-1593197525554-4ab5e7b34490?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Adicionais"
    },
    {
      name: "4 Queijos",
      description: "Porção adicional de mix de 4 queijos para o seu lanche.",
      price: 4.50,
      image_url: "https://images.unsplash.com/photo-1619860705243-39775a7baed3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Adicionais"
    },
    {
      name: "Azeitona",
      description: "Porção adicional de azeitonas para o seu lanche.",
      price: 2.00,
      image_url: "https://images.unsplash.com/photo-1573208957999-4f1755af9593?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Adicionais"
    },
    {
      name: "Bife Adicional",
      description: "Bife adicional para o seu lanche.",
      price: 6.00,
      image_url: "https://images.unsplash.com/photo-1612871689353-cccf581d667b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      category: "Adicionais"
    }
  ];

  try {
    for (const item of menuItems) {
      const { error } = await supabase.from("products").insert([
        {
          name: item.name,
          description: item.description,
          price: parseFloat(item.price.toString()),
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
