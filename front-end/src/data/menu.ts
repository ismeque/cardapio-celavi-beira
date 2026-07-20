import type { Category, Restaurant } from "@/lib/types";

/** Dados da casa. Substitua livremente pelos dados reais. */
export const RESTAURANT: Restaurant = {
  name: "CELA VI",
  tagline: "Nosso Magnífico Cardápio",
  location: "Beira, Moçambique",
  logo: "/logo-celavi-gold.png",
  currency: "MT",
  whatsapp: "258840000000",
};

/**
 * Cardápio de exemplo.
 * Estrutura de 3 níveis: Categoria → Subcategoria → Produto.
 * Categorias sem subcategorias vão direto aos produtos.
 */
export const CATEGORIES: Category[] = [
  {
    id: "recomendados",
    name: { pt: "Recomendados", en: "Recommended" },
    emoji: "⭐",
    description: {
      pt: "As escolhas da casa que não pode perder.",
      en: "The house picks you can't miss.",
    },
    products: [
      {
        id: "rec-1",
        name: { pt: "Old Fashioned da Casa", en: "House Old Fashioned" },
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=70&auto=format&fit=crop",
        description: {
          pt: "Bourbon envelhecido, açúcar mascavado, angostura e casca de laranja.",
          en: "Aged bourbon, brown sugar, angostura and orange peel.",
        },
        price: 650,
        tags: ["Assinatura", "Premium"],
        rating: 4.9,
        ratingCount: 128,
      },
      {
        id: "rec-2",
        name: { pt: "Picanha na Pedra", en: "Picanha on the Stone" },
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=70&auto=format&fit=crop",
        description: {
          pt: "300g de picanha maturada servida na pedra quente com farofa e chimichurri.",
          en: "300g of aged picanha served on a hot stone with farofa and chimichurri.",
        },
        price: 1450,
        tags: ["Recomendado"],
        rating: 4.8,
        ratingCount: 96,
      },
      {
        id: "rec-3",
        name: { pt: "Camarão Tigre Grelhado", en: "Grilled Tiger Prawns" },
        image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800&q=70&auto=format&fit=crop",
        description: {
          pt: "Camarão tigre grelhado no alho e limão, arroz de coco.",
          en: "Tiger prawns grilled with garlic and lime, coconut rice.",
        },
        price: 1250,
        tags: ["Recomendado"],
        rating: 4.7,
        ratingCount: 74,
      },
      {
        id: "rec-4",
        name: { pt: "Gin Tónico Botânico", en: "Botanical Gin & Tonic" },
        image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&q=70&auto=format&fit=crop",
        description: {
          pt: "Gin premium, tónica artesanal, zimbro, alecrim e frutos vermelhos.",
          en: "Premium gin, artisanal tonic, juniper, rosemary and red berries.",
        },
        price: 590,
        tags: ["Novo"],
        rating: 4.8,
        ratingCount: 61,
      },
    ],
  },
  {
    id: "bebidas",
    name: { pt: "Bebidas", en: "Drinks" },
    emoji: "🍹",
    description: {
      pt: "Uma carta completa de bebidas premium.",
      en: "A complete list of premium drinks.",
    },
    subcategories: [
      {
        id: "cervejas-draft",
        name: { pt: "Cervejas / Draft", en: "Beers / Draft" },
        emoji: "🍺",
        products: [
          {
            id: "cd-1",
            name: "Lambreta 2M / Manica",
            image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&q=70&auto=format&fit=crop",
            description: { pt: "Cerveja nacional bem gelada.", en: "Ice-cold local beer." },
            price: 150,
            tags: ["Popular"],
          },
          {
            id: "cd-2",
            name: "2M 300ml",
            description: { pt: "A clássica moçambicana.", en: "The Mozambican classic." },
            price: 180,
          },
          {
            id: "cd-3",
            name: "Laurentina Preta 500ml",
            description: { pt: "Encorpada e maltada.", en: "Full-bodied and malty." },
            price: 250,
          },
          { id: "cd-4", name: "Heineken 330ml", price: 220 },
          {
            id: "cd-5",
            name: "Draft Pint",
            description: { pt: "Chope tirado na hora, 500ml.", en: "Freshly poured draft, 500ml." },
            price: 280,
          },
        ],
      },
      {
        id: "whisky",
        name: "Whisky",
        emoji: "🥃",
        products: [
          {
            id: "wk-1",
            name: { pt: "Jameson (dose)", en: "Jameson (shot)" },
            image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=70&auto=format&fit=crop",
            price: 350,
          },
          {
            id: "wk-2",
            name: { pt: "Johnnie Walker Black (dose)", en: "Johnnie Walker Black (shot)" },
            price: 480,
            tags: ["Premium"],
          },
          {
            id: "wk-3",
            name: { pt: "Chivas Regal 12 (dose)", en: "Chivas Regal 12 (shot)" },
            price: 520,
            tags: ["Premium"],
          },
          {
            id: "wk-4",
            name: { pt: "Macallan 12 (dose)", en: "Macallan 12 (shot)" },
            price: 950,
            tags: ["Premium"],
          },
          {
            id: "wk-5",
            name: { pt: "Glenfiddich 15 (dose)", en: "Glenfiddich 15 (shot)" },
            price: 1100,
            tags: ["Premium"],
          },
        ],
      },
      {
        id: "cocktails",
        name: "Cocktails",
        emoji: "🍸",
        products: [
          {
            id: "ck-1",
            name: "Old Fashioned",
            image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=70&auto=format&fit=crop",
            description: {
              pt: "Bourbon, açúcar, angostura e laranja.",
              en: "Bourbon, sugar, angostura and orange.",
            },
            price: 650,
            tags: ["Assinatura"],
          },
          {
            id: "ck-2",
            name: "Margarita",
            image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=70&auto=format&fit=crop",
            description: { pt: "Tequila, triple sec e limão.", en: "Tequila, triple sec and lime." },
            price: 550,
          },
          {
            id: "ck-3",
            name: "Mojito",
            image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&q=70&auto=format&fit=crop",
            description: { pt: "Rum, hortelã, lima e soda.", en: "Rum, mint, lime and soda." },
            price: 520,
          },
          {
            id: "ck-4",
            name: "Espresso Martini",
            description: {
              pt: "Vodka, café espresso e licor de café.",
              en: "Vodka, espresso and coffee liqueur.",
            },
            price: 620,
            tags: ["Novo"],
          },
          {
            id: "ck-5",
            name: "Aperol Spritz",
            description: { pt: "Aperol, prosecco e soda.", en: "Aperol, prosecco and soda." },
            price: 600,
          },
        ],
      },
      {
        id: "gin",
        name: "Gin",
        emoji: "🍸",
        products: [
          {
            id: "gn-1",
            name: { pt: "Gin Tónico Clássico", en: "Classic Gin & Tonic" },
            description: { pt: "Gin premium e tónica.", en: "Premium gin and tonic." },
            price: 490,
          },
          {
            id: "gn-2",
            name: { pt: "Gin Tónico Botânico", en: "Botanical Gin & Tonic" },
            description: {
              pt: "Zimbro, alecrim e frutos vermelhos.",
              en: "Juniper, rosemary and red berries.",
            },
            price: 590,
            tags: ["Recomendado"],
          },
          {
            id: "gn-3",
            name: { pt: "Hendrick's Tónico", en: "Hendrick's & Tonic" },
            description: { pt: "Pepino e pétalas de rosa.", en: "Cucumber and rose petals." },
            price: 720,
            tags: ["Premium"],
          },
        ],
      },
      {
        id: "vodkas",
        name: "Vodkas",
        emoji: "🍸",
        products: [
          { id: "vd-1", name: { pt: "Smirnoff (dose)", en: "Smirnoff (shot)" }, price: 300 },
          { id: "vd-2", name: { pt: "Absolut (dose)", en: "Absolut (shot)" }, price: 380 },
          {
            id: "vd-3",
            name: { pt: "Grey Goose (dose)", en: "Grey Goose (shot)" },
            price: 620,
            tags: ["Premium"],
          },
        ],
      },
      {
        id: "vinhos-tintos-sa",
        name: { pt: "Vinhos Tintos (South Africa)", en: "Red Wines (South Africa)" },
        emoji: "🍷",
        products: [
          {
            id: "vt-1",
            name: {
              pt: "Nederburg Cabernet Sauvignon (garrafa)",
              en: "Nederburg Cabernet Sauvignon (bottle)",
            },
            image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=70&auto=format&fit=crop",
            price: 2200,
          },
          {
            id: "vt-2",
            name: { pt: "Two Oceans Merlot (garrafa)", en: "Two Oceans Merlot (bottle)" },
            price: 1800,
          },
          {
            id: "vt-3",
            name: { pt: "Kanonkop Pinotage (garrafa)", en: "Kanonkop Pinotage (bottle)" },
            price: 3800,
            tags: ["Premium"],
          },
        ],
      },
      {
        id: "champanhe",
        name: { pt: "Champanhe", en: "Champagne" },
        emoji: "🍾",
        products: [
          {
            id: "cp-1",
            name: { pt: "Moët & Chandon Brut (garrafa)", en: "Moët & Chandon Brut (bottle)" },
            price: 8500,
            tags: ["Premium"],
          },
          {
            id: "cp-2",
            name: { pt: "Veuve Clicquot (garrafa)", en: "Veuve Clicquot (bottle)" },
            price: 9800,
            tags: ["Premium"],
          },
          {
            id: "cp-3",
            name: { pt: "Dom Pérignon (garrafa)", en: "Dom Pérignon (bottle)" },
            price: 24000,
            tags: ["Premium"],
          },
        ],
      },
      {
        id: "sem-alcool",
        name: { pt: "Sem Álcool / Refrigerantes", en: "Non-Alcoholic / Soft Drinks" },
        emoji: "🥤",
        products: [
          { id: "sa-1", name: "Coca-Cola 330ml", price: 90 },
          { id: "sa-2", name: { pt: "Água Mineral 500ml", en: "Mineral Water 500ml" }, price: 60 },
          {
            id: "sa-3",
            name: { pt: "Sumo Natural de Laranja", en: "Fresh Orange Juice" },
            description: { pt: "Espremido na hora.", en: "Freshly squeezed." },
            price: 180,
          },
          { id: "sa-4", name: "Red Bull", price: 200 },
        ],
      },
    ],
  },
  {
    id: "comida",
    name: { pt: "Comida", en: "Food" },
    emoji: "🍽️",
    description: {
      pt: "Da entrada à sobremesa, com sabor de casa.",
      en: "From starter to dessert, with homemade flavor.",
    },
    subcategories: [
      {
        id: "entradas",
        name: { pt: "Entradas", en: "Starters" },
        emoji: "🥗",
        products: [
          {
            id: "en-1",
            name: { pt: "Rissóis de Camarão (6un)", en: "Shrimp Rissoles (6pc)" },
            description: {
              pt: "Massa crocante e recheio cremoso.",
              en: "Crispy pastry with creamy filling.",
            },
            price: 380,
          },
          {
            id: "en-2",
            name: { pt: "Bruschetta da Casa", en: "House Bruschetta" },
            image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=800&q=70&auto=format&fit=crop",
            description: {
              pt: "Tomate, manjericão e azeite virgem.",
              en: "Tomato, basil and virgin olive oil.",
            },
            price: 320,
            tags: ["Vegetariano"],
          },
          {
            id: "en-3",
            name: { pt: "Tábua de Queijos e Enchidos", en: "Cheese & Charcuterie Board" },
            description: {
              pt: "Seleção de queijos curados e enchidos.",
              en: "Selection of cured cheeses and cold cuts.",
            },
            price: 750,
            tags: ["Partilhar"],
          },
        ],
      },
      {
        id: "principais",
        name: { pt: "Pratos Principais", en: "Main Courses" },
        emoji: "🍖",
        products: [
          {
            id: "pr-1",
            name: { pt: "Picanha na Pedra", en: "Picanha on the Stone" },
            image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=70&auto=format&fit=crop",
            description: {
              pt: "300g maturada com farofa e chimichurri.",
              en: "300g aged, with farofa and chimichurri.",
            },
            price: 1450,
            tags: ["Recomendado"],
          },
          {
            id: "pr-2",
            name: { pt: "Frango à Zambeziana", en: "Zambezian Chicken" },
            description: {
              pt: "Frango grelhado no molho de coco e piri-piri.",
              en: "Grilled chicken in coconut and piri-piri sauce.",
            },
            price: 890,
            tags: ["Picante"],
          },
          {
            id: "pr-3",
            name: { pt: "Bacalhau à Lagareiro", en: "Cod à Lagareiro" },
            description: {
              pt: "Lombo de bacalhau, batata a murro e azeite.",
              en: "Cod loin, smashed potatoes and olive oil.",
            },
            price: 1350,
          },
          {
            id: "pr-4",
            name: { pt: "Burger CELA VI", en: "CELA VI Burger" },
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=70&auto=format&fit=crop",
            description: {
              pt: "Blend da casa 200g, cheddar, bacon e batata rústica.",
              en: "200g house blend, cheddar, bacon and rustic fries.",
            },
            price: 780,
            tags: ["Assinatura"],
          },
        ],
      },
      {
        id: "sobremesas",
        name: { pt: "Sobremesas", en: "Desserts" },
        emoji: "🍰",
        products: [
          { id: "sb-1", name: { pt: "Mousse de Chocolate", en: "Chocolate Mousse" }, price: 280 },
          {
            id: "sb-2",
            name: { pt: "Cheesecake de Frutos Vermelhos", en: "Red Berry Cheesecake" },
            price: 320,
            tags: ["Novo"],
          },
          {
            id: "sb-3",
            name: "Petit Gâteau",
            description: { pt: "Com gelado de baunilha.", en: "With vanilla ice cream." },
            price: 350,
          },
        ],
      },
    ],
  },
  {
    id: "pasta-risoto",
    name: { pt: "Pasta e Risoto", en: "Pasta & Risotto" },
    emoji: "🍝",
    description: {
      pt: "Massas frescas e risotos cremosos.",
      en: "Fresh pasta and creamy risottos.",
    },
    products: [
      {
        id: "ps-1",
        name: { pt: "Risoto de Camarão", en: "Shrimp Risotto" },
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=70&auto=format&fit=crop",
        description: {
          pt: "Arbóreo, camarão, tomate e parmesão.",
          en: "Arborio, shrimp, tomato and parmesan.",
        },
        price: 980,
        tags: ["Recomendado"],
      },
      {
        id: "ps-2",
        name: "Tagliatelle Alfredo",
        description: { pt: "Molho cremoso de parmesão.", en: "Creamy parmesan sauce." },
        price: 720,
        tags: ["Vegetariano"],
      },
      { id: "ps-3", name: { pt: "Spaghetti à Bolonhesa", en: "Spaghetti Bolognese" }, price: 680 },
      {
        id: "ps-4",
        name: { pt: "Risoto de Funghi", en: "Mushroom Risotto" },
        description: { pt: "Cogumelos selvagens e trufa.", en: "Wild mushrooms and truffle." },
        price: 850,
        tags: ["Vegetariano"],
      },
    ],
  },
  {
    id: "mariscos",
    name: { pt: "Mariscos", en: "Seafood" },
    emoji: "🦐",
    description: { pt: "O melhor do mar do Índico.", en: "The best of the Indian Ocean." },
    products: [
      {
        id: "mr-1",
        name: { pt: "Camarão Tigre Grelhado", en: "Grilled Tiger Prawns" },
        image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800&q=70&auto=format&fit=crop",
        description: {
          pt: "No alho e limão, arroz de coco.",
          en: "With garlic and lime, coconut rice.",
        },
        price: 1250,
        tags: ["Recomendado"],
      },
      {
        id: "mr-2",
        name: { pt: "Lagosta Grelhada", en: "Grilled Lobster" },
        description: { pt: "Com manteiga de ervas.", en: "With herb butter." },
        price: 2400,
        tags: ["Premium"],
      },
      { id: "mr-3", name: { pt: "Lulas à Provençal", en: "Squid Provençal" }, price: 890 },
      {
        id: "mr-4",
        name: { pt: "Mariscada da Casa", en: "House Seafood Platter" },
        description: {
          pt: "Camarão, lulas, ameijoas e caranguejo.",
          en: "Shrimp, squid, clams and crab.",
        },
        price: 1980,
        tags: ["Partilhar"],
      },
    ],
  },
  {
    id: "caipirinha",
    name: "Caipirinha",
    emoji: "🍹",
    description: { pt: "A clássica e as suas variações.", en: "The classic and its variations." },
    products: [
      {
        id: "cai-1",
        name: { pt: "Caipirinha Clássica", en: "Classic Caipirinha" },
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=70&auto=format&fit=crop",
        description: { pt: "Cachaça, lima e açúcar.", en: "Cachaça, lime and sugar." },
        price: 420,
      },
      {
        id: "cai-2",
        name: { pt: "Caipiroska de Frutos Vermelhos", en: "Red Berry Caipiroska" },
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=70&auto=format&fit=crop",
        description: { pt: "Vodka, morango e framboesa.", en: "Vodka, strawberry and raspberry." },
        price: 480,
        tags: ["Popular"],
      },
      {
        id: "cai-3",
        name: { pt: "Caipirinha de Maracujá", en: "Passion Fruit Caipirinha" },
        price: 460,
      },
      {
        id: "cai-4",
        name: "Sakerinha",
        description: { pt: "Saquê, lima e açúcar.", en: "Sake, lime and sugar." },
        price: 500,
        tags: ["Novo"],
      },
    ],
  },
  {
    id: "charutos-hookas",
    name: { pt: "Charutos e Hookas", en: "Cigars & Hookahs" },
    emoji: "🚬",
    description: { pt: "Para prolongar a noite com estilo.", en: "To extend the night in style." },
    subcategories: [
      {
        id: "charutos",
        name: { pt: "Charutos", en: "Cigars" },
        emoji: "🚬",
        products: [
          { id: "ch-1", name: "Cohiba Siglo II", price: 1800, tags: ["Premium"] },
          { id: "ch-2", name: "Montecristo No. 4", price: 1200 },
          { id: "ch-3", name: "Romeo y Julieta", price: 1400 },
        ],
      },
      {
        id: "hookas",
        name: { pt: "Hookas", en: "Hookahs" },
        emoji: "💨",
        products: [
          {
            id: "hk-1",
            name: { pt: "Hooka Clássica", en: "Classic Hookah" },
            description: { pt: "Sabor à escolha.", en: "Flavor of your choice." },
            price: 900,
          },
          {
            id: "hk-2",
            name: { pt: "Hooka Premium Ice", en: "Premium Ice Hookah" },
            description: { pt: "Base de gelo e fruta.", en: "Ice and fruit base." },
            price: 1200,
            tags: ["Recomendado"],
          },
        ],
      },
    ],
  },
  {
    id: "shots",
    name: "Shots",
    emoji: "🥃",
    description: { pt: "Para animar a mesa.", en: "To liven up the table." },
    products: [
      { id: "sh-1", name: { pt: "Tequila (dose)", en: "Tequila (shot)" }, price: 220 },
      { id: "sh-2", name: { pt: "Jägermeister (dose)", en: "Jägermeister (shot)" }, price: 260 },
      {
        id: "sh-3",
        name: "B-52",
        description: {
          pt: "Licor de café, Baileys e triple sec.",
          en: "Coffee liqueur, Baileys and triple sec.",
        },
        price: 300,
        tags: ["Popular"],
      },
      { id: "sh-4", name: "Kamikaze", price: 280 },
    ],
  },
  {
    id: "especial-casa",
    name: { pt: "Especial da Casa", en: "House Specials" },
    emoji: "✨",
    description: {
      pt: "Criações exclusivas do nosso chef e bartender.",
      en: "Exclusive creations from our chef and bartender.",
    },
    products: [
      {
        id: "es-1",
        name: { pt: "Torre de Fruta & Espumante", en: "Fruit & Sparkling Tower" },
        description: { pt: "Para partilhar em grande.", en: "To share in style." },
        price: 3200,
        tags: ["Premium", "Partilhar"],
      },
      {
        id: "es-2",
        name: { pt: "Combo CELA VI", en: "CELA VI Combo" },
        description: {
          pt: "Seleção de petiscos da casa para 4 pessoas.",
          en: "House snack selection for 4 people.",
        },
        price: 1600,
        tags: ["Partilhar"],
      },
      {
        id: "es-3",
        name: { pt: "Cocktail Surpresa do Bartender", en: "Bartender's Surprise Cocktail" },
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=70&auto=format&fit=crop",
        description: { pt: "Deixe-se surpreender.", en: "Let yourself be surprised." },
        price: 700,
        tags: ["Novo"],
      },
    ],
  },
];
