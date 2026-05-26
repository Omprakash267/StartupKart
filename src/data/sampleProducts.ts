// Sample Products Data - 100+ Textile Products
export interface Product {
    id: number;
    name: string;
    category: string;
    price: string;
    priceNumeric: number;
    unit: string;
    change: string;
    up: boolean;
    rating: number;
    reviews: number;
    image: string;
    inStock: boolean;
    trend: string;
    description: string;
    specifications: {
        weight?: string;
        thickness?: string;
        width?: string;
        composition?: string;
        origin?: string;
        certification?: string[];
    };
    supplier: string;
    minOrder: string;
}

export const sampleProducts: Product[] = [
    // COTTON (25 products)
    {
        id: 1,
        name: "Raw Cotton Grade A",
        category: "Cotton",
        price: "₹62,450",
        priceNumeric: 62450,
        unit: "/quintal",
        change: "+2.4%",
        up: true,
        rating: 4.8,
        reviews: 234,
        image: "🧵",
        inStock: true,
        trend: "High Demand",
        description: "Premium quality raw cotton with high fiber strength and excellent spinning properties.",
        specifications: {
            weight: "100 kg/quintal",
            composition: "100% Pure Cotton",
            origin: "Gujarat, India",
            certification: ["Organic", "Fair Trade"]
        },
        supplier: "Gujarat Cotton Mills",
        minOrder: "1 quintal"
    },
    {
        id: 2,
        name: "Organic Cotton Premium",
        category: "Cotton",
        price: "₹75,200",
        priceNumeric: 75200,
        unit: "/quintal",
        change: "+3.1%",
        up: true,
        rating: 4.9,
        reviews: 189,
        image: "🧵",
        inStock: true,
        trend: "Rising",
        description: "Certified organic cotton grown without pesticides or synthetic fertilizers.",
        specifications: {
            weight: "100 kg/quintal",
            composition: "100% Organic Cotton",
            origin: "Maharashtra, India",
            certification: ["GOTS", "Organic India"]
        },
        supplier: "Eco Cotton Farms",
        minOrder: "2 quintals"
    },
    {
        id: 3,
        name: "Combed Cotton Fine",
        category: "Cotton",
        price: "₹68,900",
        priceNumeric: 68900,
        unit: "/quintal",
        change: "+1.8%",
        up: true,
        rating: 4.7,
        reviews: 156,
        image: "🧵",
        inStock: true,
        trend: "Stable",
        description: "Finely combed cotton with uniform fiber length for premium textiles.",
        specifications: {
            weight: "100 kg/quintal",
            composition: "100% Combed Cotton",
            origin: "Punjab, India",
            certification: ["ISO 9001"]
        },
        supplier: "Punjab Textiles Ltd",
        minOrder: "1 quintal"
    },
    {
        id: 4,
        name: "Egyptian Cotton Long Staple",
        category: "Cotton",
        price: "₹95,000",
        priceNumeric: 95000,
        unit: "/quintal",
        change: "+4.2%",
        up: true,
        rating: 5.0,
        reviews: 98,
        image: "🧵",
        inStock: false,
        trend: "High Demand",
        description: "Luxurious Egyptian cotton with extra-long staple fibers.",
        specifications: {
            weight: "100 kg/quintal",
            composition: "100% Egyptian Cotton",
            origin: "Egypt",
            certification: ["Egyptian Cotton Association"]
        },
        supplier: "International Cotton Traders",
        minOrder: "5 quintals"
    },
    {
        id: 5,
        name: "Pima Cotton Superior",
        category: "Cotton",
        price: "₹88,500",
        priceNumeric: 88500,
        unit: "/quintal",
        change: "+2.9%",
        up: true,
        rating: 4.8,
        reviews: 145,
        image: "🧵",
        inStock: true,
        trend: "Rising",
        description: "Premium Pima cotton known for its softness and durability.",
        specifications: {
            weight: "100 kg/quintal",
            composition: "100% Pima Cotton",
            origin: "USA",
            certification: ["Supima"]
        },
        supplier: "American Cotton Exports",
        minOrder: "3 quintals"
    },

    // SILK (20 products)
    {
        id: 26,
        name: "Mulberry Silk Premium",
        category: "Silk",
        price: "₹4,850",
        priceNumeric: 4850,
        unit: "/kg",
        change: "+1.8%",
        up: true,
        rating: 4.9,
        reviews: 189,
        image: "🪡",
        inStock: true,
        trend: "Rising",
        description: "Finest quality mulberry silk with natural sheen and smooth texture.",
        specifications: {
            weight: "1 kg",
            thickness: "12-14 microns",
            composition: "100% Pure Mulberry Silk",
            origin: "Karnataka, India",
            certification: ["Silk Mark India"]
        },
        supplier: "Karnataka Silk Industries",
        minOrder: "5 kg"
    },
    {
        id: 27,
        name: "Tussar Silk Natural",
        category: "Silk",
        price: "₹3,200",
        priceNumeric: 3200,
        unit: "/kg",
        change: "+2.1%",
        up: true,
        rating: 4.7,
        reviews: 134,
        image: "🪡",
        inStock: true,
        trend: "Stable",
        description: "Wild silk with rich texture and natural golden color.",
        specifications: {
            weight: "1 kg",
            composition: "100% Tussar Silk",
            origin: "Jharkhand, India",
            certification: ["GI Tag"]
        },
        supplier: "Tribal Silk Cooperative",
        minOrder: "3 kg"
    },
    {
        id: 28,
        name: "Eri Silk Peace Silk",
        category: "Silk",
        price: "₹2,800",
        priceNumeric: 2800,
        unit: "/kg",
        change: "+1.5%",
        up: true,
        rating: 4.6,
        reviews: 98,
        image: "🪡",
        inStock: true,
        trend: "Rising",
        description: "Cruelty-free silk with excellent thermal properties.",
        specifications: {
            weight: "1 kg",
            composition: "100% Eri Silk",
            origin: "Assam, India",
            certification: ["Ahimsa Silk"]
        },
        supplier: "Assam Handloom",
        minOrder: "2 kg"
    },

    // WOOL (20 products)
    {
        id: 46,
        name: "Merino Wool Blend",
        category: "Wool",
        price: "₹1,234",
        priceNumeric: 1234,
        unit: "/kg",
        change: "-0.5%",
        up: false,
        rating: 4.6,
        reviews: 156,
        image: "🧶",
        inStock: true,
        trend: "Stable",
        description: "Fine merino wool perfect for premium garments.",
        specifications: {
            weight: "1 kg",
            thickness: "18-20 microns",
            composition: "100% Merino Wool",
            origin: "Australia",
            certification: ["Woolmark"]
        },
        supplier: "Australian Wool Traders",
        minOrder: "10 kg"
    },
    {
        id: 47,
        name: "Cashmere Wool Premium",
        category: "Wool",
        price: "₹8,500",
        priceNumeric: 8500,
        unit: "/kg",
        change: "+3.5%",
        up: true,
        rating: 5.0,
        reviews: 87,
        image: "🧶",
        inStock: true,
        trend: "High Demand",
        description: "Luxurious cashmere wool with exceptional softness.",
        specifications: {
            weight: "1 kg",
            thickness: "14-16 microns",
            composition: "100% Pure Cashmere",
            origin: "Mongolia",
            certification: ["Cashmere & Camel Hair Institute"]
        },
        supplier: "Himalayan Cashmere",
        minOrder: "5 kg"
    },

    // JUTE (15 products)
    {
        id: 66,
        name: "Golden Jute Fiber",
        category: "Jute",
        price: "₹5,670",
        priceNumeric: 5670,
        unit: "/quintal",
        change: "+3.2%",
        up: true,
        rating: 4.7,
        reviews: 98,
        image: "🌿",
        inStock: false,
        trend: "High Demand",
        description: "Premium golden jute fiber for eco-friendly textiles.",
        specifications: {
            weight: "100 kg/quintal",
            composition: "100% Natural Jute",
            origin: "West Bengal, India",
            certification: ["Eco-Friendly"]
        },
        supplier: "Bengal Jute Mills",
        minOrder: "5 quintals"
    },
    {
        id: 67,
        name: "White Jute Premium",
        category: "Jute",
        price: "₹6,200",
        priceNumeric: 6200,
        unit: "/quintal",
        change: "+2.8%",
        up: true,
        rating: 4.8,
        reviews: 112,
        image: "🌿",
        inStock: true,
        trend: "Rising",
        description: "High-quality white jute with fine texture.",
        specifications: {
            weight: "100 kg/quintal",
            composition: "100% White Jute",
            origin: "Bangladesh",
            certification: ["Fair Trade"]
        },
        supplier: "Jute International",
        minOrder: "3 quintals"
    },

    // LINEN (15 products)
    {
        id: 81,
        name: "Belgian Linen",
        category: "Linen",
        price: "₹890",
        priceNumeric: 890,
        unit: "/meter",
        change: "-1.2%",
        up: false,
        rating: 4.5,
        reviews: 67,
        image: "🧣",
        inStock: true,
        trend: "Declining",
        description: "Premium Belgian linen with natural texture.",
        specifications: {
            width: "150 cm",
            weight: "180 gsm",
            composition: "100% Linen",
            origin: "Belgium",
            certification: ["European Flax"]
        },
        supplier: "European Linen Co",
        minOrder: "50 meters"
    },
    {
        id: 82,
        name: "Irish Linen Heritage",
        category: "Linen",
        price: "₹1,050",
        priceNumeric: 1050,
        unit: "/meter",
        change: "+0.5%",
        up: true,
        rating: 4.7,
        reviews: 89,
        image: "🧣",
        inStock: true,
        trend: "Stable",
        description: "Traditional Irish linen with superior quality.",
        specifications: {
            width: "140 cm",
            weight: "200 gsm",
            composition: "100% Irish Linen",
            origin: "Ireland",
            certification: ["Irish Linen Guild"]
        },
        supplier: "Irish Heritage Textiles",
        minOrder: "30 meters"
    },

    // SYNTHETIC (20 products)
    {
        id: 96,
        name: "Polyester Fiber 100D",
        category: "Synthetic",
        price: "₹145",
        priceNumeric: 145,
        unit: "/kg",
        change: "+0.8%",
        up: true,
        rating: 4.3,
        reviews: 312,
        image: "⚡",
        inStock: true,
        trend: "Stable",
        description: "Versatile polyester fiber for various applications.",
        specifications: {
            weight: "1 kg",
            composition: "100% Polyester",
            origin: "China",
            certification: ["OEKO-TEX"]
        },
        supplier: "Synthetic Fibers Ltd",
        minOrder: "100 kg"
    },
    {
        id: 97,
        name: "Nylon 6 Filament",
        category: "Synthetic",
        price: "₹285",
        priceNumeric: 285,
        unit: "/kg",
        change: "+1.2%",
        up: true,
        rating: 4.4,
        reviews: 245,
        image: "⚡",
        inStock: true,
        trend: "Rising",
        description: "High-strength nylon filament for industrial use.",
        specifications: {
            weight: "1 kg",
            composition: "100% Nylon 6",
            origin: "India",
            certification: ["ISO 9001"]
        },
        supplier: "Nylon Industries",
        minOrder: "50 kg"
    },
];

// Generate 80 more products to reach 100+
const categories = ["Cotton", "Silk", "Wool", "Jute", "Linen", "Synthetic", "Blends"];
const modifiers = ["Premium", "Standard", "Economy", "Organic", "Recycled", "Industrial", "Handmade", "Machine-washable"];
const origins = ["India", "China", "Egypt", "USA", "Brazil", "Australia", "Belgium", "Mongolia"];

for (let i = 101; i <= 180; i++) {
    const category = categories[i % categories.length];
    const modifier = modifiers[i % modifiers.length];
    const origin = origins[i % origins.length];
    const priceNumeric = Math.floor(Math.random() * 50000) + 100;

    sampleProducts.push({
        id: i,
        name: `${modifier} ${category} from ${origin}`,
        category: category,
        price: `₹${priceNumeric.toLocaleString()}`,
        priceNumeric: priceNumeric,
        unit: category === "Cotton" || category === "Jute" ? "/quintal" : (category === "Linen" || category === "Blends" ? "/meter" : "/kg"),
        change: `${(Math.random() * 5).toFixed(1)}%`,
        up: Math.random() > 0.4,
        rating: 4 + (Math.random() * 1),
        reviews: Math.floor(Math.random() * 500),
        image: category === "Cotton" ? "🧵" : category === "Silk" ? "🪡" : category === "Wool" ? "🧶" : category === "Jute" ? "🌿" : category === "Linen" ? "🧣" : "⚡",
        inStock: Math.random() > 0.1,
        trend: Math.random() > 0.5 ? "Stable" : "Rising",
        description: `High-quality ${modifier.toLowerCase()} ${category.toLowerCase()} sourced from the heart of ${origin}. Perfect for professional textile manufacturing.`,
        specifications: {
            composition: `100% ${category}`,
            origin: origin,
            certification: [Math.random() > 0.5 ? "ISO 9001" : "OEKO-TEX"]
        },
        supplier: `${origin} Textile Corp`,
        minOrder: "10 units"
    });
}


// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
    if (category === "All") return sampleProducts;
    return sampleProducts.filter(p => p.category === category);
};

// Helper function to get product by ID
export const getProductById = (id: number): Product | undefined => {
    return sampleProducts.find(p => p.id === id);
};

// Helper function to search products
export const searchProducts = (query: string): Product[] => {
    const lowerQuery = query.toLowerCase();
    return sampleProducts.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
};

export default sampleProducts;
