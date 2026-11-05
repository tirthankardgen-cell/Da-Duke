export type PageId =
  | "home"
  | "house"
  | "table"
  | "carte"
  | "gatherings"
  | "private"
  | "visit"
  | "gallery";
export type SectionId =
  | "duality"
  | "house"
  | "ritual"
  | "gatherings"
  | "private"
  | "gallery"
  | "visit";
export type SketchKind = "hills" | "rome" | "paris" | "florence" | "tea";

export type PageCopy = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
};

export type SectionCopy = PageCopy & {
  body: string;
  linkLabel: string;
  image: string;
};

export type MediaItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  collection: string;
  focalPoint: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: string;
  dietary: string;
  featured: boolean;
  seasonal?: boolean;
  recommended?: boolean;
  available: boolean;
};

export type CafeEvent = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  startsAt: string;
  endsAt: string;
  category: string;
  image: string;
  venue: string;
  status: "scheduled" | "sold-out" | "cancelled" | "postponed";
  published: boolean;
  featured: boolean;
  enquiries: boolean;
};

export type SiteContent = {
  version: 1;
  settings: {
    whatsapp: string;
    enquiryMessage: string;
    address: string;
    directions: string;
    mapsUrl: string;
    phone: string;
    email: string;
    instagram: string;
    hours: string[];
    specialHours: string;
    menuPdf: string;
    capacity: string;
    occasions: string[];
    photoNotice: string;
    menuNotice: string;
  };
  pages: Record<PageId, PageCopy>;
  sections: Record<SectionId, SectionCopy>;
  homeSections: { id: SectionId; visible: boolean }[];
  houseNotes: { title: string; body: string }[];
  menuCategories: string[];
  menu: MenuItem[];
  media: MediaItem[];
  events: CafeEvent[];
};

export const pageLinks: { id: PageId; label: string; href: string }[] = [
  { id: "house", label: "The House", href: "/the-house" },
  { id: "carte", label: "The Carte", href: "/the-carte" },
  { id: "gatherings", label: "Gatherings", href: "/gatherings" },
  { id: "private", label: "Private Affairs", href: "/private-affairs" },
  { id: "gallery", label: "The Journal", href: "/the-journal" },
  { id: "visit", label: "Visit Us", href: "/visit-us" },
];

export const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const eventCategories = [
  "Tea tasting",
  "Live music",
  "Art & culture",
  "Literary evening",
  "Seasonal special",
  "Other",
];

// Concept content only. No business facts, prices or events have been invented.
// This serializable model is also the starting point for the browser-only editor.
export const initialContent: SiteContent = {
  version: 1,
  settings: {
    whatsapp: "",
    enquiryMessage:
      "Hello Da Duke and Chai! I’d love to know more about the house. Please share the details.",
    address: "",
    directions: "",
    mapsUrl: "",
    phone: "",
    email: "",
    instagram: "",
    hours: ["", "", "", "", "", "", ""],
    specialHours: "",
    menuPdf: "",
    capacity: "",
    occasions: [
      "Birthday",
      "Anniversary",
      "Private gathering",
      "Team evening",
      "Something else",
    ],
    photoNotice:
      "A visual moodboard. Photography illustrates the concept, rather than the actual café.",
    menuNotice:
      "A taste of the idea. These selections and prices are illustrative demo content, not the café’s confirmed menu.",
  },
  pages: {
    home: {
      eyebrow: "WHERE TWO WORLDS MEET",
      title: "Old-world elegance.",
      accent: "A new ritual of chai.",
      description:
        "European-inspired charm, with the warmth of Assam and the hills of Darjeeling.",
    },
    house: {
      eyebrow: "CHAPTER I · THE HOUSE",
      title: "A place",
      accent: "between places.",
      description:
        "A little European romance. A little mountain mist. A space for conversations worth staying for.",
    },
    carte: {
      eyebrow: "THE CARTE · FROM OUR KITCHEN & TEA ROOM",
      title: "The Carte",
      accent: "",
      description: "A little European indulgence, a little Himalayan soul.",
    },
    table: {
      eyebrow: "CHAPTER II · THE TABLE",
      title: "Good things.",
      accent: "Served slowly.",
      description:
        "From the first fragrant sip to the last little crumb. An invitation to take your time.",
    },
    gatherings: {
      eyebrow: "CHAPTER III · GATHERINGS",
      title: "Good company.",
      accent: "Beautiful evenings.",
      description:
        "A shared table, a little music, a story that stays. There is always something to look forward to.",
    },
    private: {
      eyebrow: "CHAPTER IV · PRIVATE AFFAIRS",
      title: "Your people.",
      accent: "Your little occasion.",
      description:
        "Birthdays, intimate celebrations, and evenings worth remembering. Let’s begin with a conversation.",
    },
    visit: {
      eyebrow: "CHAPTER V · VISIT US",
      title: "A little away.",
      accent: "A little at home.",
      description:
        "Bring a friend, a book, or just yourself. Make room in the day for something unhurried.",
    },
    gallery: {
      eyebrow: "THE VISUAL JOURNAL",
      title: "Collected moments.",
      accent: "Quiet pleasures.",
      description:
        "Soft light. Worn pages. A cup held in both hands. A few things that make up our world.",
    },
  },
  sections: {
    duality: {
      eyebrow: "A EUROPEAN STATE OF MIND. A HIMALAYAN CUP OF SOUL.",
      title: "Two worlds.",
      accent: "One warm welcome.",
      description:
        "The romance of an old European café. The warmth of tea traditions from Assam, Darjeeling and North Bengal. Somewhere between the two, a place to feel at home.",
      body: "Da Duke and Chai is imagined around a simple pleasure: good food, a thoughtful cup, and nowhere else you need to be.",
      linkLabel: "The idea behind the house",
      image: "terrace",
    },
    house: {
      eyebrow: "A HOUSE FOR THE UNHURRIED",
      title: "Stay for",
      accent: "the feeling.",
      description:
        "Warm wood, the curve of an arch, and the last of the afternoon light. A little old-world charm, with room for everyday life.",
      body: "A place for a chapter of your book, an impromptu catch-up, or a conversation that becomes an evening.",
      linkLabel: "Explore the House",
      image: "table",
    },
    ritual: {
      eyebrow: "THE SIGNATURE RITUAL",
      title: "A cup. A crumb.",
      accent: "A moment.",
      description:
        "Familiar comforts, thoughtfully imagined. A small introduction to the pleasures of the table.",
      body: "Tea has its own way of slowing a day down. Ours begins with an appreciation for the tea cultures of Assam and the hills of North Bengal.",
      linkLabel: "Discover the Table",
      image: "tea",
    },
    gatherings: {
      eyebrow: "WHAT’S ON AT THE HOUSE",
      title: "A reason",
      accent: "to come together.",
      description:
        "An evening of music. A conversation over tea. The kind of moments best enjoyed in good company.",
      body: "The next gathering is being prepared. Dates and details will appear here when they’re ready.",
      linkLabel: "Explore Gatherings",
      image: "interior",
    },
    private: {
      eyebrow: "SOME DAYS DESERVE A LITTLE MORE",
      title: "Make an evening",
      accent: "of it.",
      description:
        "Your favourite people. Something lovely on the table. An occasion that feels entirely your own.",
      body: "Tell us a little about what you have in mind. Our team will help you explore the possibilities.",
      linkLabel: "Plan an Occasion",
      image: "interior",
    },
    gallery: {
      eyebrow: "POSTCARDS FROM OUR WORLD",
      title: "The art of",
      accent: "being here.",
      description:
        "A collection of corners, textures and little details. Step inside the mood of Da Duke and Chai.",
      body: "A little inspiration, until we have photographs and stories of our own to share.",
      linkLabel: "View the Gallery",
      image: "terrace",
    },
    visit: {
      eyebrow: "FOLLOW THE SCENT OF CHAI",
      title: "Come for a cup.",
      accent: "Stay for a while.",
      description:
        "A small escape. A familiar feeling. We look forward to welcoming you.",
      body: "Our address, opening hours and contact details will be shared here once confirmed.",
      linkLabel: "Find Your Way Here",
      image: "terrace",
    },
  },
  homeSections: [
    { id: "duality", visible: true },
    { id: "house", visible: true },
    { id: "ritual", visible: true },
    { id: "gatherings", visible: true },
    { id: "private", visible: true },
    { id: "gallery", visible: true },
    { id: "visit", visible: true },
  ],
  houseNotes: [
    {
      title: "An old-world sensibility",
      body: "European cafés, graceful architecture and the intimacy of a literary salon shape the idea of the house. Character over ceremony. Warmth over grandeur.",
    },
    {
      title: "Tea at the heart of it",
      body: "Assam, Darjeeling and North Bengal inspire an appreciation for tea, landscape and hospitality. The menu will share the details of each cup when they are confirmed.",
    },
    {
      title: "Room for a little adda",
      body: "The pleasure of a conversation with no particular destination. Come as you are, find a comfortable corner, and let the afternoon unfold.",
    },
  ],
  menuCategories: ["Chai & Tea", "Coffee", "Breakfast", "Small Plates", "European Classics", "Mains", "Desserts", "House Specials"],
  menu: [
    {
      id: "chai",
      name: "A warming cup of chai",
      description:
        "The idea of a slow-simmered, gently spiced cup. A little comfort, held in both hands.",
      category: "Chai & Tea",
      image: "tea",
      price: "180",
      dietary: "",
      featured: true,
      available: true,
    },
    {
      id: "darjeeling",
      name: "A Darjeeling daydream",
      description:
        "A lighter tea ritual, inspired by the mist and tea culture of the hills.",
      category: "Chai & Tea",
      image: "tea",
      price: "220",
      dietary: "",
      featured: false,
      available: true,
    },
    {
      id: "coffee",
      name: "The afternoon coffee",
      description:
        "An espresso and soft milk. For the days when your pause calls for coffee.",
      category: "Coffee",
      image: "table",
      price: "190",
      dietary: "",
      featured: false,
      available: true,
    },
    {
      id: "croissant",
      name: "A little butter & pastry",
      description:
        "Golden layers and the pleasure of a leisurely breakfast. An idea from the café kitchen.",
      category: "Small Plates",
      image: "croissant",
      price: "240",
      dietary: "",
      featured: true,
      available: true,
    },
    {
      id: "cake",
      name: "Something chocolate",
      description:
        "A slice for the table, another fork, and just enough room for something sweet.",
      category: "Desserts",
      image: "cake",
      price: "280",
      dietary: "",
      featured: true,
      available: true,
    },
    {"id": "breakfast", "name": "Herb butter eggs on toast", "description": "Sourdough, soft eggs and herb butter. A leisurely start to the day.", "category": "Breakfast", "price": "320", "image": "", "dietary": "", "featured": false, "available": true, "seasonal": false, "recommended": false},
    {"id": "tart", "name": "Roasted tomato tart", "description": "Delicate pastry, slow-roasted tomatoes, cheese and basil.", "category": "European Classics", "price": "380", "image": "", "dietary": "", "featured": false, "available": true, "seasonal": false, "recommended": false},
    {"id": "risotto", "name": "Woodland mushroom risotto", "description": "Creamy arborio rice, saut\u00e9ed mushrooms and parmesan.", "category": "Mains", "price": "480", "image": "", "dietary": "", "featured": false, "available": true, "seasonal": false, "recommended": true},
    {"id": "custard", "name": "The tea garden cr\u00e8me", "description": "Assam tea-infused custard beneath a delicate caramel crust.", "category": "House Specials", "price": "290", "image": "", "dietary": "", "featured": false, "available": true, "seasonal": true, "recommended": false},
  ],
  media: [
    {
      id: "table",
      src: "/images/cafe-table.webp",
      alt: "Sunlight falling across wooden tables in a plant-filled café",
      caption: "A corner to call your own",
      collection: "Interiors",
      focalPoint: "50% 50%",
    },
    {
      id: "terrace",
      src: "/images/cafe-exterior.webp",
      alt: "A European café terrace with a pale façade and greenery",
      caption: "A little European daydream",
      collection: "Interiors",
      focalPoint: "50% 50%",
    },
    {
      id: "interior",
      src: "/images/cafe-interior.webp",
      alt: "Pendant lamps casting a warm glow over a café interior",
      caption: "The glow of a slow evening",
      collection: "Interiors",
      focalPoint: "50% 45%",
    },
    {
      id: "tea",
      src: "/images/tea.webp",
      alt: "A cup of tea beside a tea service and biscuits",
      caption: "The beginning of a ritual",
      collection: "Tea & Table",
      focalPoint: "50% 50%",
    },
    {
      id: "croissant",
      src: "/images/croissant.webp",
      alt: "Golden flaky croissants on a bakery tray",
      caption: "A little Paris, on a plate",
      collection: "Tea & Table",
      focalPoint: "50% 50%",
    },
    {
      id: "cake",
      src: "/images/cake.webp",
      alt: "A chocolate layer cake with a rich chocolate topping",
      caption: "Stay for another slice",
      collection: "Tea & Table",
      focalPoint: "50% 50%",
    },
    {
      id: "rome",
      src: "/images/rome.webp",
      alt: "The stone arches and weathered façade of Rome’s Colosseum",
      caption: "An old-world state of mind",
      collection: "Inspiration",
      focalPoint: "50% 50%",
    },
    {
      id: "mountains",
      src: "/images/mountains.webp",
      alt: "Layered Himalayan mountains beneath a soft, misty sky",
      caption: "A little mountain mist",
      collection: "Inspiration",
      focalPoint: "50% 50%",
    },
  ],
  events: [],
};
