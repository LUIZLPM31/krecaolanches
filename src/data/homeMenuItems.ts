
// Dados específicos para os destaques da página inicial
export interface HomeMenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  category?: string;
  ifoodUrl?: string;
}

export const homeMenuItems: HomeMenuItem[] = [
   {
    name: "Xis Salada",
    description: "Hamburguer Artesanal, Maionese, Tomate, Alface, Milho, Mostarda, Catchup, Queijo, Ovo",
    price: "R$ 31,00",
    image: "/lovable-uploads/c7c76be9-f6aa-4af8-9787-3ba84363461b.png",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=5eb6dfbb-e4c3-461a-ad19-ee6e04be31c3"
  },
  {
    name: "Xis Calabresa",
    description: " Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
    price: "R$ 32,90",
    image: "/lovable-uploads/e8979a79-1dfc-4ed6-ae36-59940dc39802.png",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=5a73aae8-1a96-4b0f-948d-cca9c082fd5c"
  },
  {
    name: "Xis Frango",
    description: "Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
    price: "R$ 32,90",
    image: "/lovable-uploads/237a70a4-42a7-450d-8a50-41b539516fea.png",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=60222e84-34f0-4fa4-8941-3a4bccd3f98f"
  },
  {
    name: "Xis Coração",
    description: "Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
    price: "R$ 33,90",
    image: "/lovable-uploads/93c3515b-97af-4030-bac5-6b5295450e52.png",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=78139c90-c746-45ec-b544-b4078b87ff3a"
  },
  {
    name: "Xis Acebolado",
    description: "Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
    price: "R$ 31,90",
    image: "/lovable-uploads/0ca95bf4-e833-45e8-b142-e074365f0d95.png",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=b6176dfe-814d-44ab-81be-6fd75c5ceefb"
  },
  {
    name: "Xis 4 Queijos",
    description: "Hambúrguer artesanal com blend de 4 queijos, bacon e molho especial. Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
    price: "R$ 32,90",
    image: "https://i.postimg.cc/BbBX8F44/images.jpg",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=5c6786e3-98e1-4a63-81fc-a2417f45d0b4"
  },
  {
    name: "Xis K-recão",
    description: "Acompanha frango,coração, calabresa, bacon, carne, maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
    price: "R$ 36,90",
    image: "/lovable-uploads/6d4d9c64-03db-4cb5-a0d4-598ba5b8f318.png",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=47e56877-8690-4573-b568-0a45da6ffbfc"
  },
  {
    name: "Stogonoff especial ",
    description: "Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo. Serve 2 pessoas (1100g).",
    price: "R$ 68,00",
    image: "/lovable-uploads/f4ef723c-4098-49f8-a54c-ad4af8303f1f.png",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=88dbbcd0-4958-40c4-b50a-84bbfbb96039"
  },
  {
    name: "Bauru De Alcatra Com Fritas",
    description: "Pão Cervejinha, Bife De Alcatra, Maionese, Tomate Em Rodelas, Folhas De Alface, Queijo, Ovo E Fritas. Serve 2 pessoas.",
    price: "R$ 59,00",
    image: "/lovable-uploads/a5f32f77-8219-4d5b-beb5-b163c604f4e5.png",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=b3e26e55-7bcb-4fd4-9dc7-44010294891a"
  },
  {
    name: "Dog especial",
    description: "2 Salsicha, Maionese, Tomate, Alface, Milho, Mostarda, Catchup, Molho, Queijo Mussarela. Serve 1 pessoa.",
    price: "R$ 23,00",
    image: "/lovable-uploads/abd68998-91bc-4cb4-a7a2-dbb5366adcf2.png",
    category: "Lanches"
  },
  {
    name: "Dog simples",
    description: "1 Salsicha, Maionese, Tomate, Alface, Milho, Mostarda, Catchup, Molho, Queijo Mussarela. Serve 1 pessoa.",
    price: "R$ 22,60",
    image: "/lovable-uploads/abd68998-91bc-4cb4-a7a2-dbb5366adcf2.png",
    category: "Lanches"
  },
  {
    name: "Prensado",
    description: "Maionese, tomate, alface, presunto, queijo e ovo. Serve 1 pessoa.",
    price: "R$ 22,60",
    image: "/lovable-uploads/67740c08-faea-4884-a10e-2bca132fd95c.png",
    category: "Lanches"
  },
    {
    name: "Hamburguer",
    description: "Pão Brioche,Maionese Caseira,Hamburguer Artesanal,Tomate,Alface,Cheddar.",
    price: "R$ 15,00",
    image: "https://i.postimg.cc/L6VKbR9J/202204071422-3-G75-i.jpg",
    category: "Lanches"
  },
  {
    name: "Ala Minuta De Bife Na Chapa",
    description: "Bife (Coxão De Dentro), arroz, ovo e batatas fritas. Serve 1 pessoa.",
    price: "R$ 36,50",
    image: "/lovable-uploads/9b68fa7a-09c7-457c-bbe8-d6c68da3dff5.png",
    category: "Pratos"
  },
  {
    name: "Iscas De Tilápia",
    description: "Iscas De Tilápia Empanadas 500g, Acompanha Ovos De Codorna, Pepino Conserva, Azeitonas, Limão",
    price: "R$ 75,00",
    image: "https://i.postimg.cc/QMC37PrH/202203141303-F33-F-i.avif",
    category: "Porções",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=ace9aae0-c588-4c1f-8486-c15b28f9d0e3"
  },
  {
    name: "Frango Frito Crocante",
    description: "Iscas De Peito De Frango Empanado Crocante",
    price: "R$ 50,00",
    image: "",
    category: "Porções",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqC_7TfWLiYZRiVXiY9cAycBV9RmFkJA4-hmMMTLR_gvKm_wPPg&prato=8d4a8456-bc45-440a-87a4-ef9195d27e8a"
  },
   {
    name: "Pote de fritas com cheddar e bacon",
    description: "Serve 3 pessoas, 500g",
    price: "R$ 47,00",
    image: "https://i.postimg.cc/d0fKjBqn/202102151702-7v-A8.avif",
    category: "Porções"
  },
  {
    name: "Batata Frita G",
    description: "Porção de batata frita crocante com queijo cheddar e bacon.",
    price: "R$ 37,00",
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
    category: "Porções",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=3612fbe3-44cf-4bd6-b0e1-e0d538828057"
  },
  {
    name: "Refrigerante 2L",
    description: "Coca-Cola,Sprite, Fanta.",
    price: "R$ 20,00",
    image: "https://i.postimg.cc/1tpk31nT/download.jpg",
    category: "Bebidas"
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqC_7TfWLiYZRiVXiY9cAycBV9RmFkJA4-hmMMTLR_gvKm_wPPg&prato=0afcae85-de1a-4439-8ffb-50b2281739f8"
  },
   {
    name: "Refrigerante 2L",
    description: "Guaraná .",
    price: "R$ 17,00",
    image: "https://i.postimg.cc/Y9Kc7C9Y/download.jpg",
    category: "Bebidas"
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqC_7TfWLiYZRiVXiY9cAycBV9RmFkJA4-hmMMTLR_gvKm_wPPg&prato=d5fe3f9e-1620-46fc-86b2-1cdf57a66b85"
  },
  {
    name: "Refrigerante 600ml",
    description: "Coca-Cola, Guaraná, Sprite, Fanta.",
    price: "R$ 9,50",
    image: "https://i.postimg.cc/J0M9yYjh/download.jpg",
    category: "Bebidas"
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqC_7TfWLiYZRiVXiY9cAycBV9RmFkJA4-hmMMTLR_gvKm_wPPg&prato=f9bdcdf6-b7e6-4aa1-8ec5-a9188bec6d76"
  },
  {
    name: "Cervejas Latão",
    description: "Amstel, Budweiser, Eisenbahn, Polar, Bohemia ou Skol.",
    price: "R$ 9,50",
    image: "https://i.postimg.cc/W4cSbFGN/download.jpg",
    category: "Bebidas"
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqC_7TfWLiYZRiVXiY9cAycBV9RmFkJA4-hmMMTLR_gvKm_wPPg&prato=9dc11220-454d-4795-8b39-d2c959c83a62"
  },
  {
    name: "Cervejas Latão",
    description: "Heineken ou Stella Artois",
    price: "R$ 12,00",
    image: "https://i.postimg.cc/g2F3v9n4/images.jpg",
    category: "Bebidas"
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqC_7TfWLiYZRiVXiY9cAycBV9RmFkJA4-hmMMTLR_gvKm_wPPg&prato=0747a558-f347-4173-b611-503011ebb0b8"
  }

];
