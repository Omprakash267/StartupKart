export interface Order {
    id: string;
    date: string;
    total: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    items: {
        productId: number;
        name: string;
        quantity: number;
        price: number;
    }[];
    paymentMethod: string;
    trackingNumber?: string;
    deliveryPartner?: string;
}

export const sampleOrders: Order[] = [
    {
        id: "SK-ORD-2024-001",
        date: "2024-02-01",
        total: 125400,
        status: "Delivered",
        paymentMethod: "Bank Transfer",
        trackingNumber: "TRK98234712",
        deliveryPartner: "BlueDart",
        items: [
            { productId: 1, name: "Raw Cotton Grade A", quantity: 2, price: 62450 }
        ]
    },
    {
        id: "SK-ORD-2024-002",
        date: "2024-02-05",
        total: 15600,
        status: "Shipped",
        paymentMethod: "UPI",
        trackingNumber: "TR34928374",
        deliveryPartner: "Delhivery",
        items: [
            { productId: 26, name: "Mulberry Silk Premium", quantity: 3, price: 4850 }
        ]
    },
    {
        id: "SK-ORD-2024-003",
        date: "2024-02-07",
        total: 8500,
        status: "Processing",
        paymentMethod: "Credit Card",
        items: [
            { productId: 47, name: "Cashmere Wool Premium", quantity: 1, price: 8500 }
        ]
    }
];

export default sampleOrders;
