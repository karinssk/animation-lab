export type MenuItem = {
  name: string;
  description: string;
  price: string;
  image: string;
  tag?: string;
};

export type Branch = {
  label: string;
  address: string;
  hours: string;
  phone: string;
};

export type Promotion = {
  title: string;
  description: string;
  expires: string;
};

export type Review = {
  author: string;
  stars: number;
  text: string;
};

export type Place = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  rating: string;
  ratingCount: string;
  price: string;
  distance: string;
  status: string;
  hours: string;
  address: string;
  phone: string;
  website: string;
  tags: string[];
  photos: string[];
  reviews: Review[];
  latlng: [number, number];
  menu: MenuItem[];
  promotions: Promotion[];
  branches: Branch[];
};

export const PLACES: Place[] = [
  {
    id: "p1",
    name: "Kenny's BKK - Ari",
    category: "Burger · Western",
    tagline: "Bangkok's most-loved comfort burgers",
    rating: "4.7",
    ratingCount: "1,181",
    price: "$$",
    distance: "0.8 km",
    status: "Open Now",
    hours: "11 AM – 10 PM",
    address: "12, Soi Ari 1, Phaya Thai Rd, BKK 10400",
    phone: "090 995 2040",
    website: "kennysbkk.com",
    tags: ["Dine-in", "Takeaway", "Kid-friendly", "Wifi"],
    photos: ["/food-pizza.jpg", "/food-steak.avif", "/food-pizza.jpg"],
    menu: [
      { name: "Classic Smash Burger", description: "Double smash patty, American cheese, pickles, special sauce", price: "฿220", image: "/food-pizza.jpg", tag: "Best Seller" },
      { name: "BBQ Bacon Stack", description: "Triple patty, crispy bacon, BBQ glaze, onion rings", price: "฿290", image: "/food-steak.avif", tag: "Popular" },
      { name: "Crispy Chicken Burger", description: "Buttermilk fried chicken, slaw, sriracha mayo", price: "฿200", image: "/food-pizza.jpg" },
      { name: "Truffle Fries", description: "Golden fries, truffle oil, parmesan, herbs", price: "฿120", image: "/food-steak.avif" },
    ],
    promotions: [
      { title: "Lunch Set Deal", description: "Burger + fries + drink for ฿299 (save ฿80)", expires: "Daily 11 AM – 2 PM" },
      { title: "Student Discount", description: "10% off with student ID", expires: "All day" },
    ],
    branches: [
      { label: "Ari (This branch)", address: "12, Soi Ari 1, Phaya Thai Rd, BKK 10400", hours: "11 AM – 10 PM", phone: "090 995 2040" },
      { label: "Thonglor", address: "88/2 Sukhumvit 55, Klongton Nua, Bangkok", hours: "11 AM – 11 PM", phone: "02 392 1100" },
      { label: "Silom", address: "44 Silom Rd, Bangrak, Bangkok", hours: "10 AM – 10 PM", phone: "02 234 5678" },
    ],
    reviews: [
      { author: "Sarah M.", stars: 5, text: "Best burgers in Bangkok — crispy fries, quick service. Will 100% return." },
      { author: "James T.", stars: 4, text: "Great spot. Gets packed on weekends but totally worth the wait." },
    ],
    latlng: [13.7757, 100.5494],
  },
  {
    id: "p2",
    name: "Cayo Caribe",
    category: "Seafood · Caribbean",
    tagline: "Fresh catches with a Caribbean twist",
    rating: "3.9",
    ratingCount: "161",
    price: "$$$",
    distance: "2.1 km",
    status: "Closed",
    hours: "11 AM – 9 PM",
    address: "San Juan A, Coastal Market, Bangkok",
    phone: "02 144 8899",
    website: "cayocaribe.co.th",
    tags: ["Outdoor Seating", "Reservations", "Live Music"],
    photos: ["/food-steak.avif", "/food-pizza.jpg", "/food-steak.avif"],
    menu: [
      { name: "Caribbean Ceviche", description: "Fresh sea bass, citrus, chilli, coconut cream", price: "฿280", image: "/food-steak.avif", tag: "Must Try" },
      { name: "Grilled Lobster", description: "Whole lobster, herb butter, grilled corn", price: "฿890", image: "/food-pizza.jpg", tag: "Signature" },
      { name: "Jerk Chicken Platter", description: "Spiced grilled chicken, rice & peas, plantain", price: "฿320", image: "/food-steak.avif" },
      { name: "Coconut Prawn Skewers", description: "Tiger prawns, coconut marinade, mango salsa", price: "฿360", image: "/food-pizza.jpg" },
    ],
    promotions: [
      { title: "Happy Hour", description: "50% off cocktails 5–7 PM", expires: "Mon – Fri" },
    ],
    branches: [
      { label: "Coastal Market (This branch)", address: "San Juan A, Coastal Market, Bangkok", hours: "11 AM – 9 PM", phone: "02 144 8899" },
    ],
    reviews: [
      { author: "Linda P.", stars: 4, text: "Unique flavors you won't find elsewhere. The ceviche is a must-try." },
      { author: "Mike R.", stars: 3, text: "Good food but portions are a bit small for the price." },
    ],
    latlng: [13.7722, 100.5452],
  },
  {
    id: "p3",
    name: "Spicy Squad House",
    category: "Thai · Street Food",
    tagline: "Fiery Thai classics in the heart of Ari",
    rating: "4.5",
    ratingCount: "903",
    price: "$",
    distance: "1.5 km",
    status: "Open Now",
    hours: "10 AM – 9 PM",
    address: "Ari Soi 4, Bangkok 10400",
    phone: "02 999 1732",
    website: "spicysquad.th",
    tags: ["Local Fav", "Spicy", "Cash Only", "No Reservations"],
    photos: ["/food-pizza.jpg", "/food-steak.avif", "/food-pizza.jpg"],
    menu: [
      { name: "Pad Kra Pao", description: "Minced pork, holy basil, chilli, fried egg on rice", price: "฿80", image: "/food-pizza.jpg", tag: "Best Seller" },
      { name: "Green Curry", description: "Coconut green curry, chicken, Thai eggplant, jasmine rice", price: "฿95", image: "/food-steak.avif", tag: "Popular" },
      { name: "Som Tum", description: "Papaya salad, dried shrimp, peanuts, lime dressing", price: "฿70", image: "/food-pizza.jpg" },
      { name: "Tom Yum Soup", description: "Spicy lemongrass broth, mushroom, prawn, galangal", price: "฿110", image: "/food-steak.avif" },
    ],
    promotions: [
      { title: "Set Meal", description: "Any main + soup + drink for ฿149", expires: "Daily 10 AM – 9 PM" },
    ],
    branches: [
      { label: "Ari Soi 4 (This branch)", address: "Ari Soi 4, Bangkok 10400", hours: "10 AM – 9 PM", phone: "02 999 1732" },
      { label: "Victory Monument", address: "3/F Phayathai Plaza, Bangkok", hours: "10 AM – 8 PM", phone: "02 245 9900" },
    ],
    reviews: [
      { author: "Nat B.", stars: 5, text: "Authentic Thai food at its finest. The pad kra pao here is life-changing!" },
      { author: "Chris W.", stars: 4, text: "Cash only but totally worth it. Order the green curry — no regrets." },
    ],
    latlng: [13.778, 100.5528],
  },
];
