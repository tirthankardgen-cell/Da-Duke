export type MenuCategory =
  | "Tea & coffee"
  | "From the kitchen"
  | "Something sweet";
export type MenuItem = {
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  note?: string;
};

export const menuCategories: MenuCategory[] = [
  "Tea & coffee",
  "From the kitchen",
  "Something sweet",
];

// Illustrative sample menu. Replace with the café's approved items and prices.
export const menu: MenuItem[] = [
  {
    name: "The Duke’s Chai",
    description:
      "Full-bodied Assam tea, gently simmered with milk, ginger & a little nostalgia.",
    price: 140,
    category: "Tea & coffee",
    note: "THE HOUSE RITUAL",
  },
  {
    name: "Darjeeling, First Flush",
    description:
      "A delicate, floral cup from the hills. Best enjoyed just as it is.",
    price: 180,
    category: "Tea & coffee",
  },
  {
    name: "The Slow Cappuccino",
    description: "A rich espresso, silky milk & a moment to yourself.",
    price: 190,
    category: "Tea & coffee",
  },
  {
    name: "The Butter Croissant",
    description:
      "Golden, impossibly flaky layers. A little Paris with your morning chai.",
    price: 180,
    category: "From the kitchen",
    note: "A LITTLE EUROPE",
  },
  {
    name: "The Garden Toast",
    description:
      "Sourdough, herbed mushrooms, soft cheese & a handful of fresh greens.",
    price: 290,
    category: "From the kitchen",
  },
  {
    name: "The Adda Sandwich",
    description:
      "Toasted country bread, spiced paneer & our coriander chutney.",
    price: 260,
    category: "From the kitchen",
  },
  {
    name: "Chocolate, Slowly",
    description:
      "A generous slice of chocolate cake. Because some things need no occasion.",
    price: 240,
    category: "Something sweet",
    note: "STAY FOR A SLICE",
  },
  {
    name: "Nolen Gur Cheesecake",
    description:
      "Creamy baked cheesecake with the mellow sweetness of Bengal’s date-palm jaggery.",
    price: 280,
    category: "Something sweet",
    note: "SEASONAL",
  },
  {
    name: "The Tea-Time Shortbread",
    description:
      "Buttery little biscuits, a whisper of cardamom. Made for one more cup.",
    price: 120,
    category: "Something sweet",
  },
];

export const categoryImages: Record<
  MenuCategory,
  { src: string; alt: string }
> = {
  "Tea & coffee": {
    src: "/images/tea.webp",
    alt: "A warm cup of tea, ready for a slow afternoon",
  },
  "From the kitchen": {
    src: "/images/croissant.webp",
    alt: "Golden, flaky croissants fresh from the bakery",
  },
  "Something sweet": {
    src: "/images/cake.webp",
    alt: "A richly layered chocolate cake",
  },
};
