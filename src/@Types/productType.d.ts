


export type IProductInput = {
    title: string;
    subtitle: string;
    description: string;
    price: number;
    image: IImage;
    size: string;
    quantity: number;
};

export type IProduct = IProductInput & {
    _id: string;
    createdAt: Date;
    shoppingCart: string[];
    quantity: number;
    sold: number;
    userId: string;
    barcode: number;
};

export type IImage = {
    alt: string;
    url: string;
};
export type ICartProduct = {
    productId: string;
    title: string;
    price: number;
    size: string;
};


export type IOrderProduct = {
    productId: string;
    quantity: number;
    size: string;
};

export type IOrder = {
    userId: string;
    products: IOrderProduct[];
    totalAmount: number;
    status: string;
    createdAt: Date;
    orderNumber: string;
};

export interface SalesByDateQuery {
    startDate: string;
    endDate: string;
};
