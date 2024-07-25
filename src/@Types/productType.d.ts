export type IImage = {
    url?: string;
};

export type IProductInput = {
    title: string;
    subtitle: string;
    description: string;
    price: number;
    image: IImage;
    alt: string;
    sizes: string[];
    quantity: number;

};

export type IProduct = IProductInput & {
    _id: string;
    barcode: number;
    createdAt: Date;
    shoppingCart: string[];
    quantity: number;
    sold: number;
    userId: string;
};


export type ICartProduct = {
    productId: string;
    title: string;
    price: number;
    size: string;
};


export interface ICartItem {
    _id: string;
    productId: string;
    quantity: number;
    title: string;
    price: number;
    size: string;
    image: IImage;
};

export interface ICart extends Document {
    userId: string;
    items: ICartItem[];
};

export interface ICartWithTotals extends ICart {
    totalQuantity: number;
    totalPrice: number;
};

export interface CartContextProps {
    cart: ICartWithTotals | null;
    setCart: Dispatch<SetStateAction<ICartWithTotals | null>>;
    fetchCart: () => void;
}


export type IOrderProduct = {
    title: string;
    price: number;
    productId: string;
    quantity: number;
    size: string;
    
};

export type IOrder = {
   // [x: string]: ReactNode;
    _id: string;
    orderNumber: string;
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