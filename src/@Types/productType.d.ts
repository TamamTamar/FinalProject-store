export type IImage = {
    url?: string;
};

export type IProductInput = {
    title: string;
    subtitle: string;
    description: string;
    image: IImage;
    alt: string;
    sizes: string[];
    barcode: number;
    price: number;
    variants: IVariant[];
};

export type IVariant = {
    _id : string;
    size: string;
    quantity: number;
}
export type IProduct = IProductInput & {
    _id: string;
    barcode: number;
    createdAt: Date;
   shoppingCart: string[]; 
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
    productId: string;
    title: string;
    price: number;
    size: string;
    quantity: number;
    image: IImage;
}

export interface ICart {
    userId: string;
    items: ICartItem[];
}

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
    productId: string;
    quantity: number;
    size: string;
    title: string; // הוספת title
    price: number; // הוספת price

};

export type IOrder = {
    _id: string;
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

interface AddToCartButtonProps {
    productId: string;
    variants: IVariant[];
    title: string;
    image: string;
    onAdd: () => void;
}
