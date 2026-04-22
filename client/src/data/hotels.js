const hotels = [
  {
    id: 1,
    name: "Ocean Pearl Resort",
    city: "Goa, India",
    country: "India",
    category: "Resort",
    rating: 4.9,
    reviews: 1284,
    price: 180,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400"
    ],
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Parking",
      "Restaurant",
      "Air Conditioning"
    ],
    description:
      "Luxury beachfront resort with premium suites, private beach access and sunset dining."
  },
  {
    id: 2,
    name: "Skyline Grand Hotel",
    city: "Dubai, UAE",
    country: "UAE",
    category: "City Hotel",
    rating: 4.8,
    reviews: 954,
    price: 240,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1400"
    ],
    amenities: [
      "Free WiFi",
      "Gym",
      "Pool",
      "Parking",
      "Breakfast"
    ],
    description:
      "Modern skyline hotel in the heart of Dubai with rooftop pool and executive lounges."
  },
  {
    id: 3,
    name: "Royal Palace Stay",
    city: "Udaipur, India",
    country: "India",
    category: "Heritage",
    rating: 4.7,
    reviews: 721,
    price: 150,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400"
    ],
    amenities: [
      "Lake View",
      "Restaurant",
      "WiFi",
      "Parking"
    ],
    description:
      "Royal heritage experience with palace interiors, lake views and curated local dining."
  },
  {
    id: 4,
    name: "Mountain Crown Retreat",
    city: "Manali, India",
    country: "India",
    category: "Retreat",
    rating: 4.6,
    reviews: 510,
    price: 165,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1400"
    ],
    amenities: [
      "Mountain View",
      "Fireplace",
      "WiFi",
      "Breakfast"
    ],
    description:
      "Scenic mountain retreat surrounded by nature with warm interiors and premium comfort."
  },
  {
    id: 5,
    name: "Sunset Marina Hotel",
    city: "Bali, Indonesia",
    country: "Indonesia",
    category: "Beach Hotel",
    rating: 4.9,
    reviews: 1102,
    price: 210,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400"
    ],
    amenities: [
      "Infinity Pool",
      "Spa",
      "WiFi",
      "Breakfast"
    ],
    description:
      "Elegant marina-side hotel with infinity pool, spa treatments and tropical luxury."
  },
  {
    id: 6,
    name: "Urban Luxe Suites",
    city: "Mumbai, India",
    country: "India",
    category: "City Hotel",
    rating: 4.5,
    reviews: 678,
    price: 130,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1400"
    ],
    amenities: [
      "WiFi",
      "Gym",
      "Restaurant",
      "Parking"
    ],
    description:
      "Contemporary urban hotel in central Mumbai with modern amenities and excellent service."
  },
  {
    id: 7,
    name: "Alpine Peaks Lodge",
    city: "Swiss Alps, Switzerland",
    country: "Switzerland",
    category: "Mountain Lodge",
    rating: 4.8,
    reviews: 892,
    price: 280,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1566439561139-cd20e5ce7f55?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1566439561139-cd20e5ce7f55?w=1400"
    ],
    amenities: [
      "Fireplace",
      "Mountain View",
      "Spa",
      "Fine Dining"
    ],
    description:
      "Exclusive alpine lodge with panoramic mountain views, luxury spa and gourmet cuisine."
  },
  {
    id: 8,
    name: "Tropical Paradise Villa",
    city: "Maldives",
    country: "Maldives",
    category: "Villa Resort",
    rating: 4.9,
    reviews: 1543,
    price: 350,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400"
    ],
    amenities: [
      "Private Beach",
      "Water Villa",
      "Infinity Pool",
      "Snorkeling"
    ],
    description:
      "Exclusive overwater villas with direct lagoon access, snorkeling and premium island luxury."
  },
  {
    id: 9,
    name: "Historic Castle Manor",
    city: "Edinburgh, Scotland",
    country: "UK",
    category: "Heritage Hotel",
    rating: 4.7,
    reviews: 523,
    price: 195,
    guests: 3,
    bedrooms: 2,
    bathrooms: 2,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1572664534816-49b37cd68a55?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1572664534816-49b37cd68a55?w=1400"
    ],
    amenities: [
      "Historic Setting",
      "Library",
      "Restaurant",
      "WiFi"
    ],
    description:
      "Restored castle hotel with historic charm, library and traditional Scottish hospitality."
  },
  {
    id: 10,
    name: "Tokyo Metropolitan Towers",
    city: "Tokyo, Japan",
    country: "Japan",
    category: "Luxury Hotel",
    rating: 4.8,
    reviews: 1203,
    price: 220,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400"
    ],
    amenities: [
      "City View",
      "Rooftop Bar",
      "Spa",
      "Michelin Restaurant"
    ],
    description:
      "Ultra-modern Tokyo hotel with city views, rooftop bar and Michelin-starred dining."
  },
  {
    id: 11,
    name: "Safari Lodge Africa",
    city: "Serengeti, Tanzania",
    country: "Tanzania",
    category: "Safari Resort",
    rating: 4.9,
    reviews: 667,
    price: 290,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1516778927914-37e47f80f2d3?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1516778927914-37e47f80f2d3?w=1400"
    ],
    amenities: [
      "Safari Tours",
      "Wildlife View",
      "Fire Pit",
      "Outdoor Dining"
    ],
    description:
      "Exclusive safari lodge with wildlife viewing, guided tours and authentic African experience."
  },
  {
    id: 12,
    name: "Parisian Elegance Hotel",
    city: "Paris, France",
    country: "France",
    category: "Luxury Hotel",
    rating: 4.8,
    reviews: 1876,
    price: 250,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1559007615-cd4628902d4a?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1559007615-cd4628902d4a?w=1400"
    ],
    amenities: [
      "Eiffel View",
      "Fine Dining",
      "Spa",
      "Concierge"
    ],
    description:
      "Classic Parisian hotel with Eiffel Tower views, fine dining and timeless elegance."
  },
  {
    id: 13,
    name: "Desert Oasis Luxury",
    city: "Rajasthan, India",
    country: "India",
    category: "Desert Resort",
    rating: 4.6,
    reviews: 445,
    price: 145,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740ff023?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1470252649378-9c29740ff023?w=1400"
    ],
    amenities: [
      "Desert Safari",
      "Bonfire",
      "Traditional Cuisine",
      "Camel Rides"
    ],
    description:
      "Authentic desert resort with camel rides, traditional camping and Rajasthani culture."
  },
  {
    id: 14,
    name: "New York Sky Luxury",
    city: "New York, USA",
    country: "USA",
    category: "City Hotel",
    rating: 4.7,
    reviews: 2143,
    price: 300,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003cedd0b?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1570129477492-45c003cedd0b?w=1400"
    ],
    amenities: [
      "Rooftop Bar",
      "City View",
      "Michelin Restaurant",
      "Spa"
    ],
    description:
      "Iconic New York hotel with skyline views, rooftop bar and world-class dining."
  },
  {
    id: 15,
    name: "Mediterranean Beach Club",
    city: "Santorini, Greece",
    country: "Greece",
    category: "Beach Resort",
    rating: 4.9,
    reviews: 1567,
    price: 265,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400"
    ],
    amenities: [
      "Sea View",
      "Private Beach",
      "Sunset View",
      "Greek Restaurant"
    ],
    description:
      "Stunning Santorini resort with caldera views, private beach and authentic Greek experience."
  }
];

export default hotels;
