
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
    image: "https://i.postimg.cc/Sscdw893/IMG-20250512-223131179.jpg",
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
    image: "https://i.postimg.cc/7LsSPNd8/IMG-20250515-WA0069.jpg",
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
    image: "https://i.postimg.cc/9FSLpMVq/201902262302-03008.jpg",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=b6176dfe-814d-44ab-81be-6fd75c5ceefb"
  },
   {
    name: "Xis Strogonoff",
    description: "Iscas De Carne, Creme De Leite, Molho, Champignon, maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
    price: "R$ 42,50",
    image: "https://i.postimg.cc/9FSLpMVq/201902262302-03008.jpg",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOopL7eS9ZrMiPBp6zmEZNcRExevkXAjYa9BMc6nmXxslNXSueTNX&prato=1181331c-1ef6-4c29-94b5-986899a592c0"
  },
   {
    name: "Xis Fricassé",
    description: "Frango, Creme De Leite, Molho, Champignon, maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
    price: "R$ 42,50",
    image: "https://i.postimg.cc/9FSLpMVq/201902262302-03008.jpg",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOopL7eS9ZrMiPBp6zmEZNcRExevkXAjYa9BMc6nmXxslNXSueTNX&prato=758c9e22-1658-4f7c-81b4-173f7cff7b40"
  },
   {
    name: "Xis Brocolis Com Catupiry",
    description: "Brocolis, Catupiry, maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
    price: "R$ 36,00",
    image: "https://i.postimg.cc/h4Hb7pjK/IMG-20250515-WA0074.jpg",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOopL7eS9ZrMiPBp6zmEZNcRExevkXAjYa9BMc6nmXxslNXSueTNX&prato=fb53666b-91f6-469b-b894-bfc3dfaa826b"
  },
  {
    name: "Xis 4 Queijos",
    description: "Acompanha maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo Mussarela, Parmesão, Provolone E Gorgonzola.",
    price: "R$ 32,90",
    image: "https://i.postimg.cc/7LYgyRBn/IMG-20250515-WA0070.jpg",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=5c6786e3-98e1-4a63-81fc-a2417f45d0b4"
  },
  {
    name: "Xis K-recão",
    description: "Acompanha frango,coração, calabresa, bacon, carne, maionese, tomate, alface, milho, mostarda, catchup, ovo e queijo.",
    price: "R$ 36,90",
    image: "https://i.postimg.cc/MZcmThzs/IMG-20250515-WA0064-1.jpg",
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
    image: "https://i.postimg.cc/hvHnbNY8/IMG-20250515-194006669-2.jpg",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=b3e26e55-7bcb-4fd4-9dc7-44010294891a"
  },
   {
    name: "Bauru Filé ",
    description: "Pão Cervejinha, Bife De Filé, Maionese, Tomate Em Rodelas, Folhas De Alface, Queijo E Ovo. Serve 1 pessoas.",
    price: "R$ 59,00",
    image: "https://i.postimg.cc/wTL55LyL/IMG-20250515-WA0073.jpg",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=b3e26e55-7bcb-4fd4-9dc7-44010294891a"
  },
  {
    name: "Dog especial",
    description: "2 Salsicha, Maionese, Tomate, Alface, Milho, Mostarda, Catchup, Molho, Queijo Mussarela. Serve 1 pessoa.",
    price: "R$ 23,00",
    image: "/lovable-uploads/abd68998-91bc-4cb4-a7a2-dbb5366adcf2.png",
    category: "Lanches",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=4907a12a-d9f1-4166-bfab-68d72e518a51"
  },
  {
    name: "Dog Simples",
    description: "1 Salsicha, Maionese, Tomate, Alface, Milho, Mostarda, Catchup, Molho, Queijo Mussarela. Serve 1 pessoa.",
    price: "R$ 22,60",
    image: "/lovable-uploads/abd68998-91bc-4cb4-a7a2-dbb5366adcf2.png",
    category: "Lanches",
     ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=f3d35ca0-947d-45e0-a106-3732c6f5bf35"
  },
   {
    name: "Dog Linguiça",
    description: "1 Linguiça, Maionese, Tomate, Alface, Milho, Mostarda, Catchup, Molho, Queijo Mussarela. Serve 1 pessoa.",
    price: "R$ 27,50",
    image: "/lovable-uploads/abd68998-91bc-4cb4-a7a2-dbb5366adcf2.png",
    category: "Lanches",
     ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=f3d35ca0-947d-45e0-a106-3732c6f5bf35"
  },
  {
    name: "Dog Duas Linguiça",
    description: "2 Linguiça, Maionese, Tomate, Alface, Milho, Mostarda, Catchup, Molho, Queijo Mussarela. Serve 1 pessoa.",
    price: "R$ 32,00",
    image: "/lovable-uploads/abd68998-91bc-4cb4-a7a2-dbb5366adcf2.png",
    category: "Lanches",
     ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=f3d35ca0-947d-45e0-a106-3732c6f5bf35"
  },
   {
    name: "Dog Krecao",
    description: "Coração de frango, Maionese, Tomate, Alface, Milho, Mostarda, Catchup, Queijo Mussarela. Serve 1 pessoa.",
    price: "R$ 34,00",
    image: "/lovable-uploads/abd68998-91bc-4cb4-a7a2-dbb5366adcf2.png",
    category: "Lanches",
     ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=f3d35ca0-947d-45e0-a106-3732c6f5bf35"

  },
  {
    name: "Prensado",
    description: "Maionese, tomate, alface, presunto, queijo e ovo. Serve 1 pessoa.",
    price: "R$ 22,60",
    image: "/lovable-uploads/67740c08-faea-4884-a10e-2bca132fd95c.png",
    category: "Lanches",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=c39116ca-ba02-4a1c-b179-24a728753a36"
  },
   {
    name: "Torrada Americana",
    description: "Pão De Forma, Tomate, Alface, Pepino Conserva, Batata Palha, Presunto, Queijo, Ovo, Maionese.",
    price: "R$ 25,00",
    image: "/lovable-uploads/67740c08-faea-4884-a10e-2bca132fd95c.png",
    category: "Lanches",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=c39116ca-ba02-4a1c-b179-24a728753a36"
  },
    {
    name: "Hamburguer",
    description: "Pão Brioche,Maionese Caseira,Hamburguer Artesanal,Tomate,Alface,Cheddar.",
    price: "R$ 15,00",
    image: "https://i.postimg.cc/L6VKbR9J/202204071422-3-G75-i.jpg",
    category: "Lanches",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=87cac371-ac6b-4267-a5d5-126aa4feb969"
  },
  {
    name: "Ala Minuta De Bife Na Chapa",
    description: "Bife (Coxão De Dentro), Arroz, Feijão, Ovo, Salada e Batatas ou Polemta ou Aipin. Serve 2 pessoa.",
    price: "R$ 36,50",
    image: "/lovable-uploads/9b68fa7a-09c7-457c-bbe8-d6c68da3dff5.png",
    category: "Pratos",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=0c7c2e19-75c8-4329-9bdd-8e7a11f87a33"
  },
   {
    name: "Bifé A Cavalo",
    description: "Bife (Coxão De Dentro), Pão na Chapa, Salada, ovo e Batatas ou Polemta ou Aipin. Serve 1 pessoa.",
    price: "R$ 36,50",
    image: "https://i.postimg.cc/MTnVnQJc/IMG-20250515-WA0068.jpg",
    category: "Pratos",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=0338bd1a-9ac5-4a33-9e0f-c397fa6198f6"
  },
  {
    name: "Ala Minuta A Parmeggiana",
    description: "Bife, Arroz, Feijão, Ovo e Batatas ou Polemta ou Aipin. Serve 2 pessoa.",
    price: "R$ 56,00",
    image: "https://i.postimg.cc/PxnjVx1L/Screenshot-20250516-124402-851.png",
    category: "Pratos",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=296db838-4847-4dd3-9667-6d968a6e0af0"
  },
   {
    name: "Ala Minuta De Frango",
    description: "Bife, Arroz, Feijão, Ovo e Batatas ou Polemta ou Aipin. Serve 2 pessoa.",
    price: "R$ 41,00",
    image: "https://i.postimg.cc/cLdpTxpd/IMG-20250520-204133939-2.jpg",
    category: "Pratos",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=e8c81d3f-0201-492a-9da0-ff5aa643a2fc"
  },
  {
    name: "Ala Minuta De Bife Acebolado",
    description: "Bife, Arroz, Feijão, Ovo e Batatas ou Polemta ou Aipin. Serve 2 pessoa.",
    price: "R$ 43,50",
    image: "https://i.postimg.cc/J0JXqCnM/IMG-20250515-WA0067.jpg",
    category: "Pratos",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=fd337db4-6c4e-4f57-ad60-89b9f8985b21"
  },
  {
    name: "Ala Minuta De Frango A Milanesa",
    description: "Bife, Arroz, Feijão, Ovo e Batatas ou Polemta ou Aipin. Serve 2 pessoa.",
    price: "R$ 43,50",
    image: "https://i.postimg.cc/J0JXqCnM/IMG-20250515-WA0067.jpg",
    category: "Pratos",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=fd337db4-6c4e-4f57-ad60-89b9f8985b21"
  },
  {
    name: "Ala Minuta A Milanesa",
    description: "Bife, Arroz, Feijão, Ovo e Batatas ou Polemta ou Aipin. Serve 2 pessoa.",
    price: "R$ 43,50",
    image: "https://i.postimg.cc/J0JXqCnM/IMG-20250515-WA0067.jpg",
    category: "Pratos",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=fd337db4-6c4e-4f57-ad60-89b9f8985b21"
  },
   {
    name: "Ala Minuta De Strogonoff",
    description: "Bife, Arroz, Feijão, Ovo e Batatas ou Polemta ou Aipin. Serve 2 pessoa.",
    price: "R$ 43,50",
    image: "https://i.postimg.cc/J0JXqCnM/IMG-20250515-WA0067.jpg",
    category: "Pratos",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=fd337db4-6c4e-4f57-ad60-89b9f8985b21"
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
    image: "https://i.postimg.cc/J4NJH8vQ/IMG-20250515-WA0059.jpg",
    category: "Porções",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqC_7TfWLiYZRiVXiY9cAycBV9RmFkJA4-hmMMTLR_gvKm_wPPg&prato=8d4a8456-bc45-440a-87a4-ef9195d27e8a"
  },
   {
    name: "Picado Quente Com Fritas",
    description: "Calabresa ou Frango, Coração, Carne, Batata, Farinha Temperada E Ovo de Codorna",
    price: "R$ 50,00",
    image: "https://i.postimg.cc/Vv8tKsV4/IMG-20250515-202626490.jpg",
    category: "Porções",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqC_7TfWLiYZRiVXiY9cAycBV9RmFkJA4-hmMMTLR_gvKm_wPPg&prato=8d4a8456-bc45-440a-87a4-ef9195d27e8a"
  },
   {
    name: "Bife a Xadrez",
    description: "Carne Amilanesa, Batata, Pepino E Ovo De Codorna",
    price: "R$ 50,00",
    image: "https://i.postimg.cc/qvrs1qyY/IMG-20250515-WA0072-1.jpg",
    category: "Porções",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqC_7TfWLiYZRiVXiY9cAycBV9RmFkJA4-hmMMTLR_gvKm_wPPg&prato=8d4a8456-bc45-440a-87a4-ef9195d27e8a"
  },
   {
    name: "Pote de fritas com cheddar e bacon",
    description: "Serve 3 pessoas, 500g",
    price: "R$ 47,00",
    image: "https://i.postimg.cc/d0fKjBqn/202102151702-7v-A8.avif",
    category: "Porções",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqSqJ9Ljo9DXYUuINHpJt6E2maNZ8wkgLXgh8-dDb5VM3DEsrNt&prato=74c3c0c8-be5b-42ea-97e0-01baae4a15ce"
  },
  {
    name: "Batata Frita G",
    description: "Porção de batata frita crocante com queijo cheddar e bacon.",
    price: "R$ 37,00",
    image: "https://i.postimg.cc/yNgvy28V/IMG-20250516-220453082-3.jpg",
    category: "Porções",
    ifoodUrl: "https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?prato=3612fbe3-44cf-4bd6-b0e1-e0d538828057"
  },
  {
    name: "Refrigerante 2L",
    description: "Coca-Cola,Sprite, Fanta.",
    price: "R$ 20,00",
    image: "https://i.postimg.cc/1tpk31nT/download.jpg",
    category: "Bebidas",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqC_7TfWLiYZRiVXiY9cAycBV9RmFkJA4-hmMMTLR_gvKm_wPPg&prato=0afcae85-de1a-4439-8ffb-50b2281739f8"
  },
   {
    name: "Refrigerante 2L",
    description: "Guaraná .",
    price: "R$ 17,00",
    image: "https://i.postimg.cc/Y9Kc7C9Y/download.jpg",
    category: "Bebidas",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqC_7TfWLiYZRiVXiY9cAycBV9RmFkJA4-hmMMTLR_gvKm_wPPg&prato=d5fe3f9e-1620-46fc-86b2-1cdf57a66b85"
  },
  {
    name: "Refrigerante 600ml",
    description: "Coca-Cola, Guaraná, Sprite, Fanta.",
    price: "R$ 9,50",
    image: "https://i.postimg.cc/J0M9yYjh/download.jpg",
    category: "Bebidas",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqC_7TfWLiYZRiVXiY9cAycBV9RmFkJA4-hmMMTLR_gvKm_wPPg&prato=f9bdcdf6-b7e6-4aa1-8ec5-a9188bec6d76"
  },
  {
    name: "Cervejas Latão",
    description: "Amstel, Budweiser, Eisenbahn, Polar, Bohemia ou Skol.",
    price: "R$ 9,50",
    image: "https://i.postimg.cc/W4cSbFGN/download.jpg",
    category: "Bebidas",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqC_7TfWLiYZRiVXiY9cAycBV9RmFkJA4-hmMMTLR_gvKm_wPPg&prato=9dc11220-454d-4795-8b39-d2c959c83a62"
  },
  {
    name: "Cervejas Latão",
    description: "Heineken ou Stella Artois",
    price: "R$ 12,00",
    image: "https://i.postimg.cc/g2F3v9n4/images.jpg",
    category: "Bebidas",
    ifoodUrl:"https://www.ifood.com.br/delivery/porto-alegre-rs/k-recao-lanches--grelhados-e-porcoes-cristal/6275accc-4883-446b-8359-d98bcc367615?srsltid=AfmBOoqC_7TfWLiYZRiVXiY9cAycBV9RmFkJA4-hmMMTLR_gvKm_wPPg&prato=0747a558-f347-4173-b611-503011ebb0b8"
  }
];
